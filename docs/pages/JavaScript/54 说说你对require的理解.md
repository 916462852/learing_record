---
title: 说说你对require的理解
date: 2023-06-03 10:06:55
permalink: /pages/517729/
categories:
  - 全部分类
  - javaScript
tags:
  - javaScript
author: 
  name: GleenLey
  link: https://gitee.com/Gleenley
---


## 出现时间及浏览器支持度

*   CommonJS 模块化方案 require/exports 是为服务器端开发设计的。服务器模块系统**同步读取模块文件内容**，编译执行后得到模块接口。（Node.js 是 CommonJS 规范的实现）。

<!-- more -->

|  | 年份 | 出处 |
| --- | --- | --- |
| require | 2009 | CommonJS |
| import | 2015 | ES6 |


    
*   在浏览器端，因为其**异步加载脚本文件**的特性，CommonJS 规范无法正常加载。所以出现了 RequireJS、SeaJS 等（兼容 CommonJS ）为浏览器设计的模块化方案。直到 ES6 规范出现，**浏览器**才拥有了自己的模块化方案 import/export。
    
    *   [为什么commonjs不适合于浏览器端](https://link.juejin.cn/?target=https%3A%2F%2Fwww.cnblogs.com%2Fwbxjiayou%2Fp%2F6197678.html "https://www.cnblogs.com/wbxjiayou/p/6197678.html")
*   **原生浏览器不支持 require/exports**，可使用支持 CommonJS 模块规范的 Browsersify、webpack 等打包工具，它们会将 require/exports 转换成能在浏览器使用的代码。
    
*   **import/export 在浏览器中无法直接使用**，我们需要在引入模块的
    
*   即使 Node.js 13.2+ 可以通过修改文件后缀为 [.mjs](https://link.juejin.cn/?target=https%3A%2F%2Flink.zhihu.com%2F%3Ftarget%3Dhttp%3A%2F%2Fwww.ruanyifeng.com%2Fblog%2F2020%2F08%2Fhow-nodejs-use-es6-module.html "https://link.juejin.cn?target=https%3A%2F%2Flink.zhihu.com%2F%3Ftarget%3Dhttp%3A%2F%2Fwww.ruanyifeng.com%2Fblog%2F2020%2F08%2Fhow-nodejs-use-es6-module.html") 来支持 ES6 模块 import/export，但是**Node.js 官方不建议在正式环境使用**。目前可以使用 [babel](https://link.juejin.cn/?target=https%3A%2F%2Flink.zhihu.com%2F%3Ftarget%3Dhttps%3A%2F%2Fbabeljs.io%2F "https://link.juejin.cn?target=https%3A%2F%2Flink.zhihu.com%2F%3Ftarget%3Dhttps%3A%2F%2Fbabeljs.io%2F") 将 ES6 的模块系统编译成 CommonJS 规范（注意：语法一样，但具体实现还是 require/exports）。
    

2、import

*   代码是在**模块作用域**中运行，而不是在全局作用域中运行。模块内部的顶层变量，外部不可见。
    
*   **模块之中，顶层的this关键字返回undefined，而不是指向window。**
    
*   ES6 模块的加载路径必须给出脚本的完整路径，不能省略脚本的后缀名。
    


require用法
-------

```js
const fs = require('fs');
exports.fs = fs;
module.exports = fs;
```

*   exports是对module.exports的引用，相当于`exports = module.exports = {}`
    
*   在不改变exports指向的情况下，使用exports和module.exports没有区别。**如果将exports指向了其他对象，exports改变不会改变模块输出值。**
    
```js
// utils.js
    let a = 100;
    exports.a = 200;
    console.log(module.exports); // {a:200}
    exports = {a: 300}; // exports指向其他内存区

// test.js
    var a = require('./utils');
    console.log(a); // {a: 200}
```

 * require 支持引入的文件类型为： `.js .json .node`     
 - `.js`  -> 要求输出模块为 module.exports 或者export   
 - `.json` -> 通过`JSON.parse`对文件进行解析 并输出对象

import
------

```js
import fs from 'fs'
import { readFile } from 'fs'
// 从fs中导入使用export default导出的模块
import { default as fs } from 'fs'
import * as fileSystem from 'fs'
import { readFile as read } from 'fs'

export default fs
export const fs
export function readFile
export { readFile, read }
export * from 'fs'

```

*   `export default`导出的模块，引入时不用加{}。
    
*   一个文件只能导出一个default模块。
    
*   **浏览器引入模块的`<script>`标签要加`type="module"`属性**
    
*   import不能对引入模块重新赋值/定义
    

差异
==

模块加载时间
------

*   require： 运行时加载
    
*   import： 编译时加载（静态编译）
    
    *   效率更高。由于是编译时加载，所以import命令会提升到整个模块的头部。
        
    ```js
    test();
    import { test } from './test'
    ```
        
*   ES6 模块可以在import 引用语句前使用模块，CommonJS 则需要先引用后使用 。
    

> 编程语言，是程序员们操控电脑以实现各种功能的主要方式，而解释执行与编译执行，是计算机编程语言的两种执行方式。
> 
> 1.编译：将源代码一次性转换为机器码的过程（机器码有保存为文件，下次运行的时候直接运行机器码）
> 
> 2.解释：将源代逐行转换为机器码并运行的过程（机器码并没有保存下来）
> 
> 3.编译执行（编译器）：将一段程序直接翻译成机器码(对于C/C++这种非跨平台的语言)或者中间码(Java这种跨平台语言，需要JVM再将字节码编译成机器码)。编译执行是直接将所有语句都编译成了机器语言，并且保存成可执行的机器码。执行的时候，是直接进行执行机器语言，不需要再进行解释/编译。
> 
> 4.解释执行（解释器）：在执行程序时，再将中间码（例如Java的字节码通过JVM解释成机器码）一行行的解释成机器码进行执行。这个运行过程是解释一行，执行一行。
> 
> 执行编译过程的程序叫做编译器。
> 
> 执行解释过程的程序叫做解释器。
> 
> 编译相当于做好了一桌子菜，可以直接开吃了。
> 
> 而解释就相当于吃火锅，需要一边煮一边吃。
> 


模块的本质
-----

**require**
    
 加载的是一个对象 （即 module.exports 属性），该对象只有在脚本运行完才会生成。
-   import
    
*   ES6模块不是对象，而是通过export命令显式指定输出的代码，再通过import命令输入。这也导致了没法引用ES6模块本身，因为它不是对象。它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。
*   由于ES6模块是编译时加载，使得静态分析成为可能。比如引入类型检验（ts）这种只能靠静态分析实现的功能。

```js
// CommonJS模块
let { exists, readFile } = require('fs');

// 等同于
let fs = require('fs');
let exists = fs.exists;
let readFile = fs.readfile;

// ES6模块
import { exists, readfile } from 'fs';

```

-  CommonJS模块实际上加载了fs对象，然后再从fs对象上读取方法。
-  ES6模块实际上只从fs模块加载了两个方法，其他方法不加载。



##使用

- import/export 只能在模块顶层使用，不能在函数、判断语句等代码块之中引用；require/exports 可以。

严格模式
----

*   CommonJS默认采用非严格模式，ES6模块自动采用严格模式

输出
--

**CommonJS模块输出的是一个值的拷贝，ES6模块输出的是值的引用。**
    
- ES6 模块的运行机制与 CommonJS 不一样。JS 引擎对脚本静态分析的时候，遇到模块加载命令import，就会生成一个只读引用。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。
    
```js
// test1.js
    export var fn = 'bar';
    setTimeout(() => fn = 'hello', 500);
    
// test2.js
    import { fn } from './test1.js';
    console.log(fn);  // bar
    setTimeout(() => console.log(fn), 600); // hello


```

    

this指向
------

*   ES6 模块之中，顶层的 this 指向 undefined ，即不应该在顶层代码使用 this。CommonJS 模块的顶层this指向当前模块，这是两者的一个重大差异。
    
*   ES6 模块应该是通用的，同一个模块不用修改，就可以用在浏览器环境和服务器环境。为了达到这个目标，Node.js 规定 ES6 模块之中不能使用 CommonJS 模块的特有的一些内部变量。首先，就是`this`关键字。ES6 模块之中，顶层的`this`指向`undefined`；CommonJS 模块的顶层`this`指向当前模块，这是两者的一个重大差异。其次，以下这些顶层变量在 ES6 模块之中都是不存在的。`arguments` `require` `module` `exports` `__filename` `__dirname`

循环加载Commonjs 加载原理
-------------

CommonJS的一个模块，就是一个脚本文件。require命令第一次加载该脚本，就会执行整个脚本，然后再内存生成一个对象。
    
```js
    {
        // 模块名
        id: '...',
        // 模块输出的各个接口
        exports: { ... },
        // 表示该模块的脚本是否执行完毕
        loaded: true,
        ...
    }
```

- 上面就是Node内部加载模块后生成的一个对象。还有很多其他属性，在此省略。
- 以后需要用到这个模块的时候，就回到exports属性上取值。即使再次执行require命令，也不会再次执行该模块，而是到缓存中取值。
- 也就是说，CommonJS模块无论加载多少次，都只会在第一次加载时运行一次，以后再加载，就返回第一次运行的结果，除非手动清除系统缓存。
