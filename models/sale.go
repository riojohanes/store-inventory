package models

type Sale struct {
	SaleDate    string     `json:"sale_date"`
	TotalAmount int        `json:"total_amount"`
	Status      string     `json:"status"`
	Items       []SaleItem `json:"items"`
}

type SaleItem struct {
	SaleID   uint `json:"sale_id"`
	ItemID   uint `json:"item_id"`
	Item     Item `json:"item"`
	Quantity int  `json:"quantity"`
	Price    int  `json:"price"`
}
