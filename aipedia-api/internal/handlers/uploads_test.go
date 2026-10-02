package handlers

import (
	"bytes"
	"image"
	"image/png"
	"mime/multipart"
	"net/http"
	"net/http/httptest"
	"os"
	"path/filepath"
	"testing"

	"github.com/gin-gonic/gin"
)

func TestAdminUploadLogo_PNG(t *testing.T) {
	gin.SetMode(gin.TestMode)
	dir := t.TempDir()
	h := New(nil, dir)

	var body bytes.Buffer
	w := multipart.NewWriter(&body)
	part, err := w.CreateFormFile("file", "logo.png")
	if err != nil {
		t.Fatal(err)
	}
	img := image.NewRGBA(image.Rect(0, 0, 2, 2))
	if err := png.Encode(part, img); err != nil {
		t.Fatal(err)
	}
	_ = w.Close()

	r := httptest.NewRequest(http.MethodPost, "/api/admin/uploads/logo", &body)
	r.Header.Set("Content-Type", w.FormDataContentType())
	rec := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(rec)
	c.Request = r

	h.AdminUploadLogo(c)
	if rec.Code != http.StatusCreated {
		t.Fatalf("status %d body %s", rec.Code, rec.Body.String())
	}
	entries, err := os.ReadDir(filepath.Join(dir, "logos"))
	if err != nil {
		t.Fatal(err)
	}
	if len(entries) != 1 {
		t.Fatalf("expected 1 file, got %d", len(entries))
	}
}

func TestAdminUploadLogo_RejectSVG(t *testing.T) {
	gin.SetMode(gin.TestMode)
	h := New(nil, t.TempDir())

	var body bytes.Buffer
	w := multipart.NewWriter(&body)
	part, err := w.CreateFormFile("file", "x.svg")
	if err != nil {
		t.Fatal(err)
	}
	_, _ = part.Write([]byte(`<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg"></svg>`))
	_ = w.Close()

	r := httptest.NewRequest(http.MethodPost, "/api/admin/uploads/logo", &body)
	r.Header.Set("Content-Type", w.FormDataContentType())
	rec := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(rec)
	c.Request = r

	h.AdminUploadLogo(c)
	if rec.Code != http.StatusBadRequest {
		t.Fatalf("want 400, got %d %s", rec.Code, rec.Body.String())
	}
}
