package main

import (
	"fmt"
	"time"
)

func main() {
	i := 2
	fmt.Print("Write i as ", i)

	switch i {
	case 1:
		fmt.Println("one")

	case 2:
		fmt.Println("two")

	case 3:
		fmt.Println("three")
	}
	switch time.Now().Weekday() {
	case time.Saturday, time.Sunday:
		fmt.Println("Its weekend")
	default:
		fmt.Println("Its weekday")
	}

	t := time.Now()
	switch {
	case t.Hour() < 12:
		fmt.Println("Its before noon")
	default:
		fmt.Println("Its after noon")
	}

	whoAmI := func(i interface{}) {
		switch t := i.(type) {
		case bool:
			fmt.Println("I am type bool")
		case int:
			fmt.Println("I am type integer")
		default:
			fmt.Printf("I am type %T\n", t)
		}
	}

	whoAmI(true)
	whoAmI(12)
	whoAmI(12.12)
	whoAmI("hey")
}
