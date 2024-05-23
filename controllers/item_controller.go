package controllers

import (
	"net/http"
	"store-inventory-app/models"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetItems(c *gin.Context) {
	//get all items
	db := c.MustGet("db").(*gorm.DB)
	var items []models.Item
	db.Preload("Items").Find(&items)
	c.JSON(http.StatusOK, items)
}

func GetItem(c *gin.Context) {
	//get item
	db := c.MustGet("db").(*gorm.DB)
	var item models.Item
	id := c.Param("id")
	if err := db.Preload("Items").First(&item, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Item not found"})
		return
	}
	c.JSON(http.StatusOK, item)
}

func AddItem(c *gin.Context) {
	//add item
	db := c.MustGet("db").(*gorm.DB)
	var item models.Item
	if err := c.ShouldBindJSON(&item); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	db.Create(&item)
	c.JSON(http.StatusOK, item)
}

func UpdateItem(c *gin.Context) {
	//update item
	db := c.MustGet("db").(*gorm.DB)
	var item models.Item
	id := c.Param("id")
	if err := db.First(&item, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "item not found"})
		return
	}

	if err := c.ShouldBindJSON(&item); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	db.Save(&item)
	c.JSON(http.StatusOK, item)
}

func DeleteItem(c *gin.Context) {
	// delete item
	db := c.MustGet("db").(*gorm.DB)
	var item models.Item
	id := c.Param("id")
	if err := db.First(&item, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Delete failed"})
		return
	}
	db.Delete(&item)
	c.JSON(http.StatusOK, gin.H{"message": "Item deleted"})
}
