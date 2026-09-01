package handlers

import (
	"context"
	"database/sql"
	"encoding/json"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
)

type entryWriteRequest struct {
	CategoryID  int64          `json:"categoryId"`
	Name        string         `json:"name"`
	NameURL     *string        `json:"nameUrl"`
	LogoURL     *string        `json:"logoUrl"`
	OwnerName   *string        `json:"ownerName"`
	OwnerURL    *string        `json:"ownerUrl"`
	WebsiteURL  *string        `json:"websiteUrl"`
	Description *string        `json:"description"`
	Origin      *string        `json:"origin"`
	FreePlan    *string        `json:"freePlan"`
	PaidPlan    *string        `json:"paidPlan"`
	Links       *string        `json:"links"`
	Attrs       map[string]any `json:"attrs"`
}

type searchEntryDTO struct {
	entryDTO
	CategoryID    int64  `json:"categoryId"`
	CategoryPath  string `json:"categoryPath"`
	CategoryTitle string `json:"categoryTitle"`
}

// AdminListEntries lists entries for the admin UI (?q= optional, limit 500).
func (h *Handlers) AdminListEntries(c *gin.Context) {
	ctx, cancel := context.WithTimeout(c.Request.Context(), 15*time.Second)
	defer cancel()

	q := strings.TrimSpace(c.Query("q"))
	var rows *sql.Rows
	var err error
	if q == "" {
		rows, err = h.db.QueryContext(ctx, `
			SELECT e.id, e.name, e.name_url, e.logo_url, e.owner_name, e.owner_url,
				e.website_url, e.description, e.origin, e.free_plan, e.paid_plan, e.links, e.attrs,
				e.category_id, c.path, c.title
			FROM entries e
			JOIN categories c ON c.id = e.category_id
			ORDER BY c.path, e.name
			LIMIT 500
		`)
	} else {
		like := "%" + q + "%"
		rows, err = h.db.QueryContext(ctx, `
			SELECT e.id, e.name, e.name_url, e.logo_url, e.owner_name, e.owner_url,
				e.website_url, e.description, e.origin, e.free_plan, e.paid_plan, e.links, e.attrs,
				e.category_id, c.path, c.title
			FROM entries e
			JOIN categories c ON c.id = e.category_id
			WHERE e.name LIKE ? COLLATE NOCASE
				OR COALESCE(e.description, '') LIKE ? COLLATE NOCASE
				OR COALESCE(e.owner_name, '') LIKE ? COLLATE NOCASE
				OR c.path LIKE ? COLLATE NOCASE
				OR c.title LIKE ? COLLATE NOCASE
			ORDER BY c.path, e.name
			LIMIT 500
		`, like, like, like, like, like)
	}
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "query failed"})
		return
	}
	defer rows.Close()

	list, err := scanSearchEntries(rows)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "scan failed"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"entries": list})
}

// AdminCreateEntry creates an entry.
func (h *Handlers) AdminCreateEntry(c *gin.Context) {
	var req entryWriteRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid body"})
		return
	}
	req.Name = strings.TrimSpace(req.Name)
	if req.Name == "" || req.CategoryID <= 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "name and categoryId required"})
		return
	}

	ctx, cancel := context.WithTimeout(c.Request.Context(), 10*time.Second)
	defer cancel()

	attrsJSON, err := marshalAttrs(req.Attrs)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid attrs"})
		return
	}

	res, err := h.db.ExecContext(ctx, `
		INSERT INTO entries (
			category_id, name, name_url, logo_url, owner_name, owner_url,
			website_url, description, origin, free_plan, paid_plan, links, attrs, updated_at
		) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
	`,
		req.CategoryID, req.Name, deref(req.NameURL), deref(req.LogoURL), deref(req.OwnerName), deref(req.OwnerURL),
		deref(req.WebsiteURL), deref(req.Description), deref(req.Origin), deref(req.FreePlan), deref(req.PaidPlan),
		deref(req.Links), attrsJSON,
	)
	if err != nil {
		c.JSON(http.StatusConflict, gin.H{"error": "create failed", "detail": err.Error()})
		return
	}
	id, _ := res.LastInsertId()
	dto, err := h.getSearchEntryByID(ctx, id)
	if err != nil {
		c.JSON(http.StatusCreated, gin.H{"id": id})
		return
	}
	c.JSON(http.StatusCreated, dto)
}

// AdminUpdateEntry updates an entry by id.
func (h *Handlers) AdminUpdateEntry(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil || id <= 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid id"})
		return
	}
	var req entryWriteRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid body"})
		return
	}
	req.Name = strings.TrimSpace(req.Name)
	if req.Name == "" || req.CategoryID <= 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "name and categoryId required"})
		return
	}

	ctx, cancel := context.WithTimeout(c.Request.Context(), 10*time.Second)
	defer cancel()

	attrsJSON, err := marshalAttrs(req.Attrs)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid attrs"})
		return
	}

	res, err := h.db.ExecContext(ctx, `
		UPDATE entries SET
			category_id = ?, name = ?, name_url = ?, logo_url = ?, owner_name = ?, owner_url = ?,
			website_url = ?, description = ?, origin = ?, free_plan = ?, paid_plan = ?, links = ?,
			attrs = ?, updated_at = datetime('now')
		WHERE id = ?
	`,
		req.CategoryID, req.Name, deref(req.NameURL), deref(req.LogoURL), deref(req.OwnerName), deref(req.OwnerURL),
		deref(req.WebsiteURL), deref(req.Description), deref(req.Origin), deref(req.FreePlan), deref(req.PaidPlan),
		deref(req.Links), attrsJSON, id,
	)
	if err != nil {
		c.JSON(http.StatusConflict, gin.H{"error": "update failed", "detail": err.Error()})
		return
	}
	n, _ := res.RowsAffected()
	if n == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "entry not found"})
		return
	}
	dto, err := h.getSearchEntryByID(ctx, id)
	if err != nil {
		c.JSON(http.StatusOK, gin.H{"id": id})
		return
	}
	c.JSON(http.StatusOK, dto)
}

