package models

import (
	"gorm.io/gorm"
)

type Item struct {
	gorm.Model
	Name        string `gorm:"type:text" json:"Name"`
	Description string `gorm:"type:text" json:"Description"`
	Quantity    int64  `gorm:"type:bigint" json:"Quantity"`
	CategoryID  uint   `json:"CategoryID"`
	Price       int64  `gorm:"type:bigint" json:"Price"`
	SupplierID  uint   `json:"SupplierID"`
	Supplier    string `gorm:"type:text" json:"Supplier"`
}
