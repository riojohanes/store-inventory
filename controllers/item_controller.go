package controllers

import (
	"log"
	"net/http"
	"store-inventory-app/models"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetItems(c *gin.Context) {
    db := c.MustGet("db").(*gorm.DB)
    var items []models.Item
    if err := db.Preload("Category").Find(&items).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    c.JSON(http.StatusOK, items)
}

func GetItem(c *gin.Context) {
    db := c.MustGet("db").(*gorm.DB)
    var item models.Item
    id := c.Param("id")
    if err := db.Preload("Category").First(&item, id).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Item not found"})
        return
    }
    c.JSON(http.StatusOK, item)
}

func AddItem(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	var item models.Item
	if err := c.ShouldBindJSON(&item); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// Tambahkan log untuk melihat data yang diterima
	log.Println("Received item:", item)
	if err := db.Create(&item).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, item)
}



func UpdateItem(c *gin.Context) {
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
