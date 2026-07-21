---
title: Nginx中出现跨域如何解决
date: 2023-06-07 22:44:56
permalink: /pages/738b69/
categories:
  - 全部分类
  - Nginx
tags:
  - Nginx
author: 
  name: GleenLey
  link: https://gitee.com/Gleenley
---

## 为什么会出现跨域？

> 跨域是因为浏览器的同源策略限制所导致的。同源策略是一种安全机制，它不允许一个源的JavaScript代码去访问另一个源的资源。同源是指协议、主机和端口号都相同，只要有一个不同就被认为是跨域。例如，一个网站上的JavaScript代码想要获取另一个网站上的数据，就会触发跨域问题。为了解决跨域问题，可以使用跨域资源共享（CORS）机制、JSONP、代理等技术，当然本文的场景是针对Nginx中出现跨域的问题，我们用Nginx的方案去解决

<!-- more -->
## 以下是关于Nginx跨域请求配置

```sh
location / {  
    # 允许跨域的请求，可以自定义变量$http_origin，*表示所有  
    add_header 'Access-Control-Allow-Origin' *;  
    # 允许携带cookie请求  
    add_header 'Access-Control-Allow-Credentials' 'true';  
    # 允许跨域请求的方法：GET,POST,OPTIONS,PUT  
    add_header 'Access-Control-Allow-Methods' 'GET,POST,OPTIONS,PUT';  
    # 允许请求时携带的头部信息，*表示所有  
    add_header 'Access-Control-Allow-Headers' *;  
    # 允许发送按段获取资源的请求  
    add_header 'Access-Control-Expose-Headers' 'Content-Length,Content-Range';  
    # 一定要有！！！否则Post请求无法进行跨域！  
    # 在发送Post跨域请求前，会以Options方式发送预检请求，服务器接受时才会正式请求  
    if ($request_method = 'OPTIONS') {  
        add_header 'Access-Control-Max-Age' 1728000;  
        add_header 'Content-Type' 'text/plain; charset=utf-8';  
        add_header 'Content-Length' 0;  
        # 对于Options方式的请求返回204，表示接受跨域请求  
        return 204;  
    }  
}  
```
