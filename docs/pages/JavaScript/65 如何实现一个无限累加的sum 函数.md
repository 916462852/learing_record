---
title: 如何实现一个无限累加的sum 函数
date: 2023-06-19 21:07:13
permalink: /pages/e39658/
categories:
  - 全部分类
  - javaScript
tags:
  - javaScript
author: 
  name: GleenLey
  link: https://gitee.com/Gleenley
---


实现一个 sum 函数如下所示：

```js
sum(1, 2, 3).valueOf(); //6
sum(2, 3)(2).valueOf(); //7
sum(1)(2)(3)(4).valueOf(); //10
sum(2)(4, 1)(2).valueOf(); //9
sum(1)(2)(3)(4)(5)(6).valueOf(); // 21
```
<!-- more -->

## 使用 valueOf 进行计算

sum 返回一个函数，收集所有的累加项，使用递归实现
返回函数带有 valueOf 属性，用于统一计算

```js
function sum(...args) {
  const f = (...rest) => sum(...args, ...rest);
  f.valueOf = () => args.reduce((x, y) => x + y, 0);
  return f;
}

sum(1, 2, 3).valueOf()  // 6
sum(2, 3)(2).valueOf(); //7
sum(1)(2)(3)(4).valueOf(); //10
sum(2)(4, 1)(2).valueOf(); //9
sum(1)(2)(3)(4)(5)(6).valueOf(); // 21
```

