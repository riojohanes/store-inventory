package controllers

import (
	"net/http"
	"store-inventory-app/models"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetSuppliers(c *gin.Context) {
	//get all suppliers
	db := c.MustGet("db").(*gorm.DB)
	var suppliers []models.Supplier
	db.Preload("suppliers").Find(&suppliers)
	c.JSON(http.StatusOK, suppliers)
}

func GetSupplier(c *gin.Context) {
	//get supplier
	db := c.MustGet("db").(*gorm.DB)
	var supplier models.Supplier
	id := c.Param("id")
	if err := db.Preload("suppliers").First(&supplier, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Supplier not found"})
		return
	}
	c.JSON(http.StatusOK, supplier)
}

func AddSupplier(c *gin.Context) {
	//add supplier
	db := c.MustGet("db").(*gorm.DB)
	var supplier models.Supplier
	if err := c.ShouldBindJSON(&supplier); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	db.Create(&supplier)
	c.JSON(http.StatusOK, supplier)
}

func UpdateSupplier(c *gin.Context) {
	//update supplier
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
	db.Save(&supplier)
	c.JSON(http.StatusOK, supplier)
}

func DeleteSupplier(c *gin.Context) {
	// delete supplier
	db := c.MustGet("db").(*gorm.DB)
	var supplier models.Supplier
	id := c.Param("id")
	if err := db.First(&supplier, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Delete failed"})
		return
	}
	db.Delete(&supplier)
	c.JSON(http.StatusOK, gin.H{"message": "Supplier deleted"})
}
