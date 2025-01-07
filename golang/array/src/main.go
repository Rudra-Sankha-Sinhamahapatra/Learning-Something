package main

import "fmt"

func main() {
	fmt.Println("Arrays")

	var name [5]string
	name[0] = "Aman"
	name[1] = "Anshu"

	fmt.Println("Names in the array: ", name)

	var numbers = [7]int{1, 2, 3, 4, 5}
	fmt.Println("Numbers in the array ", numbers)
	fmt.Println("Length of numbers array ", len(numbers))

	fmt.Println("Value of name at 1st index is ", name[1])
	fmt.Printf("Value of name at index 0 is %q\n", name[0])
}
