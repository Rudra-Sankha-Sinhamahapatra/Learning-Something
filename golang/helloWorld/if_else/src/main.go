package main

import "fmt"

func main() {
	if 7%2 == 0 {
		fmt.Println("even")
	} else {
		fmt.Println("odd")
	}

	if 8%2 == 0 || 7%2 == 0 {
		fmt.Println("Either 7 or 8 is even")
	}

	if num := 9; num < 0 {
		fmt.Println(num, " is negative")
	} else if num < 10 {
		fmt.Println(num, " is a single digit number")
	} else {
		fmt.Println(num, " is a multiple digit number")
	}

}
