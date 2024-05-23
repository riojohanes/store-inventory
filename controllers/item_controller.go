package controllers

import (
	"net/http"
	"store-inventory-app/models"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func RegisterRoutes(r *gin.Engine, db *gorm.DB) {
	//get all items
	r.GET("/items", func(c *gin.Context) {
		var items []models.Item
		db.Find(&items)
		c.JSON(http.StatusOK, items)
	})

	//get item
	r.GET("/item/:id", func(c *gin.Context) {
		var item models.Item
		id := c.Param("id")
		if err := db.First(&item, id).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "Item not found"})
			return
		}
		c.JSON(http.StatusOK, item)
	})

	//add item
	r.POST("/items", func(c *gin.Context) {
		var item models.Item
		if err := c.ShouldBindJSON(&item); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		db.Create(&item)
		c.JSON(http.StatusOK, item)
	})

	//update item
	r.PUT("/item/:id", func(c *gin.Context) {
		var item models.Item
		id := c.Param("id")
		if err := db.First(&item, id).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "item not found"})
			return
		}

		if err := c.ShouldBindBodyWithJSON(&item); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		db.Save(&item)
		c.JSON(http.StatusOK, item)
	})

	//delete item
	r.DELETE("/item/:id", func(c *gin.Context) {
		var item models.Item
		id := c.Param("id")
		if err := db.First(&item, id).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "Delete failed"})
			return
		}
		db.Delete(&item)
		c.JSON(http.StatusOK, gin.H{"message": "Item deleted"})
	})
}
