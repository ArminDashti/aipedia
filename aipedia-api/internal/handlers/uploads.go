package handlers

import (
	"crypto/rand"
	"encoding/hex"
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"strings"

	"github.com/gin-gonic/gin"
)

const maxLogoBytes = 2 << 20 // 2 MiB

var allowedLogoMIME = map[string]string{
	"image/png":  ".png",
	"image/jpeg": ".jpg",
	"image/webp": ".webp",
	"image/gif":  ".gif",
}

// AdminUploadLogo accepts multipart field "file", stores under uploadDir/logos, returns logoUrl.
func (h *Handlers) AdminUploadLogo(c *gin.Context) {
	if h.uploadDir == "" {
		c.JSON(http.StatusServiceUnavailable, gin.H{"error": "uploads not configured"})
		return
	}

	file, err := c.FormFile("file")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "file required"})
		return
	}
	if file.Size <= 0 || file.Size > maxLogoBytes {
		c.JSON(http.StatusBadRequest, gin.H{"error": "file must be 1 byte to 2 MiB"})
		return
	}

	src, err := file.Open()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "cannot open file"})
		return
	}
	defer src.Close()

	head := make([]byte, 512)
	n, _ := io.ReadFull(src, head)
	mime := http.DetectContentType(head[:n])
	ext, ok := allowedLogoMIME[mime]
	if !ok {
		c.JSON(http.StatusBadRequest, gin.H{"error": "only png, jpeg, webp, gif allowed"})
		return
	}

	id := make([]byte, 16)
	if _, err := rand.Read(id); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "id failed"})
		return
	}
	name := hex.EncodeToString(id) + ext
	logosDir := filepath.Join(h.uploadDir, "logos")
	if err := os.MkdirAll(logosDir, 0o755); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "storage unavailable"})
		return
	}
	destPath := filepath.Join(logosDir, name)

	dst, err := os.OpenFile(destPath, os.O_CREATE|os.O_EXCL|os.O_WRONLY, 0o644)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "write failed"})
		return
	}
	defer dst.Close()

	if _, err := dst.Write(head[:n]); err != nil {
		_ = os.Remove(destPath)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "write failed"})
		return
	}
	if _, err := io.Copy(dst, src); err != nil {
		_ = os.Remove(destPath)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "write failed"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"logoUrl": fmt.Sprintf("/uploads/logos/%s", name),
	})
}

// EnsureUploadDir creates the upload root if missing.
func EnsureUploadDir(dir string) error {
	dir = strings.TrimSpace(dir)
	if dir == "" {
		return fmt.Errorf("upload dir empty")
	}
	return os.MkdirAll(filepath.Join(dir, "logos"), 0o755)
}
