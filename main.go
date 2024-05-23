package main

import (
	"log"
	"os"
	"store-inventory-app/database"
	"store-inventory-app/router"

	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	database.Init()

	database.Seed()

	r := router.Init()

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// Run the server
	if err := r.Run(":" + port); err != nil {
		log.Fatalf("Server failed to start: %v", err)
	}
}
