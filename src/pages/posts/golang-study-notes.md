---
title: Go学习笔记
date: '2025-04-11 09:44:00'
description: A collection of notes on Go
tags: [Go, study notes]
---

[[toc]]

## 切片

切片就像数组的引用 切片并不存储任何数据，它只是描述了底层数组中的一段。
<br>
它的内部结构包含地址、长度和容量
<br>
更改切片的元素会修改其底层数组中对应的元素。
<br>
和它共享底层数组的切片都会观测到这些修改。
<br>
切片扩容时会重新分配内存，将原数组的值复制到新的数组中，切片底层指向新的数组。
<br>
修改切片的元素不会影响其他切片和原数组。

### 切片的使用

切片的使用方式和数组类似，但是切片的长度是可变的，切片的长度可以通过 `len()` 函数获取，切片的容量可以通过 `cap()` 函数获取。

```go
package main

import "fmt"

func modifySlice(slice []int) {
  slice[0] = 100
}

func main() {
  arr := [5]int{1, 2, 3, 4, 5}

  // go中的赋值和参数传递是值复制
  arr1 := arr

  // slice的是arr1数组的一个视图，即是arr1数组的一个引用，修改slice的值会改变arr1数组的值
  slice := arr1[:]
  fmt.Println(slice) // [1 2 3 4 5]
  fmt.Println(len(slice)) // 5

  // 这里依然是值复制生成新的切片，但是切片底层数组仍然是arr1数组
  modifySlice(slice)
  fmt.Println(slice) // [100 2 3 4 5]
  fmt.Println(arr1) // [100 2 3 4 5]

  // 容量发生变化，生成新的底层数组，不再是原数组引用
  slice = append(slice, 6)
  fmt.Println(slice) // [100 2 3 4 5 6]
  fmt.Println(arr1) // [100 2 3 4 5]
  fmt.Println(len(slice)) // 6
}

```

## 指针

Go 拥有指针。指针保存了值的内存地址。<br>

类型 \*T 是指向 T 类型值的指针，其零值为 nil。

```go
var p \*int
```

& 操作符会生成一个指向其操作数的指针。

```go
i := 42
p = &i
```

操作符表示指针指向的底层值。

```go
fmt.Println(*p) // 通过指针 p 读取 i
*p = 21 // 通过指针 p 设置 i
```

这也就是通常所说的「解引用」或「间接引用」。

与 C 不同，Go 没有指针运算。

```go
package main

import "fmt"

func main() {
	i, j := 42, 2701

	p := &i         // 指向 i
	fmt.Println(*p) // 通过指针读取 i 的值 42
	*p = 21         // 通过指针设置 i 的值
	fmt.Println(i)  // 查看 i 的值 21

	p = &j         // 指向 j
	*p = *p / 37   // 通过指针对 j 进行除法运算
	fmt.Println(j) // 查看 j 的值 73
	fmt.Println(*p) // 查看 p 的值 73
}
```
