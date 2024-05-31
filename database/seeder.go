package database

import (
	"log"
	"store-inventory-app/models"
)

func Seed() {
	// Seed categories
	categories := []models.Category{
		{Name: "Electronics"},
		{Name: "Furniture"},
		{Name: "Clothing"},
	}

	for i := range categories {
		if err := DB.FirstOrCreate(&categories[i], models.Category{Name: categories[i].Name}).Error; err != nil {
			log.Fatalf("Failed to seed categories: %v", err)
		}
	}

	// Seed suppliers
	suppliers := []models.Supplier{
		{Name: "Supplier A"},
		{Name: "Supplier B"},
		{Name: "Supplier C"},
	}

	for i := range suppliers {
		if err := DB.FirstOrCreate(&suppliers[i], models.Supplier{Name: suppliers[i].Name}).Error; err != nil {
			log.Fatalf("Failed to seed suppliers: %v", err)
		}
	}

	// Seed items
	items := []models.Item{
		{Name: "Laptop", Description: "A powerful laptop", Quantity: 10, Price: 1500000, CategoryID: categories[0].ID, SupplierID: suppliers[0].ID},
		{Name: "Chair", Description: "A comfortable chair", Quantity: 20, Price: 500000, CategoryID: categories[1].ID, SupplierID: suppliers[1].ID},
		{Name: "T-Shirt", Description: "A stylish t-shirt", Quantity: 30, Price: 200000, CategoryID: categories[2].ID, SupplierID: suppliers[2].ID},
	}

	for i := range items {
		if err := DB.FirstOrCreate(&items[i], models.Item{Name: items[i].Name}).Error; err != nil {
			log.Fatalf("Failed to seed items: %v", err)
		}
	}

	// Seed orders
	orders := []models.Order{
		{SupplierID: suppliers[0].ID, OrderDate: "2024-01-01", Status: "Pending"},
		{SupplierID: suppliers[1].ID, OrderDate: "2024-01-02", Status: "Completed"},
		{SupplierID: suppliers[2].ID, OrderDate: "2024-01-03", Status: "Cancelled"},
	}

	for _, order := range orders {
		if err := DB.FirstOrCreate(&order, models.Order{OrderDate: order.OrderDate}).Error; err != nil {
			log.Fatalf("Failed to seed orders: %v", err)
		}
	}

	// Seed sales
	sales := []models.Sale{
		{TotalAmount: 1000000, SaleDate: "2024-01-01", Status: "Completed"},
		{TotalAmount: 500000, SaleDate: "2024-01-02", Status: "Completed"},
		{TotalAmount: 200000, SaleDate: "2024-01-03", Status: "Pending"},
	}

	for _, sale := range sales {
		if err := DB.FirstOrCreate(&sale, models.Sale{SaleDate: sale.SaleDate}).Error; err != nil {
			log.Fatalf("Failed to seed sales: %v", err)
		}
	}

	log.Println("Database seeding completed successfully")
}
