package models

type Supplier struct {
	ID    uint   `gorm:"PrimaryKey"`
	Name  string `json:"name"`
	Items []Item `json:"items"`
}
