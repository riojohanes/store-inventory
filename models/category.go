package models

type Category struct {
	ID    uint   `gorm:"PrimaryKey"`
	Name  string `json:"name"`
	Items []Item `json:"items"`
}
