package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	fmt.Println("Hey, What's your name?")
	var name string

	fmt.Scan(&name)
	fmt.Println("name is: ", name)

	fmt.Println("Hey, Enter your name again.")
	reader := bufio.NewReader(os.Stdin)
	name2, _ := reader.ReadString('\n')
	fmt.Println("hello ", name2)
}
