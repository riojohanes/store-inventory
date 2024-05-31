package models

import "gorm.io/gorm"

type Supplier struct {
	gorm.Model
	Name  string `json:"name"`
	Items []Item `gorm:"foreignKey:SupplierID" json:"items"`
}
