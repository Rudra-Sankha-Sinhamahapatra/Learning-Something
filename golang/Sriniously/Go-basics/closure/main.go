package main

import "fmt"

func addr() func(int) int {
	sum := 0
	return func(x int) int {
		sum += x
		return sum
	}
}

func setter() func(int) int {
	mul := 1
	return func(y int) int {
		mul *= y
		return mul
	}
}

func main() {
	pos, neg := addr(), addr()
	for i := 0; i < 10; i++ {
		fmt.Println(
			pos(i),
			neg(2*i),
		)
	}

	po, ne := setter(), setter()

	for i := 0; i < 10; i++ {
		fmt.Println(
			po(i+1),
			ne(2*(i+1)),
		)
	}
}
