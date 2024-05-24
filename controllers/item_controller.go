package controllers

import (
	"net/http"
	"store-inventory-app/models"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetItems(c *gin.Context) {
	// Get all items
	db := c.MustGet("db").(*gorm.DB)
	var items []models.Item
	if err := db.Find(&items).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, items)
}

func GetItem(c *gin.Context) {
	// Get item by ID
	db := c.MustGet("db").(*gorm.DB)
	var item models.Item
	id := c.Param("id")
	if err := db.First(&item, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Item not found"})
		return
	}
	c.JSON(http.StatusOK, item)
}

func AddItem(c *gin.Context) {
	// Add new item
	db := c.MustGet("db").(*gorm.DB)
	var item models.Item
	if err := c.ShouldBindJSON(&item); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := db.Create(&item).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, item)
}

func UpdateItem(c *gin.Context) {
	// Update item by ID
	db := c.MustGet("db").(*gorm.DB)
	var item models.Item
	id := c.Param("id")
	if err := db.First(&item, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Item not found"})
		return
	}
	if err := c.ShouldBindJSON(&item); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := db.Save(&item).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, item)
}

func DeleteItem(c *gin.Context) {
	// Delete item by ID
	db := c.MustGet("db").(*gorm.DB)
	var item models.Item
	id := c.Param("id")
	if err := db.First(&item, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Delete failed"})
		return
	}
	if err := db.Delete(&item).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Item deleted"})
}
