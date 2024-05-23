package models

type Item struct {
	ID          uint     `gorm:"PrimaryKey"`
	Name        string   `json:"name"`
	Description string   `json:"description"`
	Quantity    int      `json:"quantity"`
	CategoryID  uint     `json:"category_id"`
	Category    Category `json:"category" gorm:"foreignKey:CategoryID"`
	Price       int      `json:"price"`
	SupplierID  uint     `json:"supplier_id"`
	Supplier    string   `json:"supplier"`
}

type Category struct {
	ID    uint   `gorm:"PrimaryKey"`
	Name  string `json:"name"`
	Items []Item `json:"items"`
}
