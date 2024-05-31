package models

import "gorm.io/gorm"

type Category struct {
	gorm.Model
	Name  string `json:"name"`
	Items []Item `gorm:"foreignKey:CategoryID" json:"items"`
}
