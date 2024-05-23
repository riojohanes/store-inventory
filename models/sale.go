package models

type Sale struct {
	ID          uint       `gorm:"primaryKey"`
	SaleDate    string     `json:"sale_date"`
	TotalAmount int        `json:"total_amount"`
	Status      string     `json:"status"`
	Items       []SaleItem `json:"items" gorm:"foreignKey:SaleID"`
}

type SaleItem struct {
	SaleID   uint `json:"sale_id" gorm:"primaryKey"`
	ItemID   uint `json:"item_id" gorm:"primaryKey"`
	Item     Item `json:"item" gorm:"foreignKey:ItemID"`
	Quantity int  `json:"quantity"`
	Price    int  `json:"price"`
}
