package main

import (
	"fmt"
	vari "variables/src/variables"
)

func main() {
	fmt.Println("Hello")

	var name string = "Rudra"
	var version = "2"
	fmt.Println(name)
	fmt.Println(version)

	var money int = 6700
	fmt.Println(money)

	var dimension float64 = 87.12
	fmt.Println(dimension)

	var decided bool = false
	fmt.Println(decided)

	const m = 4
	fmt.Println(m)

	type Pi struct {
		Value    int
		Product  string
		Location string
		Sells    float64
	}

	constantPi := Pi{
		Value:    7,
		Product:  "samosa",
		Location: "Bhubaneswar",
		Sells:    90.34,
	}
	fmt.Println(constantPi)

	fmt.Println(vari.Public)
	vari.Vari()
}
