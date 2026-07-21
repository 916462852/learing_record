---
title: 太多的 if else 如何优化
date: 2023-06-03 20:08:04
permalink: /pages/40580e/
categories:
  - 全部分类
  - javaScript
tags:
  - javaScript
author: 
  name: GleenLey
  link: https://gitee.com/Gleenley
---

> 假如有这样一段代码，功能是根据 status 字段来转换成文字，当然有人会说使用字典来实现相同的效果，这当然是一个不错的解决方法。但是这里只是来讨论如何在其他地方类型的情形，应该如何优化。

<!-- more -->

```js
function getStatus(status) {
    if (status === "0") {
        console.log("未开始");
    } else if (status === "1") {
        console.log("已开始");
    } else if (status === "2") {
        console.log("已结束");
    } else if (status === "3") {
        console.log("已完成");
    } else if (status === "4") {
        console.log("已转发");
    } else {
        console.log("已归档");
    }
}
```

大量的 if 分支，并且可能还具有分支套分支，可以想象到整个代码的可读性和可维护性和可读性都会大大降低，很容易堆积成屎山一样的代码，不仅不优雅，而且一样让人看出这是一段初级程序员才会写的代码，那有没有什么办法能够即实现需求又能避免这些问题呢？

## map结构简化分支

同样的结果,我们可以换一个方式去实现,去优化上述的代码

```js
function getStatus(status){
    const statusMap =  {
        "0":()=>console.log("未开始"),
        "1":()=>console.log("已开始"),
        "2":()=>console.log("已结束"),
        "3":()=>console.log("已完成"),
        "4":()=>console.log("已转发"),
    }
    statusMap[status] ? statusMap[status]() : console.log("已归档")
}
```

问题代码中的判断都是简单的相等判断，那么我们就可以将这些判断条件作为map对象，这些属性对应的值就是条件成立后的处理函数。

这样一来原本的 if 分支判断就转换成了简单的key value对应值，条件与处理函数一一对应，一目了然。

换一种思路稍微改造一下

```js
  if (target === 1) {
    //   do something 
   } else if (target === 2){
     // do something
   } else {
    // do something
   }

```
```js
const getValue  = (key) => {
// key = `${key}`
// 这种场景 不需要把传递过来的值做数据类型转换 
// 对象的key只有字符串，如果传数字或者其他任何类型，最终js引擎都会调用toString方法。转换字符串。
  const values = {
    '1': 1,
    '2': 2
   }
   return values[key] ?? values['1']
  //    return values[key] || values['1']
}
console.log(getValue(1));
```
- 空值合并操作符（??）

    - 只有当左侧为null和undefined时，才会返回右侧的数

    - 空值合并操作符（??）是一个逻辑操作符，当左侧的操作数为 null 或者 undefined 时，返回其右侧操作数，否则返回左侧操作数。

    - 与逻辑或操作符（||）不同，逻辑或操作符会在左侧操作数为假值时返回右侧操作数。也就是说，如果使用 || 来为某些变量设置默认值，可能会遇到意料之外的行为。比如为假值（例如，'' 或 0）时。

```js

const foo = null ?? 'default string';
console.log(foo);
// expected output: "default string"

const baz = 0 ?? 42;
console.log(baz);
// expected output: 0
const nullValue = null;
const emptyText = ""; // 空字符串，是一个假值，Boolean("") === false
const someNumber = 42;

const valA = nullValue ?? "valA 的默认值";
const valB = emptyText ?? "valB 的默认值";
const valC = someNumber ?? 0;

console.log(valA); // "valA 的默认值"
console.log(valB); // ""（空字符串虽然是假值，但不是 null 或者 undefined）
console.log(valC); // 42
```
## 复杂分支优化

如果我们的 if 分支中的判断条件不只是简单的相等判断，还具有一些需要计算的复杂表达式时，我们该怎么如何优化呢？就如下面的这段代码，其中包含了比较运算，按位运算。
```js
function getUserDescribe(name) {
    if (name.length > 3) {
        console.log("名字太长");
    } else if (name.length < 2) {
        console.log("名字太短");
    } else if (name[0] === "陈") {
        console.log("小陈");
    } else if (name[0] === "李" && name !== "李鹏") {
        console.log("小李");
    } else if (name === "李鹏") {
        console.log("管理员");
    } else {
        console.log("此人比较神秘！");
    }
}
```
对于这种复杂的结构代码，我们可以引入二维数组来进行分支优化：
```js
function getUserDescribe(name) {
    const describeForNameMap = [
        [
            (name) => name.length > 3, // 判断条件
            () => console.log("名字太长") // 执行函数
        ],
        [
            (name) => name.length < 2, 
            () => console.log("名字太短")
        ],
        [
            (name) => name[0] === "陈", 
            () => console.log("小陈")
        ],
        [
            (name) => name === "大鹏", 
            () => console.log("管理员")
        ],
        [
            (name) => name[0] === "李" && name !== "李鹏",
            () => console.log("小李"),
        ],
    ];
    // 获取符合条件的子数组
    const getDescribe = describeForNameMap.find((item) => item[0](name));
    // 子数组存在则运行子数组中的第二个元素（执行函数）
    getDescribe ? getDescribe[1]() : console.log("此人比较神秘！");
}
```

上面我们定义了一个`describeForNameMap`数组，数组内的每一个元素代表一个判断条件与其执行函数的集合（也是一个数组），之后我们通过数组的`find`方法查找`describeForNameMap`数组中符合判断条件的子数组即可。


## 多条件检查
```js
    if (value === 1 || value === 'one' || value === 2 || value === 'two') {
        // Execute some code
    }

    // Shorthand 1
    if ([1, 'one', 2, 'two'].indexOf(value) >= 0) {
    //    // Execute some code
    }

    // Shorthand 2
    if ([1, 'one', 2, 'two'].includes(value)) {
    //    // Execute some code
    }

```
