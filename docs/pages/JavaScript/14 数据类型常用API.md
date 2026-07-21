---
title: 数据类型常用API
date: 2023-02-20 20:19:24
permalink: /pages/043717/
categories: 
  - 全部分类
  - javaScript
tags: 
  - javaScript
author: 
  name: GleenLey
  link: https://gitee.com/Gleenley
---
列举 Number、String、Array、Object、Promise 有哪些 API
--------------------------------------------------
<!-- more -->
Number
------
```js
Number.isNaN()
Number.isInteger()
Number.isInfinite()
Number.isSafeInteger()
Number.prototype.toFixed()

```
String
------
```js
String.fromCharCode()
String.raw()
String.prototype.charAt()
String.prototype.charCodeAt()
String.prototype.concat()
String.prototype.startsWith()
String.prototype.endsWith()
String.prototype.includes()
String.prototype.indexOf()
String.prototype.lastIndexOf()
String.prototype.charAt()
String.prototype.charCodeAt()
String.prototype.trim()
// 如何手写实现 trim
String.prototype.trimStart()
String.prototype.trimEnd()
String.prototype.repeat()
String.prototype.replace()
String.prototype.slice()
String.prototype.split()
String.prototype.substring()
String.prototype.padStart()
String.prototype.padEnd()
String.prototype.search()
String.prototype.match()
String.prototype.toLowerCase()
String.prototype.toUpperCase()
```
Array
-----
```js
Array.isArray()
Array.from()
// 如何生成 [0, 1, 2, ..., 99] 的数组
Array.of()
Array.prototype.slice()
Array.prototype.splice()
Array.prototype.sort()
Array.prototype.reverse()
Array.prototype.indexOf
Array.prototype.lastIndexOf()
Array.prototype.includes()
Array.prototype.push()
Array.prototype.pop()
Array.prototype.shift()
Array.prototype.unshift()
// 如何给数组首项添加元素
Array.prototype.map()
Array.prototype.reduce()
Array.prototype.forEach()
Array.prototype.filter()
Array.prototype.every()
Array.prototype.some()
Array.prototype.flat()
Array.prototype.flatMap()
Array.prototype.toString()
```
Object
------
```js
Object.create()
Object.assign()
Object.defineProperties()
Object.defineProperty()
Object.keys()
Object.values()
Object.entries()
Object.fromEntries()
Object.is()

```



