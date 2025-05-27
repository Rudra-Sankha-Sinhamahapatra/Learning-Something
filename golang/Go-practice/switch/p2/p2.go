package main

import (
	"fmt"
	"time"
)

func p2() {
	t := time.Now()
	switch {
	case t.Hour() < 12:
		fmt.Println("It's before noon")
	default:
		fmt.Println("It's after noon")
	}
}

func main() {
	p2()
}
