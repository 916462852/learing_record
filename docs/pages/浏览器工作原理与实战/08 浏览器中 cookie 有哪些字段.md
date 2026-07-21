---
title: 浏览器中 cookie 有哪些字段
date: 2023-04-23 21:35:57
permalink: /pages/b5c94e/
categories: 
  - 全部分类
  - 浏览器工作原理与实战
tags: 
  - null
author: 
  name: GleenLey
  link: https://gitee.com/Gleenley
---
浏览器中的 cookie 主要包括以下几个字段：
----

+ Name：cookie 的名称
+ Value：cookie 的值
+ Expires/Max-Age：cookie 的过期时间或存活时间
+ Domain：cookie 的所属域名
+ Path：cookie 的路径
+ Secure：cookie 是否只能通过 HTTPS 协议传输
+ HttpOnly：cookie 是否只能通过 HTTP 请求访问，不能被 JavaScript 脚本访问
其中，**Expires** 和 **Max-Age** 只需要设置其中一个即可。如果同时设置了两个字段，那么 **Max-Age** 会覆盖 **Expires**。

<!-- more -->

例如，创建一个 cookie 的示例代码如下：
```
javascript
document.cookie = 'name=value;expires=Fri, 23 Apr 2024 13:30:00 GMT;path=/;domain=.example.com;secure';

```