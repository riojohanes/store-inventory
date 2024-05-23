package controllers

import (
	"net/http"
	"store-inventory-app/models"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetCategories(c *gin.Context) {
	//get all categories
	db := c.MustGet("db").(*gorm.DB)
	var categories []models.Category
	db.Preload("Category").Find(&categories)
	c.JSON(http.StatusOK, categories)
}
func GetCategory(c *gin.Context) {
	//get category
	db := c.MustGet("db").(*gorm.DB)
	var category models.Category
	id := c.Param("id")
	if err := db.Preload("Categories").First(&category, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Category not found"})
		return
	}
	c.JSON(http.StatusOK, category)
}

func AddCategory(c *gin.Context) {
	//add category
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
	db.Save(&category)
	c.JSON(http.StatusOK, category)
}

func DeleteCategory(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	var category models.Category
	id := c.Param("id")
	if err := db.Delete(&category, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Delete failed"})
		return
	}
	db.Delete(&category)
	c.JSON(http.StatusOK, gin.H{"message": "Category deleted"})
}
