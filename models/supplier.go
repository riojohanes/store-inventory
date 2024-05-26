package models

type Supplier struct {
	ID    uint   `gorm:"primaryKey"`
	Name  string `json:"name"`
	Items []Item `json:"items"`
}