// AdminDeleteEntry deletes an entry by id.
func (h *Handlers) AdminDeleteEntry(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil || id <= 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid id"})
		return
	}
	ctx, cancel := context.WithTimeout(c.Request.Context(), 10*time.Second)
	defer cancel()

	res, err := h.db.ExecContext(ctx, `DELETE FROM entries WHERE id = ?`, id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "delete failed"})
		return
	}
	n, _ := res.RowsAffected()
	if n == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "entry not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"ok": true, "id": id})
}

// AdminListCategories returns all categories for admin dropdowns.
func (h *Handlers) AdminListCategories(c *gin.Context) {
	ctx, cancel := context.WithTimeout(c.Request.Context(), 10*time.Second)
	defer cancel()

	rows, err := h.db.QueryContext(ctx, `
		SELECT c.id, c.path, c.slug, c.title, c.kind, c.source_path,
			(SELECT COUNT(*) FROM categories ch WHERE ch.parent_id = c.id),
			(SELECT COUNT(*) FROM entries e WHERE e.category_id = c.id)
		FROM categories c
		ORDER BY c.path
	`)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "query failed"})
		return
	}
	defer rows.Close()
	list, err := scanCategories(rows)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "scan failed"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"categories": list})
}

func (h *Handlers) getSearchEntryByID(ctx context.Context, id int64) (searchEntryDTO, error) {
	row := h.db.QueryRowContext(ctx, `
		SELECT e.id, e.name, e.name_url, e.logo_url, e.owner_name, e.owner_url,
			e.website_url, e.description, e.origin, e.free_plan, e.paid_plan, e.links, e.attrs,
			e.category_id, c.path, c.title
		FROM entries e
		JOIN categories c ON c.id = e.category_id
		WHERE e.id = ?
	`, id)
	return scanSearchEntryRow(row)
}

func scanSearchEntries(rows *sql.Rows) ([]searchEntryDTO, error) {
	list := make([]searchEntryDTO, 0)
	for rows.Next() {
		dto, err := scanSearchEntryFromRows(rows)
		if err != nil {
			return nil, err
		}
		list = append(list, dto)
	}
	return list, rows.Err()
}

func scanSearchEntryFromRows(rows *sql.Rows) (searchEntryDTO, error) {
	var dto searchEntryDTO
	var nameURL, logoURL, ownerName, ownerURL, websiteURL, description, origin, freePlan, paidPlan, links sql.NullString
	var attrsRaw []byte
	if err := rows.Scan(
		&dto.ID, &dto.Name, &nameURL, &logoURL, &ownerName, &ownerURL,
		&websiteURL, &description, &origin, &freePlan, &paidPlan, &links, &attrsRaw,
		&dto.CategoryID, &dto.CategoryPath, &dto.CategoryTitle,
	); err != nil {
		return dto, err
	}
	fillEntryPtrs(&dto.entryDTO, nameURL, logoURL, ownerName, ownerURL, websiteURL, description, origin, freePlan, paidPlan, links, attrsRaw)
	return dto, nil
}

func scanSearchEntryRow(row *sql.Row) (searchEntryDTO, error) {
	var dto searchEntryDTO
	var nameURL, logoURL, ownerName, ownerURL, websiteURL, description, origin, freePlan, paidPlan, links sql.NullString
	var attrsRaw []byte
	err := row.Scan(
		&dto.ID, &dto.Name, &nameURL, &logoURL, &ownerName, &ownerURL,
		&websiteURL, &description, &origin, &freePlan, &paidPlan, &links, &attrsRaw,
		&dto.CategoryID, &dto.CategoryPath, &dto.CategoryTitle,
	)
	if err != nil {
		return dto, err
	}
	fillEntryPtrs(&dto.entryDTO, nameURL, logoURL, ownerName, ownerURL, websiteURL, description, origin, freePlan, paidPlan, links, attrsRaw)
	return dto, nil
}

func fillEntryPtrs(
	dto *entryDTO,
	nameURL, logoURL, ownerName, ownerURL, websiteURL, description, origin, freePlan, paidPlan, links sql.NullString,
	attrsRaw []byte,
) {
	dto.NameURL = nullPtr(nameURL)
	dto.LogoURL = nullPtr(logoURL)
	dto.OwnerName = nullPtr(ownerName)
	dto.OwnerURL = nullPtr(ownerURL)
	dto.WebsiteURL = nullPtr(websiteURL)
	dto.Description = nullPtr(description)
	dto.Origin = nullPtr(origin)
	dto.FreePlan = nullPtr(freePlan)
	dto.PaidPlan = nullPtr(paidPlan)
	dto.Links = nullPtr(links)
	if len(attrsRaw) > 0 && string(attrsRaw) != "{}" && string(attrsRaw) != "null" {
		_ = json.Unmarshal(attrsRaw, &dto.Attrs)
	}
}

func marshalAttrs(attrs map[string]any) (string, error) {
	if attrs == nil {
		return "{}", nil
	}
	b, err := json.Marshal(attrs)
	if err != nil {
		return "", err
	}
	return string(b), nil
}

func deref(s *string) any {
	if s == nil {
		return nil
	}
	v := strings.TrimSpace(*s)
	if v == "" {
		return nil
	}
	return v
}
