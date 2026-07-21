---
title: localStorage和sessionStorage
date: 2023-05-19 21:02:24
permalink: /pages/263053/
categories: 
  - 全部分类
  - 浏览器工作原理与实战
tags: 
  - null
author: 
  name: GleenLey
  link: https://gitee.com/Gleenley
---

### 从一道面试题说起
> 可能有很多小伙伴在面试的时候,经常被问到**localStorage**和**sessionStorage** ,那么关于**localStorage**和**sessionStorage** 我们应该如何去回答呢？ 我们可以从这两者的差异性去了解一下,接下来我们一起来看看吧！

<!-- more -->
### 初识sessionStorage 
 

![session.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/47e946f6d22d4de8a906d6fa42762cde~tplv-k3u1fbpfcp-watermark.image?)

从上图我们可以看到在application中有**sessionStorage** ,Key和Value存储了若干数据,那么我们如何去使用呢？

#### 如何使用
```
const person = { 
  name: 'huangyanting',
  age: 3 
}
sessionStorage.setItem('tg',person)

sessionStorage.getItem('tg')  // '[object Object]'
```

![1.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1970b7be351a4638b9574dc2e363c0d1~tplv-k3u1fbpfcp-watermark.image?)


![2.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d1768b4e0dda4945a60efed43a49595d~tplv-k3u1fbpfcp-watermark.image?)

可能会有小伙伴会有疑问,为什么我们存储的明明是一个对象,到了SessionStorage中tg对应的Value是[object Object]呢? 当然,这不是我们预期想要的效果, 那么我们如何处理成我们想要的数据呢？
```
sessionStorage.setItem('tg',JSON.stringify(person))
```


![3.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7e83affd3a624f43855bdddfad0f8942~tplv-k3u1fbpfcp-watermark.image?)
显然,现在已经达到预期,那么我们尝试取出数据看看

```
const result = sessionStorage.getItem('tg')
// '{"name":"huangyanting","age":3}'

Object.prototype.toString.call(result)  
// '[object String]'
```


![4.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b2fe34af8a6a452a8b82efb402741815~tplv-k3u1fbpfcp-watermark.image?)

我们取出的数据是string类型, 当然这也不是我们想要的预期效果, 那么如何处理呢？

```
const changeResult = JSON.parse(sessionStorage.getItem('tg'))
// {name: 'huangyanting', age: 3}

Object.prototype.toString.call(changeResult)
//'[object Object]'
```

由此可知,通过转换成字符串的形式存储,取出的时候转换成对象,就能正常的存储和读取。

#### 内存大小

肯定很多小伙伴会有疑问,**sessionStorage**的内存到底有多大呢？

[在线测试](http://dev-test.nemikor.com/web-storage/support-test/)


![5.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3b9ea44bdf004ea08ab3b7e55030bed5~tplv-k3u1fbpfcp-watermark.image?)
 通过上图所示,我们可以得到 **localStorage**和**sessionStorage**的存储空间均为5101k, 约等于4.98M
 
 #### 失效时间
 **sessionStorage**的失效时间为当前会话是否被关闭, 如果当前会话中存储有key和value,会话关闭数据则消失,所以我们可以得到结论,**sessionStorage**的失效取决于会话
 
 **localStorage**的失效时间为用户手动删除,相比**sessionStorage**的失效方式是不一样的
 ```
 localStorage.setItem('tg',' = =')
 ```
 
![6.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/90ba64a0c00f45828834d6b01fbc561c~tplv-k3u1fbpfcp-watermark.image?)

当我们需要移除的时候,不过需要注意的是,我们在使用 **localStorage**的时候,移除、存储方式和取出方式与**sessionStorage**是保持一致的

```
localStorage.removeItem('tg')
```

![7.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/063c0e27cfbe4d7eb8088d798960531a~tplv-k3u1fbpfcp-watermark.image?)


#### 使用场景
在我们日常开发中,我们可以根据业务场景去使用**sessionStorage**和 **localStorage**,考虑存储空间的大小,当然我们不能滥用,不足之处还请指正~
 
