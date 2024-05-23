package models

type Item struct {
	ID       uint   `gorm:"PrimaryKey"`
	Name     string `json:"name"`
	Quantity int    `json:"quantity"`
}
