package database

import (
	"fmt"
	"log"
	"os"
	"store-inventory-app/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Init() {
	var err error
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
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	} else {
		log.Println("Successfully connected to the database")
	}

	if err := DB.AutoMigrate(
		&models.Category{},
		&models.Supplier{},
		&models.Item{},
		&models.Order{},
		&models.Sale{},
		&models.SaleItem{},
	); err != nil {
		log.Fatalf("Failed to automigrate models: %v", err)
	} else {
		log.Println("Successfully migrated the models")
	}
}
