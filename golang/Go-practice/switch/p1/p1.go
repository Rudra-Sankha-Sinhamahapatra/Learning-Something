package main

import (
	"fmt"
	"log"
)

func main() {
	fmt.Printf("Please enter a number between 1 to 7: ")
	var day int16
	_, err := fmt.Scanln(&day)
	if err != nil {
		log.Fatalf("Error taking input: %v", err)
		return
	}

	switch day {
	case 1:
		fmt.Println("Sunday")
	case 2:
		fmt.Println("Monday")
	case 3:
		fmt.Println("Tuesday")
	case 4:
		fmt.Println("Wednesday")
	case 5:
		fmt.Println("Thrusday")
	case 6:
		fmt.Println("Friday")
	case 7:
		fmt.Println("Saturday")
	default:
		log.Fatalf("Invalid No , please enter number 1-7")
	}
}
