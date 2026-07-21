---
title: script中定义下列6个属性
date: 2023-04-15 21:06:56
permalink: /pages/393058/
categories: 
  - 全部分类
  - javaScript
tags: 
  - javaScript
author: 
  name: GleenLey
  link: https://gitee.com/Gleenley
---

**`<script>`元素**

> 向HTML页面中插入JavaScript的主要方法，就是使用

<!-- more -->

**`script`中定义了下列6个属性**
 + async ：可选，表示应该立即下载脚本，但不应妨碍页面中的其他操作。只对外部脚本文件有效

 + charset ：可选，表示通过src属性指定的代码的字符集，比较少用。
 + defer ：可选，表示脚本可以延迟到文档完全被解析和显示之后再执行。只对外部脚本文件有效。
 + language ：已废弃
 + src ：可选，表示包含要执行代码的外部文件
 + type ：可选，表示编写代码使用的脚本语言的内容类型（也称为MIME类型）。在HTML5中，默认是text/javascript，所以不需要设置。
**使用script元素嵌入JavaScript代码，有两种方式**
+ 第一种：直接在页面中嵌入JavaScript代码，包裹在 
```js
<script> 元素之间：<script>
 console.log('Hello World');
</script>
```
**注意：在使用 script嵌入JavaScript代码时，切记不要在代码中的任何地方出现 script**

**JavaScript代码的执行顺序：只要不存在defer和async属性，JavaScript代码就会从上至下依次解析**
+ 第二种：使用外链脚本形式，必须有src属性，而且指定一个外部JavaScript文件的链接。
``` js
<script src="example.js"></script>
 ```
**注意：带有src属性的标签之间再包含额外的JavaScript代码，嵌入代码会被忽略**
+ 只要不存在defer和async属性，浏览器都会按照 script出现的先后顺序对它们依次进行解析。
+ 一般将全部JavaScript引用放在元素中页面的内容后面。

**延迟脚本**
```js
<script defer="defer" src="example.js"></script>
<script async src="example2.js"></script>
```
会先执行example.js，然后执行example2.js
注意：defer只适合外部脚本文件。

**异步脚本**

async 与 defer 属性类似，都用于改变处理脚本的行为，适用于外部脚本文件，并告诉浏览器立即下载，但标记为
async 的脚本并不保证按照指定它们的先后顺序执行。
```js
<script async src="example.js"></script>
<script async src="example2.js"></script>
```
两个执行顺序不定。
指定 async 属性的目的是不让页面等待两个脚本下载和执行，从而异步加载页面其他内容。
注意：异步脚本不要在加载期间修改DOM。
异步脚本一定会在页面的load事件前执行，但可能会在DOMContentLoaded事件触发之前或之后执行。

**使用外部文件的好处**

可维护性：将JavaScript文件都放在一个文件夹中，比每次都需要到不同的HTML页面修改JavaScript方便维护。
可缓存：浏览器会缓存所有外部JavaScript文件，所以当你有多个页面使用同一个JavaScript脚本时，这个脚本只需下载一次。

**`<noscript>`元素**
```js
当浏览器不支持avaScript或被禁用时，显示里面的内容。
<noscript>
 本页面需要浏览器支持（启用）JavaScript
</noscript>
```



**async**
```js
<script async src="index.js"></script>
```
async 模式下，它的加载是异步的，JS 不会阻塞 DOM 的渲染，async 加载是无顺序的，当它加载结束，JS 会立即执行 使用场景：若该 JS 资源与 DOM 元素没有依赖关系，也不会产生其他资源所需要的数据时，可以使用async 模式，比如埋点统计

**defer 模式**
```js
<script defer src="index.js"></script>
```
defer 模式下，JS 的加载也是异步的，defer 资源会在 DOMContentLoaded 执行之前，并且 defer 是有顺序的加载
如果有多个设置了 defer 的 script 标签存在，则会按照引入的前后顺序执行，即便是后面的 script 资源先返回 所以 defer 可以用来控制 JS 文件的执行顺序，比如 element-ui.js 和 vue.js，因为 element-ui.js 依赖于 vue，所以必须先引入 vue.js，再引入 element-ui.js
```js
<script defer src="vue.js"></script>
<script defer src="element-ui.js"></script>
```
defer 使用场景：一般情况下都可以使用 defer，特别是需要控制资源加载顺序时

**module 模式**

```js 
 <script type="module">import { a } from './a.js'</script>
```
在主流的现代浏览器中，script 标签的属性可以加上 type="module"，浏览器会对其内部的 import 引用发起 HTTP 请求，获取模块内容。这时 script 的行为会像是 defer 一样，在后台下载，并且等待 DOM 解析 Vite 就是利用浏览器支持原生的 es module 模块，开发时跳过打包的过程，提升编译效率

**preload**
```js
<link rel="preload" as="script" href="index.js">
```
link 标签的 preload 属性：用于提前加载一些需要的依赖，这些资源会优先加载
vue2 项目打包生成的 index.html 文件，会自动给首页所需要的资源，全部添加 preload，实现关键资源的提前加载

**preload** 特点：

- preload 加载的资源是在浏览器渲染机制之前进行处理的，并且不会阻塞 onload 事件；
- preload 加载的 JS 脚本其加载和执行的过程是分离的，即 preload 会预加载相应的脚本代码，待到需要时自行调用；

**prefetch**
```js
<link rel="prefetch" as="script" href="index.js">
```

prefetch 是利用浏览器的空闲时间，加载页面将来可能用到的资源的一种机制；通常可以用于加载其他页面（非首页）所需要的资源，以便加快后续页面的打开速度

**prefetch** 特点：

prefetch 加载的资源可以获取非当前页面所需要的资源，并且将其放入缓存至少5分钟（无论资源是否可以缓存）
当页面跳转时，未完成的 prefetch 请求不会被中断



**总结**

+ 把JavaScript插入到HTML页面中要使用 ``` <script>``` 元素，可以内嵌，也可以外链文件；
+ 使用 defer 属性可以让脚本在文档完全呈现之后再执行，延迟脚本总是按照它们的顺序执行；
+ 使用 async 属性表示当前脚本不必等待其他脚本，也不必阻塞文档呈现，不能保证按照它们在页面中出现的顺序执行。
+ 使用 ```<noscript>``` 元素可以指定在不支持脚本的浏览器中显示的提示内容。
- async、defer 是 script 标签的专属属性，对于网页中的其他资源，可以通过 link 的 preload、prefetch 属性来预加载
- 如今现代框架已经将 preload、prefetch 添加到打包流程中了，通过灵活的配置，去使用这些预加载功能，同时我们也可以审时度势地向 script 标签添加 async、defer 属性去处理资源，这样可以显著提升性能
