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

    for _, category := range categories {
        if err := DB.FirstOrCreate(&category, models.Category{Name: category.Name}).Error; err != nil {
            log.Fatalf("Failed to seed categories: %v", err)
        }
    }

    // Seed suppliers
    suppliers := []models.Supplier{
        {Name: "Supplier A"},
        {Name: "Supplier B"},
        {Name: "Supplier C"},
    }

    for _, supplier := range suppliers {
        if err := DB.FirstOrCreate(&supplier, models.Supplier{Name: supplier.Name}).Error; err != nil {
            log.Fatalf("Failed to seed suppliers: %v", err)
        }
    }

    // Seed items
    items := []models.Item{
        {Name: "Laptop", Description: "A powerful laptop", Quantity: 10, CategoryID: 1, Price: 1500000, SupplierID: 1, Supplier: "Supplier A"},
        {Name: "Chair", Description: "A comfortable chair", Quantity: 20, CategoryID: 2, Price: 500000, SupplierID: 2, Supplier: "Supplier B"},
        {Name: "T-Shirt", Description: "A stylish t-shirt", Quantity: 30, CategoryID: 3, Price: 200000, SupplierID: 3, Supplier: "Supplier C"},
    }

    for _, item := range items {
        if err := DB.FirstOrCreate(&item, models.Item{Name: item.Name}).Error; err != nil {
            log.Fatalf("Failed to seed items: %v", err)
        }
    }

    // Seed orders
    orders := []models.Order{
        {SupplierID: 1, OrderDate: "2024-01-01", Status: "Pending"},
        {SupplierID: 2, OrderDate: "2024-01-02", Status: "Completed"},
        {SupplierID: 3, OrderDate: "2024-01-03", Status: "Cancelled"},
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
