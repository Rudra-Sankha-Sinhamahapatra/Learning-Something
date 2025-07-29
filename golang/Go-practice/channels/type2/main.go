package main

import (
	"fmt"
	"time"
)

func main() {
	ch := make(chan int, 5)

	go func() {
		for i := range 10 {
			ch <- 10
			fmt.Println("sent data", i)
		}
	}()

	time.Sleep(time.Second * 5)

	fmt.Println(<-ch)
}
