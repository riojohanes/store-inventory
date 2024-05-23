package router

import (
	"store-inventory-app/controllers"
	"store-inventory-app/database"
	"store-inventory-app/middleware"

	"github.com/gin-gonic/gin"
)

func Init() *gin.Engine {
	r := gin.Default()

	database.Init()
	db := database.DB

	r.Use(middleware.DBMiddleware(db))

	// Category routes
	r.GET("/categories", controllers.GetCategories)
	r.POST("/categories", controllers.AddCategory)
	r.GET("/categories/:id", controllers.GetCategory)
	r.PUT("/categories/:id", controllers.UpdateCategory)
	r.DELETE("/categories/:id", controllers.DeleteCategory)

	// Item routes
	r.GET("/items", controllers.GetItems)
	r.POST("/items", controllers.AddItem)
	r.GET("/items/:id", controllers.GetItem)
	r.PUT("/items/:id", controllers.UpdateItem)
	r.DELETE("/items/:id", controllers.DeleteItem)

	// Supplier routes
	r.GET("/suppliers", controllers.GetSuppliers)
	r.POST("/suppliers", controllers.AddSupplier)
	r.GET("/suppliers/:id", controllers.GetSupplier)
	r.PUT("/suppliers/:id", controllers.UpdateSupplier)
	r.DELETE("/suppliers/:id", controllers.DeleteSupplier)

	// Order routes
	r.GET("/orders", controllers.GetOrders)
	r.POST("/orders", controllers.AddOrder)
	r.GET("/orders/:id", controllers.GetOrder)
	r.PUT("/orders/:id", controllers.UpdateOrder)
	r.DELETE("/orders/:id", controllers.DeleteOrder)

	// Sale routes
	r.GET("/sales", controllers.GetSales)
	r.POST("/sales", controllers.AddSale)
	r.GET("/sales/:id", controllers.GetSale)
	r.PUT("/sales/:id", controllers.UpdateSale)
	r.DELETE("/sales/:id", controllers.DeleteSale)

	return r
}
