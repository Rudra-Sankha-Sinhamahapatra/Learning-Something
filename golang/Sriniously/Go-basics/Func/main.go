package main

import "fmt"

func add(x int, y int) int {
	return x + y
}

func swap(x, y string) (string, string) {
	return y, x
}

func split(sum int) (x, y int) {
	x = sum * 4 / 9
	y = sum - x
	return x, y
}

func main() {
	fmt.Println(add(2, 3))
	a, b := swap("2", "3")
	fmt.Println(a, b)
	fmt.Println(split(19))
}
