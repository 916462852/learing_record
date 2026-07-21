---
title:  如何解析URL的querystring
date: 2023-06-21 19:37:22
permalink: /pages/7c8f62/
categories:
  - 全部分类
  - javaScript
tags:
  - javaScript
author: 
  name: GleenLey
  link: https://gitee.com/Gleenley
---

> 关于路由中解析 querystring，无论前端开发还是后端开发都无时无刻在使用这项功能

<!-- more -->

```js
const url = "https://baidu.com?a=3&b=4&c=5";
 
// 解析后得到 qs 如下
const qs = {
  a: 3,
  b: 4,
  c: 5,
};
```


## 方式一

```js
function parse(url) {
  // 一、夹杂在 ? 与 # 之前的字符就是 qs，使用 /\?([^/?#:]+)#?/ 正则来抽取
  // 使用正则从 URL 中解析出 querystring
  // 二、通过 Optional Chain 来避免空值错误
  const queryString = url.match(/\?([^/?#:]+)#?/)?.[1];
 
  if (!queryString) {
    return {};
  }
 
  queryObj = queryString.split("&").reduce((params, block) => {
    // 三、如果未赋值，则默认为空字符串
    const [_k, _v = ""] = block.split("=");
    // 四、通过 decodeURIComponent 来转义字符，切记不可出现在最开头，以防 ?tag=test&title=1%2B1%3D2 出错
    const k = decodeURIComponent(_k);
    const v = decodeURIComponent(_v);
 
    if (params[k] !== undefined) {
      // 处理 key 出现多次的情况，设置为数组
      params[k] = [].concat(params[k], v);
    } else {
      params[k] = v;
    }
    return params;
  }, {});
  return queryObj;
}
```


## 方式二

```js
function url2Params(url) {
  const dict = {};
  url.replace(/([^?&]*)=([^&]*)/g, (__, key, val) => {
    key = decodeURIComponent(key);
    val = decodeURIComponent(val);
    if (dict[key]) return (dict[key] = [dict[key], val].flat());
    dict[key] = val;
  });
  return dict;
}
```


## 方式三

```js
function parse() {
  let serach = window.location.search;
  let params = new URLSearchParams(serach),
    queryObj = {};
  for (let [k, v] of params.entries()) {
    if (queryObj[k] !== undefined) {
      queryObj[k] = [].concat(queryObj[k], v);
    } else {
      queryObj[k] = v;
    }
  }
  return queryObj;
}
```