package handlers

import (
	"context"
	"database/sql"
	"net/http"
	"time"

	appdb "github.com/ArminDashti/aipedia-api/internal/db"
	"github.com/gin-gonic/gin"
)

// Handlers groups HTTP handlers.
type Handlers struct {
	db        *sql.DB
	uploadDir string
}

// New creates Handlers.
func New(db *sql.DB, uploadDir string) *Handlers {
	return &Handlers{db: db, uploadDir: uploadDir}
}

// Health returns liveness and database ping status.
func (h *Handlers) Health(c *gin.Context) {
	ctx, cancel := context.WithTimeout(c.Request.Context(), 3*time.Second)
	defer cancel()

	status := gin.H{
		"status":  "ok",
		"service": "aipedia-api",
	}

	if err := appdb.Ping(ctx, h.db); err != nil {
		status["status"] = "degraded"
		status["database"] = "unreachable"
		c.JSON(http.StatusServiceUnavailable, status)
		return
	}

	status["database"] = "ok"
	c.JSON(http.StatusOK, status)
}
