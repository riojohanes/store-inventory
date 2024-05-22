package main

import (
	"store-inventory-app/controllers"
	"store-inventory-app/models"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func main() {
	db, err := gorm.Open(postgres.Open("inventory.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	db.AutoMigrate(&models.Item{})

	// router gin
	r := gin.Default()

	r.Use(cors.Default())

	controllers.RegisterRoutes(r, db)

	r.Run(":8080")
}
