---
title: JavaScript是如何影响DOM树构建的
date: 2023-04-09 01:12:30
permalink: /pages/16792f/
categories: 
  - 全部分类
  - 浏览器工作原理与实战
tags: 
  - null
author: 
  name: GleenLey
  link: https://gitee.com/Gleenley
---
1.  在渲染引擎内部，有一个叫 **HTML 解析器（HTMLParser)** 的模块，它的职责就是负责将 HTML 字节流转换为 DOM 结构。

<!-- more -->

2.  HTML 解析器是等整个 HTML 文档加载完成之后开始解析的，还是随着 HTML 文档边加载边解析的？
HTML 解析器并不是等整个文档加载完成之后再解析的，而是网络进程加载了多少数据，      HTML 解析器便解析多少数据。
那么浏览器就会判断这是一个 HTML 类型的文件，然后为该请求选择或者创建一个渲染进程。
渲染进程准备好之后，网络进程和渲染进程之间会建立一个共享数据的管道，网络进程接收到数据后就往这个管道里面放，而渲染进程则从管道的另外一端不断地读取数据，并同时将读取的数据“喂”给 HTML 解析器。
你可以把这个管道想象成一个“水管”，网络进程接收到的字节流像水一样倒进这个“水管”，而“水管”的另外一端是渲染进程的 HTML 解析器，它会动态接收字节流，并将其解析为 DOM。

3. bytes 字节流   
``
  ------>.   分词器 tokens  ------>.  生成节点。 ------>.  DOM
```
4. 第一个阶段，通过分词器将字节流转换为 Token。
```
   ---  V8 编译 JavaScript 过程中的第一步是做词法分析，将 JavaScript 先分解为一个个Token。
   解析 HTML 也是一样的，需要通过分词器先将字节流转换为一个个 Token
   ---->  分为 Tag Token 和文本 Token

   --->. 至于后续的第二个和第三个阶段是同步进行的，需要将 Token 解析为 DOM 节点，并将 DOM 节点添加到 DOM 树中。
   
   --->. HTML 解析器维护了一个Token 栈结构
      --->. 该 Token 栈主要用来计算节点之间的父子关系，在第一个阶段中生成的 Token      会被按照顺序压到这个栈中
     1----> 压入到栈中的是StartTag Token
          HTML 解析器会为该 Token 创建一个 DOM 节点，然后将该节点加入到 DOM 树             中，它的父节点就是栈中相邻的那个元素生成的节点。
     2-----> 分词器解析出来是文本 Token
          那么会生成一个文本节点，然后将该节点加入到 DOM 树中，
          文本 Token 是不需要压入到栈中，它的父节点就是当前栈顶 Token 所对应的 DOM           节点。
     3----->. 分词器解析出来的是EndTag 标签
          比如是 EndTag div，HTML 解析器会查看 Token 栈顶的元素是否是 StarTag             div，如果是，就将 StartTag div 从栈中弹出，表示该 div 元素解析完成。
     通过分词器产生的新 Token 就这样不停地压栈和出栈，整个解析过程就这样一直持续下        去，直到分词器将所有字节流分词完成。
```
5. async 和 defer
```
 <!-- <script async type="text/javascript" src='foo.js'></script> 
    <script defer type="text/javascript" src='foo.js'></script>
-->
    async 和 defer 虽然都是异步的
 ```
使用 async 标志的脚本文件一旦加载完成，会立即执行；
使用了 defer 标记的脚本文件，需要在 DOMContentLoaded 事件之前执行。