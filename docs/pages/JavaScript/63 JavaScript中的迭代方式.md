---
title: ES9中的for await of
date: 2023-06-05 20:35:41
permalink: /pages/7e1cb5/
categories:
  - 全部分类
  - javaScript
tags:
  - javaScript
author: 
  name: GleenLey
  link: https://gitee.com/Gleenley
---
> for...in、for...of和for await...of是JavaScript中三种不同的迭代方式，我们也经常会用到，但你真的了解它们吗？并知道怎么选择它们吗？

<!-- more -->

## `for in`

`MDN：for...in` 语句以任意顺序迭代一个对象的除Symbol以外的可枚举属性，包括继承的可枚举属性。
那么什么是可枚举属性？
在`JavaScript`中，可枚举性`（enumerable）`是是对象属性的一种特性，用于指示该属性是否可以通过循环访问，常见的可枚举的数据类型有：`object、array、string、typedArray`
我们可以通过`Object.getOwnPropertyDescriptor` 方法获取对象属性的描述对象。该方法接受两个参数：要获取的属性所在的对象和属性名。它返回一个对象，该对象包含以下属性：

- value: 属性值
- writable: 布尔类型，表示是否可写
- enumerable: 布尔类型，表示是否可枚举
- configurable: 布尔类型，表示是否可配置

```js
const obj = {
  name: "张三",
  age: 18,
};

const desc = Object.getOwnPropertyDescriptor(obj, "name");
console.log(desc);
```

```js
{value: '张三', writable: true, enumerable: true, configurable: true}
configurable: true
enumerable: true
value: "张三"
writable: true
[[Prototype]]: Object
```

普通对象的属性默认都是可枚举的，我们一般用于**获取对象的属性名（键）**


```js
const obj = {
  name: "Gleenley",
  age: 10,
  hello() {
    console.log("hello");
  },
};
for (const key in obj) {
  console.log(key); // name age hello
}

```


**但是有两个点我们要注意：**

- `for...in`用于获取对象的属性名，包括自身属性和继承属性
- `for...in`遍历对象时，顺序并不是固定的，并且可能会出现一些意外情况

我们以第一个点为例
```js
// 定义一个父级对象
const parent = {
  name: "张三",
  say() {
    console.log(this.name);
  },
};

// 以parent为原型,定义一个子级对象
const son = Object.create(parent);
son.age = 19;

// 遍历子级对象的属性
for (const key in son) {
  console.log(key); // 输出 age name say
}

```

那么如何让`for...in`只遍历自己的属性呢？我们可以用`obj.hasOwnProperty()`来判断是否是自己的属性
修改如下：
```js
for (const key in son) {
  if (son.hasOwnProperty(key)) {
    console.log(key); // 输出 age
  }
}
```

再说第二个点，如果键名都是字符串，那么顺序没问题，这也是我们大多数的使用情况


```js
const obj = {
  name: "张三",
  age: 18,
  say() {
    console.log(this.name);
  },
};

for (const key in obj) {
  console.log(key); // name age say
}

```

要是出现其他类型的键名，顺序就有问题了


```js
const obj = {
  name: "张三",
  age: 18,
  say() {
    console.log(this.name);
  },
  2: "数字2",
};

for (const key in obj) {
  console.log(key); // 2 name age say
}

```
**需要注意的是：**

使用`for in`遍历对象会**遍历对象原型链的方法名和属性名**,`for in` 循环实际是为循环可枚举`(enumerable)`对象而设计的


## for of 

`MDN：for...of`语句在可迭代对象（包括`Array, Map, Set, String, TypedArray, arguments `对象等等）上创建一个迭代循环，调用自定义迭代钩子，并为每个不同属性的值执行语句
那么什么又是可迭代对象呢？
说到可迭代对象，就要讲到迭代器了，迭代器是一种对象，它提供统一的接口，为不同的集合（`Object、Array、Set、Map`）提供了统一的访问机制。总的来说，可迭代对象就是实现`Symbol.iterator`方法的对象

