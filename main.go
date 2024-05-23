package main

import (
	"fmt"
	"os"
	"store-inventory-app/controllers"
	"store-inventory-app/models"

	"log"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"

	_ "github.com/joho/godotenv/autoload"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	dsn := fmt.Sprintf(
		"user=%s password=%s dbname=%s host=%s port=%s sslmode=%s TimeZone=%s",
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_NAME"),
		os.Getenv("DB_HOST"),
		os.Getenv("DB_PORT"),
		os.Getenv("DB_SSLMODE"),
		os.Getenv("DB_TIMEZONE"),
	)

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	db.AutoMigrate(&models.Item{})

	seedDatabase(db)

	// router gin
	r := gin.Default()

	r.Use(cors.Default())

	controllers.RegisterRoutes(r, db)

	r.Run(":8080")
}

func seedDatabase(db *gorm.DB) {
	// Hapus semua data yang ada
	db.Exec("DELETE FROM items")
	db.Exec("DELETE FROM categories")
	db.Exec("ALTER SEQUENCE items_id_seq RESTART WITH 1")
	db.Exec("ALTER SEQUENCE categories_id_seq RESTART WITH 1")

	// Menambahkan kategori dummy
	categories := []models.Category{
		{Name: "Electronics"},
		{Name: "Clothing"},
		{Name: "Books"},
	}
	for _, category := range categories {
		db.Create(&category)
	}

	// Menambahkan item dummy
	items := []models.Item{
		{Name: "Laptop", Description: "A powerful laptop", Quantity: 10, CategoryID: 1, Price: 1200, Supplier: "ABC Corp"},
		{Name: "Smartphone", Description: "A modern smartphone", Quantity: 20, CategoryID: 1, Price: 800, Supplier: "XYZ Inc"},
		{Name: "T-Shirt", Description: "A comfortable t-shirt", Quantity: 50, CategoryID: 2, Price: 20, Supplier: "Fashion Co"},
		{Name: "Novel", Description: "A captivating novel", Quantity: 30, CategoryID: 3, Price: 15, Supplier: "Book World"},
	}
	for _, item := range items {
		db.Create(&item)
	}
}
