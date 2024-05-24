package models

import (
	"gorm.io/gorm"
)

type Item struct {
    gorm.Model
    Name        string `gorm:"type:text"`
    Description string `gorm:"type:text"`
    Quantity    int64  `gorm:"type:bigint"`
    CategoryID  uint
    Price       int64  `gorm:"type:bigint"`
    SupplierID  uint
    Supplier    string `gorm:"type:text"`
}
