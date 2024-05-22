package controllers

import (
	"net/http"
	"store-inventory-app/models"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func RegisterRoutes(r *gin.Engine, db *gorm.DB) {
	r.GET("/items", func(c *gin.Context) {
		var items []models.Item
		db.Find(&items)
		c.JSON(http.StatusOK, items)
	})

	r.POST("/items", func(c *gin.Context) {
		var item models.Item
		if err := c.ShouldBindJSON(&item); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		db.Create(&item)
		c.JSON(http.StatusOK, item)
	})
}
