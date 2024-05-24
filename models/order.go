package models

import (
	"gorm.io/gorm"
)

type Order struct {
    gorm.Model
    SupplierID uint        `json:"supplier_id"`
    Supplier   Supplier    `json:"supplier" gorm:"foreignKey:SupplierID"`
    OrderDate  string      `json:"order_date"`
    Status     string      `json:"status"`
    OrderItems []OrderItem `json:"order_items" gorm:"foreignKey:OrderID;constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
}

type OrderItem struct {
    gorm.Model
    OrderID  uint  `json:"order_id"`
    ItemID   uint  `json:"item_id"`
    Item     Item  `json:"item" gorm:"foreignKey:ItemID"`
    Quantity int   `json:"quantity"`
}
