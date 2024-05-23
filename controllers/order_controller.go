package controllers

import (
	"net/http"
	"store-inventory-app/models"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetOrders(c *gin.Context) {
	//get all orders
	db := c.MustGet("db").(*gorm.DB)
	var orders []models.Order
	db.Preload("Items").Find(&orders)
	c.JSON(http.StatusOK, orders)
}

func GetOrder(c *gin.Context) {
	//get order
	db := c.MustGet("db").(*gorm.DB)
	var order models.Order
	id := c.Param("id")
	if err := db.Preload("orders").First(&order, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Order not found"})
		return
	}
	c.JSON(http.StatusOK, order)
}

func AddOrder(c *gin.Context) {
	//add order
	db := c.MustGet("db").(*gorm.DB)
	var order models.Order
	if err := c.ShouldBindJSON(&order); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	db.Create(&order)
	c.JSON(http.StatusOK, order)
}

func UpdateOrder(c *gin.Context) {
	//update order
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
	db.Save(&order)
	c.JSON(http.StatusOK, order)
}

func DeleteOrder(c *gin.Context) {
	// delete order
	db := c.MustGet("db").(*gorm.DB)
	var order models.Order
	id := c.Param("id")
	if err := db.First(&order, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Delete failed"})
		return
	}
	db.Delete(&order)
	c.JSON(http.StatusOK, gin.H{"message": "Order deleted"})
}
