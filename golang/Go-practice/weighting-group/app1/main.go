package main

import (
	"fmt"
	"sync"
)

func main() {
	var wg sync.WaitGroup

	for i := range 5 {
		wg.Add(1)
		fmt.Println("outer", i)
		go func() {
			for i := range 5 {
				fmt.Println("inner", i)
			}
			defer wg.Done()
		}()
	}

	wg.Wait()
	fmt.Println("Done")
}
