package main

import (
	"fmt"
	"log"
)

func main() {
	var val, val2 int64
	fmt.Printf("Enter the numbers: ")
	_, err := fmt.Scanln(&val, &val2)
	if err != nil {
		log.Fatalf("Error reading input: %v", err)
	}
	if val%2 == 0 {
		fmt.Printf("%v is Even\n", val)
	} else {
		fmt.Printf("%v is Odd\n", val)
	}

	if val%val2 == 0 {
		fmt.Println("8 is Divisible by 4")
	}

	if val%2 == 0 || val2%2 == 0 {
		fmt.Printf("Either %v or %v are even\n", val, val2)
	}

	if val := 9; val < 0 {
		fmt.Println(val, " is negative")
	} else if val < 10 {
		fmt.Println(val, " has single digit")
	} else {
		fmt.Println(val, " has multiple digits")
	}
}
