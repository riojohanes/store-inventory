package controllers

import (
	"net/http"
	"store-inventory-app/models"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetSales(c *gin.Context) {
    // Get all sales
    db := c.MustGet("db").(*gorm.DB)
    var sales []models.Sale
    if err := db.Preload("SaleItems").Preload("SaleItems.Item").Find(&sales).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    c.JSON(http.StatusOK, sales)
}

func GetSale(c *gin.Context) {
    // Get sale by ID
    db := c.MustGet("db").(*gorm.DB)
    var sale models.Sale
    id := c.Param("id")
    if err := db.Preload("SaleItems").Preload("SaleItems.Item").First(&sale, id).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Sale not found"})
        return
    }
    c.JSON(http.StatusOK, sale)
}

func AddSale(c *gin.Context) {
    // Add new sale
    db := c.MustGet("db").(*gorm.DB)
    var sale models.Sale
    if err := c.ShouldBindJSON(&sale); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    if err := db.Create(&sale).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    c.JSON(http.StatusOK, sale)
}

func UpdateSale(c *gin.Context) {
    // Update sale by ID
    db := c.MustGet("db").(*gorm.DB)
    var sale models.Sale
    id := c.Param("id")
    if err := db.First(&sale, id).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Sale not found"})
        return
    }
    if err := c.ShouldBindJSON(&sale); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    if err := db.Save(&sale).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    c.JSON(http.StatusOK, sale)
}

func DeleteSale(c *gin.Context) {
    // Delete sale by ID
    db := c.MustGet("db").(*gorm.DB)
    var sale models.Sale
    id := c.Param("id")
    if err := db.First(&sale, id).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Sale not found"})
        return
    }
    if err := db.Delete(&sale).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    c.JSON(http.StatusOK, gin.H{"message": "Sale deleted"})
}
