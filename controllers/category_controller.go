package controllers

import (
	"net/http"
	"store-inventory-app/models"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetCategories(c *gin.Context) {
    // Get all categories
    db := c.MustGet("db").(*gorm.DB)
    var categories []models.Category
    db.Find(&categories)
    c.JSON(http.StatusOK, categories)
}

func GetCategory(c *gin.Context) {
    // Get category by ID
    db := c.MustGet("db").(*gorm.DB)
    var category models.Category
    id := c.Param("id")
    if err := db.First(&category, id).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Category not found"})
        return
    }
    c.JSON(http.StatusOK, category)
}

func AddCategory(c *gin.Context) {
    // Add new category
    db := c.MustGet("db").(*gorm.DB)
    var category models.Category
    if err := c.ShouldBindJSON(&category); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    db.Create(&category)
    c.JSON(http.StatusOK, category)
}

func UpdateCategory(c *gin.Context) {
    // Update category by ID
    db := c.MustGet("db").(*gorm.DB)
    var category models.Category
    id := c.Param("id")
    if err := db.First(&category, id).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Category not found"})
        return
    }
    if err := c.ShouldBindJSON(&category); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    db.Model(&category).Updates(category)
    c.JSON(http.StatusOK, category)
}

func DeleteCategory(c *gin.Context) {
    // Delete category by ID
    db := c.MustGet("db").(*gorm.DB)
    var category models.Category
    id := c.Param("id")
    if err := db.First(&category, id).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Category not found"})
        return
    }
    db.Delete(&category)
    c.JSON(http.StatusOK, gin.H{"message": "Category deleted"})
}
