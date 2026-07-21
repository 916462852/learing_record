---
title: 渲染流水线CSS如何影响首次加载时的白屏时间
date: 2023-04-09 01:12:30
permalink: /pages/1af06f/
categories: 
  - 全部分类
  - 浏览器工作原理与实战
tags: 
  - null
author: 
  name: GleenLey
  link: https://gitee.com/Gleenley
---
1.  当渲染进程接收 HTML 文件字节流时，会先开启一个预解析线程
2.  如果遇到 JavaScript 文件或者 CSS 文件，那么预解析线程会提前下载这些数据。


<!-- more -->


```html
<html>
<head>
    <link href="theme.css" rel="stylesheet">
</head>
<body>
    <div>geekbang com</div>
</body>
</html>
```

      预解析线程会解析出来一个外部的 theme.css 文件，并发起 theme.css 的下载。
      这里也有一个空闲时间需要你注意一下，
      就是在 DOM 构建结束之后、theme.css 文件还未下载完成的这段时间内，渲染流水线无事可做，因为下一步是合成布局树，而合成布局树需要 CSSOM 和 DOM，所以这里需要等待 CSS加载结束并解析成 CSSOM。

3. 那渲染流水线为什么需要 CSSOM 呢？
     ```和 HTML 一样，渲染引擎也是无法直接理解 CSS 文件内容的，
        所以需要将其解析成渲染引擎能够理解的结构，这个结构就是 CSSOM。
        和 DOM 一样，CSSOM 也具有两个作用：
              第一个是提供给 JavaScript 操作样式表的能力
              第二个是为布局树的合成提供基础的样式信息
                 CSSOM 体现在 DOM 中就是document.styleSheets
    ```
    
4. 合成布局树： (05.渲染进程上)
    ``` 等 DOM 和 CSSOM 都构建好之后，渲染引擎就会构造布局树
        布局树的结构基本上就是复制 DOM 树的结构，
        不同之处在于 DOM 树中那些不需要显示的元素会被过滤掉，
            如 display:none 属性的元素、head 标签、script 标签等。
        复制好基本的布局树结构之后，
        渲染引擎会为对应的 DOM 元素选择对应的样式信息，这个过程就是样式计算
        样式计算完成之后
        渲染引擎还需要计算布局树中每个元素对应的几何位置
        这个过程就是计算布局
        通过样式计算和计算布局就完成了最终布局树的构建
        再之后，就该进行后续的绘制操作了
    ```
    
5. HTML 预解析器识别出来了有 CSS 文件和 JavaScript 文件需要下载，然后就同时发起这两个文件的下载请求，需要注意的是，这两个文件的下载过程是重叠的，所以下载时间按照最久的那个文件来算。
6. 不管 CSS 文件和 JavaScript 文件谁先到达，都要先等到 CSS 文件下载完成并生成 CSSOM，然后再执行 JavaScript 脚本，最后再继续构建 DOM，构建布局树，绘制页面。

7. 为什么要花这么多文字来分析渲染流水线呢？
     ```主要原因就是渲染流水线影响到了首次页面展示的速度，而首次页面展示的速度又直接影响到了用户体验```

8.从发起 URL 请求开始，到首次显示页面的内容，在视觉上经历的三个阶段
    ```第一个阶段：
       等请求发出去之后，到提交数据阶段，这时页面展示出来的还是之前页面的内容。
       第二个阶段：
       提交数据之后渲染进程会创建一个空白页面，我们通常把这段时间称为解析白屏
       并等待 CSS 文件和 JavaScript 文件的加载完成，生成 CSSOM 和 DOM
       然后合成布局树，最后还要经过一系列的步骤准备首次渲染。
       第三个阶段：
       等首次渲染完成之后，就开始进入完整页面的生成阶段了，然后页面会一点点被绘制出          来。```
       
9. 重点关注第二个阶段，这个阶段的主要问题是白屏时间：
    ```
         解析 HTML、下载 CSS、下载 JavaScript、生成 CSSOM、执行 JavaScript、生				 成布局树、绘制页面
         通常情况下的瓶颈主要体现在下载 CSS 文件、下载 JavaScript 文件和执行  		          JavaScript。
         
         所以要想缩短白屏时长，可以有以下策略：
         通过内联 JavaScript、内联 CSS 来移除这两种类型的文件下载，这样获取到              HTML 文件之后就可以直接开始渲染流程了。
         但并不是所有的场合都适合内联，那么还可以尽量减少文件大小，比如通过 webpack 					等工具移除一些不必要的注释，并压缩 JavaScript 文件。
         还可以将一些不需要在解析 HTML 阶段使用的 JavaScript 标记上 sync 或者            defer。 ---> JS 高程重点解析
         对于大的 CSS 文件，可以通过媒体查询属性，将其拆分为多个不同用途的 CSS 文					 件，这样只有在特定的场景下才会加载特定的 CSS 文件。
    ````

10 .问题：
```
  1:<script src="foo.js" type="text/javascript"></script>
  2:<script defer src="foo.js" type="text/javascript"></script>
  3:<script sync src="foo.js" type="text/javascript"></script>
  4:<link rel="stylesheet" type="text/css" href="foo.css" />
  5:<link rel="stylesheet" type="text/css" href="foo.css" media="screen"/>
  6:<link rel="stylesheet" type="text/css" href="foo.css" media="print" />
  7:<link rel="stylesheet" type="text/css" href="foo.css" media="orientation:landscape" />
  8:<link rel="stylesheet" type="text/css" href="foo.css" media="orientation:portrait" />
```

orientation:检测设备目前处于横向还是纵向状态。
 ```
 用min-width时，小的放上面大的在下面，同理如果是用max-width那么就是大的在上面，小的在下面
 ```


​       