注意：普通对象不是可迭代对象，所以，`for...of`是不能用来遍历普通对象的

还有一个直观感受就是`for...in`用于获取键（`key`），`for...of`用于获取值（`value`）

```js
const arr = ["张三", "李四", "王五"];

for (const key in arr) {
  console.log(key); // 0 1 2
}

for (const value of arr) {
  console.log(value); // "张三", "李四", "王五"
}

```

但我们一般不用于遍历数组，我们用于遍历`Map，Set，for...of`可以直接遍历`Set`和`Map`

```js
const set = new Set(["red", "green", "blue"]);

for (const key of set) {
  console.log(key); // red green blue
}

const map = new Map([
  ["name", "张三"],
  ["age", 19],
]);

for (const [key, value] of map) {
  console.log(key, value); 
  // name 张三
  // age 19
}

```

它们的实例身上也都有如下几个方法，用于返回一个迭代器。

- `keys()`：返回键名的迭代器
- `values()`：返回键值的迭代器
- `entries()`：返回键值对的迭代器

以`Set`为例

```js
const set = new Set(["red", "green", "blue"]);

// 因为set只有值，没有键，结果就是这样了
for (const key of set.keys()) {
  console.log(key);
}
for (const key of set.values()) {
  console.log(key);
}
for (const [key, value] of set.entries()) {
  console.log(key, value);
}

// red
// green
// blue
// red
// green
// blue
// red red
// green green
// blue  blue
```

再来看看`Map`

```js
const map = new Map([
  ["name", "张三"],
  ["age", 19],
]);

for (const key of map.keys()) {
  console.log(key);
}
for (const key of map.values()) {
  console.log(key);
}
for (const [key, value] of map.entries()) {
  console.log(key, value);
}

// name
// age
// 张三
// 19
// name 张三
// age 19
```

我们也可以使用`for...of`来遍历普通对象，借助`Object.keys()、Object.values()、Object.entries()`，它们都可以把一个对象包装成迭代器，使用起来就和`Map`差不多


> 需要注意：`Object.key迭代不会查找原型链 而for in 会`


> 如果你只是想遍历对象的属性名，用`for...in`，其他的像`Map、Set`用`for...of`

## for await...of

`for await...of`是`ES9`才有的新东西。
`MDN：for await...of` 语句创建一个循环，该循环遍历异步可迭代对象以及同步可迭代对象，包括：内置的`String，Array`，类似数组对象 (例如`arguments`或 `NodeList`)，`TypedArray，Map，Set` 和用户定义的异步/同步迭代器。它使用对象的每个不同属性的值调用要执行的语句来调用自定义迭代钩子。

> 需要注意的是：我们知道`await`需要配合`async`一起使用，所以，使用了`for await...of`，外层需要`async`。

注意和`for...of`的区别，用于遍历异步可迭代对象，当然也可以遍历同步可迭代对象，但这样就失去了使用意义。

我们一个例子来讲解：

```js
function createAsyncIterable(delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(delay);
    }, delay);
  });
}

// 数组就是一个可迭代对象
const asyncIterable = [createAsyncIterable(2000), createAsyncIterable(1000), createAsyncIterable(3000)];

async function getIterrable() {
  for await (const item of asyncIterable) {
    console.log(item);
  }
}

getIterrable();

// 2000
// 1000
// 3000
```


等同于：

```js
function createAsyncIterable(delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(delay);
    }, delay);
  });
}

// 数组就是一个可迭代对象
const asyncIterable = [createAsyncIterable(2000), createAsyncIterable(1000), createAsyncIterable(3000)];

async function getIterable() {
  const p1 = await asyncIterable[0];
  console.log(p1);
  const p2 = await asyncIterable[1];
  console.log(p2);
  const p3 = await asyncIterable[2];
  console.log(p3);
}

getIterable();

// 2000
// 1000
// 3000

```

