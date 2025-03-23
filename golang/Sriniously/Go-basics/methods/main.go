package main

import (
	"fmt"
	"math"
)

type Vertex struct {
	X, Y float64
}

func (v *Vertex) Abs() float64 {
	return math.Sqrt(v.X*v.X + v.Y*v.Y)
}

func (v *Vertex) Scale(f float64) {
	v.X *= f
	v.Y *= f
}

func (v *Vertex) Init(f float64) {
	v.X += f
	v.Y += f
	fmt.Println(v.X, v.Y)
}

func main() {
	v := Vertex{3, 4}
	v.Scale(10)
	v.Init(1)
	fmt.Println(v.Abs())
}
