package models

import (
	"gorm.io/gorm"
)

type Sale struct {
    gorm.Model
    TotalAmount int64      `json:"total_amount"`
    SaleDate    string     `json:"sale_date"`
    Status      string     `json:"status"`
    SaleItems   []SaleItem `json:"sale_items" gorm:"foreignKey:SaleID;constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
}

type SaleItem struct {
    gorm.Model
    SaleID   uint `json:"sale_id"`
    ItemID   uint `json:"item_id"`
    Item     Item `json:"item" gorm:"foreignKey:ItemID"`
    Quantity int  `json:"quantity"`
}
