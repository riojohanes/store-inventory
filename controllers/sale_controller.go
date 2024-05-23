package controllers

import (
	"net/http"
	"store-inventory-app/models"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetSales(c *gin.Context) {
	//get all sales
	db := c.MustGet("db").(*gorm.DB)
	var sales []models.Sale
	db.Preload("sales").Find(&sales)
	c.JSON(http.StatusOK, sales)
}

func GetSale(c *gin.Context) {
	//get sale
	db := c.MustGet("db").(*gorm.DB)
	var sale models.Sale
	id := c.Param("id")
	if err := db.Preload("sales").First(&sale, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Sale not found"})
		return
	}
	c.JSON(http.StatusOK, sale)
}

func AddSale(c *gin.Context) {
	//add sale
	db := c.MustGet("db").(*gorm.DB)
	var sale models.Sale
	if err := c.ShouldBindJSON(&sale); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	db.Create(&sale)
	c.JSON(http.StatusOK, sale)
}

func UpdateSale(c *gin.Context) {
	//update sale
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
	db.Save(&sale)
	c.JSON(http.StatusOK, sale)
}

func DeleteSale(c *gin.Context) {
	// delete sale
	db := c.MustGet("db").(*gorm.DB)
	var sale models.Sale
	id := c.Param("id")
	if err := db.First(&sale, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Delete failed"})
		return
	}
	db.Delete(&sale)
	c.JSON(http.StatusOK, gin.H{"message": "Sale deleted"})
}
