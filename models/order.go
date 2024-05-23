package models

type Order struct {
	SupplierID uint        `json:"supplier_id"`
	Supplier   Supplier    `json:"supplier"`
	OrderDate  string      `json:"order_date"`
	Status     string      `json:"status"`
	Items      []OrderItem `json:"items"`
}

type OrderItem struct {
	OrderID  uint `json:"order_id"`
	ItemID   uint `json:"item_id"`
	Item     Item `json:"item"`
	Quantity int  `json:"quantity"`
}
