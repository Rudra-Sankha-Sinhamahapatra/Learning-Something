package main

import "fmt"

func main() {
	i := 1
	for i <= 3 {
		fmt.Print(i, " ")
		i = i + 1
	}

	fmt.Println()

	for j := 0; j <= 4; j++ {
		fmt.Print(j, " ")
	}

	for i := range 3 {
		fmt.Println("range ", i)
	}

	for {
		fmt.Println("Loop")
		break
	}

	for n := range 6 {
		if n%2 == 0 {
			continue
		}
		fmt.Println(n)
	}
}
