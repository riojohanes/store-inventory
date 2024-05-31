package models

import (
	"gorm.io/gorm"
)

type Order struct {
	gorm.Model
	OrderDate  string    `gorm:"type:text" json:"order_date"`
	Status     string    `gorm:"type:text" json:"status"`
	SupplierID uint      `json:"supplier_id"`
	Supplier   *Supplier `gorm:"foreignKey:SupplierID" json:"supplier"`
	Items      []Item    `gorm:"many2many:order_items;" json:"items"`
}

type OrderItems struct {
	gorm.Model
	OrderID uint `gorm:"primaryKey"`
	ItemID  uint `gorm:"primaryKey"`
}
