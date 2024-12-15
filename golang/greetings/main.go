package main

import "fmt"

func Hello(name string) string {
	message := fmt.Sprintf("Hi, %v. Welcome!", name)
	return message
}

func main() {
	message := Hello("Rudra")
	fmt.Println(message)
}
