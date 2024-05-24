package controllers

import (
	"net/http"
	"store-inventory-app/models"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetSuppliers(c *gin.Context) {
	// Get all suppliers
	db := c.MustGet("db").(*gorm.DB)
	var suppliers []models.Supplier
	if err := db.Find(&suppliers).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, suppliers)
}

func GetSupplier(c *gin.Context) {
	// Get supplier by ID
	db := c.MustGet("db").(*gorm.DB)
	var supplier models.Supplier
	id := c.Param("id")
	if err := db.First(&supplier, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Supplier not found"})
		return
	}
	c.JSON(http.StatusOK, supplier)
}

func AddSupplier(c *gin.Context) {
	// Add new supplier
	db := c.MustGet("db").(*gorm.DB)
	var supplier models.Supplier
	if err := c.ShouldBindJSON(&supplier); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := db.Create(&supplier).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, supplier)
}

func UpdateSupplier(c *gin.Context) {
	// Update supplier by ID
	db := c.MustGet("db").(*gorm.DB)
	var supplier models.Supplier
	id := c.Param("id")
	if err := db.First(&supplier, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Supplier not found"})
		return
	}
	if err := c.ShouldBindJSON(&supplier); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := db.Save(&supplier).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, supplier)
}

func DeleteSupplier(c *gin.Context) {
	// Delete supplier by ID
	db := c.MustGet("db").(*gorm.DB)
	var supplier models.Supplier
	id := c.Param("id")
	if err := db.First(&supplier, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Supplier not found"})
		return
	}
	if err := db.Delete(&supplier).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Supplier deleted"})
}
