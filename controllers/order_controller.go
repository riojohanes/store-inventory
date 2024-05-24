package controllers

import (
	"net/http"
	"store-inventory-app/models"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetOrders(c *gin.Context) {
	// Get all orders
	db := c.MustGet("db").(*gorm.DB)
	var orders []models.Order
	if err := db.Preload("OrderItems").Preload("OrderItems.Item").Find(&orders).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, orders)
}

func GetOrder(c *gin.Context) {
	// Get order by ID
	db := c.MustGet("db").(*gorm.DB)
	var order models.Order
	id := c.Param("id")
	if err := db.Preload("OrderItems").Preload("OrderItems.Item").First(&order, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Order not found"})
		return
	}
	c.JSON(http.StatusOK, order)
}

func AddOrder(c *gin.Context) {
	// Add new order
	db := c.MustGet("db").(*gorm.DB)
	var order models.Order
	if err := c.ShouldBindJSON(&order); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := db.Create(&order).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, order)
}

func UpdateOrder(c *gin.Context) {
	// Update order by ID
	db := c.MustGet("db").(*gorm.DB)
	var order models.Order
	id := c.Param("id")
	if err := db.First(&order, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Order not found"})
		return
	}
	if err := c.ShouldBindJSON(&order); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := db.Save(&order).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, order)
}

func DeleteOrder(c *gin.Context) {
	// Delete order by ID
	db := c.MustGet("db").(*gorm.DB)
	var order models.Order
	id := c.Param("id")
	if err := db.First(&order, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Order not found"})
		return
	}
	if err := db.Delete(&order).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Order deleted"})
}
