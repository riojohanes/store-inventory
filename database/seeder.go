package database

import (
	"log"
	"store-inventory-app/models"
)

func Seed() {
	// Categories
	categories := []models.Category{
		{Name: "Minuman"},
		{Name: "Makanan"},
	}

	for _, category := range categories {
		if err := DB.Create(&category).Error; err != nil {
			log.Fatalf("Failed to seed categories: %v", err)
		}
	}

	// Suppliers
	suppliers := []models.Supplier{
		{Name: "Supplier A"},
		{Name: "Supplier B"},
	}

	for _, supplier := range suppliers {
		if err := DB.Create(&supplier).Error; err != nil {
			log.Fatalf("Failed to seed suppliers: %v", err)
		}
	}

	// Items
	items := []models.Item{
		{Name: "Roti", Description: "Roti tawar", Quantity: 10, CategoryID: 2, SupplierID: 1, Price: 5000},
		{Name: "Teh", Description: "Teh kasih es biar seger", Quantity: 20, CategoryID: 1, SupplierID: 1, Price: 3000},
		{Name: "Kopi", Description: "Kopi biar ga ngantuk", Quantity: 30, CategoryID: 1, SupplierID: 2, Price: 7000},
	}

	for _, item := range items {
		if err := DB.Create(&item).Error; err != nil {
			log.Fatalf("Failed to seed items: %v", err)
		}
	}

	// Orders
	orders := []models.Order{
		{SupplierID: 1, OrderDate: "2023-05-23", Status: "Pending", Items: []models.OrderItem{
			{ItemID: 1, Quantity: 10},
			{ItemID: 2, Quantity: 5},
		}},
		{SupplierID: 2, OrderDate: "2023-05-23", Status: "Completed", Items: []models.OrderItem{
			{ItemID: 3, Quantity: 7},
		}},
	}

	for _, order := range orders {
		if err := DB.Create(&order).Error; err != nil {
			log.Fatalf("Failed to seed orders: %v", err)
		}
	}

	// Sales
	sales := []models.Sale{
		{SaleDate: "2023-05-23", TotalAmount: 35000, Status: "Completed", Items: []models.SaleItem{
			{ItemID: 1, Quantity: 2, Price: 5000},
			{ItemID: 3, Quantity: 3, Price: 7000},
		}},
	}

	for _, sale := range sales {
		if err := DB.Create(&sale).Error; err != nil {
			log.Fatalf("Failed to seed sales: %v", err)
		}
	}

	log.Println("Seeding completed successfully")
}
