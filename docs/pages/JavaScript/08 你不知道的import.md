---
title: 你不知道的import
date: 2023-04-20 20:57:00
permalink: /pages/331a00/
categories: 
  - 全部分类
  - javaScript
tags: 
  - javaScript
author: 
  name: GleenLey
  link: https://gitee.com/Gleenley
---
import  
------

- 1.编译时加载
- 2.只引用定义
- 3.按需加载

<!-- more -->

**import有两种模块导入方式：命名式导入（名称导入）和默认导入（定义式导入），以及 import()。**
```js
import defaultMember from "module-name";
import * as name from "module-name";
import { member } from "module-name";
import { member as alias } from "module-name";
import { member1 , member2 } from "module-name";
import { member1 , member2 as alias2 , [...] } from "module-name";
import defaultMember, { member [ , [...] ] } from "module-name";
import defaultMember, * as name from "module-name";
import "module-name";
```

- name－从将要导入模块中收到的导出值的名称
- member, memberN－从导出模块，导入指定名称的多个成员
- defaultMember－从导出模块，导入默认导出成员
- alias, aliasN－别名，对指定导入成员进行的重命名
- module-name－要导入的模块。是一个文件名
- as－重命名导入成员名称（“标识符”）
- from－从已经存在的模块、脚本文件等导入

```js
import()
import()返回一个 Promise 对象。
// 报错
if (x === 2) {
  import MyModual from './myModual';
}
```
引擎处理import语句是在编译时，这时不会去分析或执行if语句，所以**import** 语句放在if代码块之中毫无意义，因此会报句法错误，而不是执行时错误。没办法像require样根据条件动态加载。于是提案引入import()函数，编译时分析if语句,完成动态加载。
```js
if(x === 2){
  import('myModual').then((MyModual)=>{
    new MyModual();
  })
}
```
import是如何工作的
----------------
当浏览器解析 `import HelloWorld from './components/HelloWorld.vue'` 时，
会向当前域名发送一个请求获取对应的资源（ESM支持解析相对路径）。
 
浏览器下载对应的文件，然后解析成模块记录。接下来会进行实例化，为模块分配内存，然后按照导入、
导出语句建立模块和内存的映射关系。最后，运行上述代码，把内存空间填充为真实的值。

如何使用
-------
1.加载某个模块`export`的对外接口，导入外部的变量或函数等
下面例子以`a.js & b.js`为例，二者 在同一目录且在`b.js`中引入`a.js`模块
```js
javascript复制代码// 写法一
export const m = 1;
import {m} from './a';

// 写法二
const m = 1;
export {m};
import {m} from './a'; 

// 写法三
const n = 1;
export {n as m};
import {m} from './a'; 

// 写法四
export function f() {};
import {f} from './a'; 

// 写法五
function f() {}
export {f};
import {f} from './a'; 
```
下面写法用export default命令，为模块指定默认输出，让其他调用该模块时不用阅读文档就能加载模块
```js
// 写法六
function f() {}
export default f; 
// f函数的函数名f，在模块外部是无效的。加载的时候，视同匿名函数加载。
const m = {};
export default m; 
// 定义的对象常量名m，在模块外部是无效的，加载的时候，视同匿名函数加载。
import a from './a'

```
此种情况`import`命令可以为该匿名函数指定任意名字，这里`import`后的a就是随意命名的导入变量名。
```js
// 写法七
export default function () {};
import pro from './a';
```
import的例子：
```js
import {firstName, lastName, year} from './profile';

import * as pro from './profile';

import pro from './profile';
```
2.导入外部的模块，并立即执行，即使该文件并没有`export`

`import './lib/test'`;
上面例子将会执行从头到尾执行引入的`js`文件，当然，会忽略`js`文件里`export`，所以这种引入方式并不会关注是否有`export`。
`improt * from ''`可以认为是 `import {default as *} from ''`的语法糖


