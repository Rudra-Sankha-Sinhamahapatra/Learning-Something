package main

import "fmt"

func divide(a, b float64) (float64, error) {
	if b == 0 {
		return 0, fmt.Errorf("denominator must not be 0")
	}

	return a / b, nil
}

func addPositive(a, b float64) (float64, string) {
	if b < 0 {
		return 0, "b must not be negative"
	}

	return a / b, "nil"
}

func main() {
	ans, err := divide(2, 0)
	if err != nil {
		fmt.Println(err)
	} else {
		fmt.Println("ans is :", ans)
	}

	ans2, _ := addPositive(2, -3)
	fmt.Println(ans2)
}
