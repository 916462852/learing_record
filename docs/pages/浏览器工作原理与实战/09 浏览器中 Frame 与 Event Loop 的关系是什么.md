---
title: 浏览器中 Frame 与 Event Loop 的关系是什么
date: 2023-04-09 01:12:30
permalink: /pages/142951/
categories: 
  - 全部分类
  - 浏览器工作原理与实战
tags: 
  - null
author: 
  name: GleenLey
  link: https://gitee.com/Gleenley
---
## 浏览器中 Frame 与 Event Loop 的关系是什么

> Frame 是指浏览器一帧的绘制时间，即从上一帧绘制到下一帧绘制的时间间隔。浏览器利用 Frame 来渲染页面，一般情况下，每秒钟会有 60 帧左右的 Frame。

<!-- more -->

浏览器组成中有两大引擎，JS引擎和渲染引擎。

Frame(帧)是渲染引擎每隔16ms(默认60fps)将渲染树渲染、合成成位图的结果

每次Event Loop是JS引擎执行的一个周期，执行过程中可能依赖渲染引擎的执行结果，比如访问DOM和CSSOM，也可能影响渲染引擎绘制帧，比如调用 requestAnimationFrame，在每个帧开始绘制时执行一段回调函数(通常包含影响渲染结果的代码)

因此 Frame 和 Event Loop 是相对独立运行的，但是 Event Loop 中执行的代码可能依赖或影响 Frame


JavaScript 运行时采用了事件循环（Event Loop），它是一种为浏览器中多个线程协调工作的机制。Event Loop 的关键点是维护一个执行队列（Task Queue），并负责将异步任务添加到该队列中等待执行。

在浏览器中，每个 Frame 的渲染和 JavaScript 的执行都是互斥的，也就是说，如果 JavaScript 正在执行，浏览器不能同时进行渲染。在这种情况下，Event Loop 起到了非常重要的作用：当 JavaScript 引擎执行完同步任务后，会查询执行队列中是否有异步任务需要执行，如果有，则将它们添加到主线程的执行栈中执行。这样，JavaScript 引擎就可以充分利用浏览器空闲时刻，执行异步任务，避免阻塞渲染进程。

总结来看，Frame 和 Event Loop 之间的关系是：Frame 是浏览器渲染的基本单位，JavaScript 执行会占用 Frame 的部分时间，而 Event Loop 则负责管理 JavaScript 的异步任务，将它们添加到执行队列等待执行，从而避免阻塞渲染进程，保证页面的流畅性。