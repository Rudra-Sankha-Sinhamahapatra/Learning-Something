package main

import "fmt"

func simpleFunction() {
	fmt.Println("Simple function")
}

func add(a, b int) int {
	return a + b
}
func mult(a int, b int) (result int) {
	result = a * b
	return result
}

func main() {
	fmt.Println("We are learning function in golang")
	simpleFunction()
	ans := add(2, 3)
	fmt.Println("addition ans: ", ans)
	ans2 := mult(3, 4)
	fmt.Println("Multiplication result: ", ans2)
}
