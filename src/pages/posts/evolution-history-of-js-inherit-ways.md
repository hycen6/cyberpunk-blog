---
title: "JavaScrip继承方式进化史"
date: '2025-04-18'
---

[[toc]]

JavaScript在ES5及之前的继承方式经历了几个重要演变阶段，每种方式都有其特点和适用场景。以下是主要继承方式的演变过程及优缺点分析：

### 1. 原型链继承（Prototype Chaining）

实现方式：

```javascript
function Parent() {
  this.name = 'parent'
}
Parent.prototype.sayName = function () {
  console.log(this.name)
}

function Child() {}
Child.prototype = new Parent() // 关键点

const child = new Child()
child.sayName() // 'parent'
```

优点：

- 简单直观，实现容易
- 父类原型方法可复用

缺点：

- 所有子类实例共享父类引用属性（如数组/对象）
- 无法向父类构造函数传参
- 无法实现多继承

### 2. 构造函数继承（Constructor Stealing）

实现方式：

```javascript
function Parent(name) {
  this.name = name
}

function Child(name) {
  Parent.call(this, name) // 关键点
}

const child = new Child('child')
console.log(child.name) // 'child'
```

优点：

- 解决了原型链继承的引用属性共享问题
- 可以向父类传参
- 可以实现多继承（调用多个父类构造函数）

缺点：

- 无法继承父类原型上的方法
- 方法都在构造函数中定义，无法复用

### 3. 组合继承（Combination Inheritance）

实现方式：

```javascript
function Parent(name) {
  this.name = name
}
Parent.prototype.sayName = function () {
  console.log(this.name)
}

function Child(name, age) {
  Parent.call(this, name) // 第二次调用Parent
  this.age = age
}
Child.prototype = new Parent() // 第一次调用Parent
Child.prototype.constructor = Child

const child = new Child('child', 10)
child.sayName() // 'child'
```

优点：

- 结合了原型链和构造函数的优点
- 实例拥有独立属性
- 可复用父类原型方法

缺点：

- 父类构造函数被调用两次（性能开销）
- 子类原型上会有多余的父类属性

### 4. 原型式继承（Prototypal Inheritance）

实现方式：

```javascript
function object(o) {
  function F() {}
  F.prototype = o
  return new F()
}

const parent = { name: 'parent' }
const child = object(parent)
console.log(child.name) // 'parent'
```

优点：

- 不需要构造函数
- 适合基于已有对象创建新对象

缺点：

- 与原型链继承相同的问题（引用属性共享）

### 5. 寄生式继承（Parasitic Inheritance）

实现方式：

```javascript
function createAnother(original) {
  const clone = object(original) // 通过object函数创建新对象
  clone.sayHi = function () { // 增强对象
    console.log('hi')
  }
  return clone
}
```

优点：

- 可以在不修改原对象的情况下增强功能

缺点：

- 函数难以复用（类似构造函数模式）

### 6. 寄生组合式继承（Parasitic Combination Inheritance）

实现方式：

```javascript
function inheritPrototype(child, parent) {
  const prototype = object(parent.prototype) // 创建父类原型的副本
  prototype.constructor = child // 修正constructor
  child.prototype = prototype // 赋值给子类原型
}

function Parent(name) {
  this.name = name
}
Parent.prototype.sayName = function () {
  console.log(this.name)
}

function Child(name, age) {
  Parent.call(this, name)
  this.age = age
}
inheritPrototype(Child, Parent)
```

优点：

- 只调用一次父类构造函数
- 避免在子类原型上创建不必要的属性
- 原型链保持不变
- 是ES6之前最理想的继承方式

缺点：

- 实现相对复杂

总结演变过程：
<br>
原型链继承 → 2. 构造函数继承 → 3. 组合继承 → 4. 原型式/寄生式继承 → 5. 寄生组合式继承
<br>
ES6的class语法糖本质上就是寄生组合式继承的语法封装，解决了ES5及之前继承方式的各种缺陷。
