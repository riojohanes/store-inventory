package models

type Order struct {
	ID         uint        `gorm:"primaryKey"`
	SupplierID uint        `json:"supplier_id"`
	Supplier   Supplier    `json:"supplier" gorm:"foreignKey:SupplierID"`
	OrderDate  string      `json:"order_date"`
	Status     string      `json:"status"`
	Items      []OrderItem `json:"items" gorm:"foreignKey:OrderID"`
}

type OrderItem struct {
	OrderID  uint `json:"order_id" gorm:"primaryKey"`
	ItemID   uint `json:"item_id" gorm:"primaryKey"`
	Item     Item `json:"item" gorm:"foreignKey:ItemID"`
	Quantity int  `json:"quantity"`
}
