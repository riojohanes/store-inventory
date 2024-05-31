package models

import "gorm.io/gorm"

type Item struct {
	gorm.Model
	Name        string    `gorm:"type:text" json:"name"`
	Description string    `gorm:"type:text" json:"description"`
	Quantity    int64     `gorm:"type:bigint" json:"quantity"`
	Price       int64     `gorm:"type:bigint" json:"price"`
	CategoryID  uint      `json:"category_id"`
	Category    *Category `gorm:"foreignKey:CategoryID" json:"category"`
	SupplierID  uint      `json:"supplier_id"`
	Supplier    *Supplier `gorm:"foreignKey:SupplierID" json:"supplier"`
}
