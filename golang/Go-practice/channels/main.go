package main

import "fmt"

func main() {
	c := make(chan int)

	go func() {
		defer close(c)
		firstSum := <-c
		fmt.Println(firstSum)
	}()

	c <- 10
	<-c
}
