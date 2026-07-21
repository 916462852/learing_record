---
title: javaScript中工具方法
date: 2023-05-19 21:02:24
permalink: /pages/d42725/
categories: 
  - 全部分类
  - javaScript
tags: 
  - javaScript
author: 
  name: GleenLey
  link: https://gitee.com/Gleenley
---
javaScript中工具方法
<!-- more -->

##### 树形结构

 ![lerna](/learing_record/images/dataType.avif)


```js
       let arr = [
            { id: 1, name: '部门1', pid: 0 },
            { id: 2, name: '部门2', pid: 1 },
            { id: 3, name: '部门3', pid: 1 },
            { id: 4, name: '部门4', pid: 3 },
            { id: 5, name: '部门5', pid: 4 },
        ];
```

```js
       function deepTree(params){
        let resArr = [];
        let arrLen = params && params.length;
        for (let i = 0; i < arrLen; i++) {
            let has = false;
            params.map((a, index) => {
                if (a.pid === arr[i].id) {
                    arr[i].children = arr[i].children || [];
                    arr[i].children.push(a);
                }
                if (!has && arr[i].pid === a.id) has = true;
            });
            if (!has) {
                resArr.push(arr[i]);
            }
        }
        console.log(resArr);
       }
       deepTree(arr);
```
##### 返回顶部的通用方法

```js
function backTop(btnId) {
  let btn = document.getElementById(btnId);
  let d = document.documentElement;
  let b = document.body;
  window.onscroll = set;
  btn.style.display = "none";
  btn.onclick = function() {
    btn.style.display = "none";
    window.onscroll = null;
    this.timer = setInterval(function() {
      d.scrollTop -= Math.ceil((d.scrollTop + b.scrollTop) * 0.1);
      b.scrollTop -= Math.ceil((d.scrollTop + b.scrollTop) * 0.1);
      if (d.scrollTop + b.scrollTop == 0)
        clearInterval(btn.timer, (window.onscroll = set));
    }, 10);
  };
  function set() {
    btn.style.display = d.scrollTop + b.scrollTop > 100 ? "block" : "none";
  }
}
backTop("goTop");
```

##### 加入收藏

```js
function addFavorite(sURL, sTitle) {
  try {
    window.external.addFavorite(sURL, sTitle);
  } catch (e) {
    try {
      window.sidebar.addPanel(sTitle, sURL, "");
    } catch (e) {
      alert("加入收藏失败，请使用Ctrl+D进行添加");
    }
  }
}
```

##### 提取页面中所有网址

```js
let aa = document.documentElement.outerHTML
  .match(
    /(url(|src=|href=)["']*([^"'()<>[] ]+)["')]*|(http://[\w-.]+[^"'()<>[] ]+)/gi
  )
  .join("\r\n")
  .replace(/^(src=|href=|url()["']*|["'>) ]*$/gim, "");
console.log(aa);
```
##### 获取当前路径

```js
let currentPageUrl = "";
if (typeof window.href === "undefined") {
  currentPageUrl = document.location.toString().toLowerCase();
} else {
  currentPageUrl = window.href.toString().toLowerCase();
}
```

##### 时间日期格式转换

```js
Date.prototype.format = function(format) {
  let o = {
    "M+": this.getMonth() + 1, //month
    "d+": this.getDate(), //day
    "h+": this.getHours(), //hour
    "m+": this.getMinutes(), //minute
    "s+": this.getSeconds(), //second
    "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
    S: this.getMilliseconds() //millisecond
  };
  if (/(y+)/.test(format))
    format = format.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (let k in o) {
    if (new RegExp("(" + k + ")").test(format))
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  }
  return format;
};
console.log(new Date().format("yyyy-MM-dd hh:mm:ss"));
```
#####  判断是否以某个字符串结束


```js
String.prototype.endWith = function(s) {
  let d = this.length - s.length;
  return d >= 0 && this.lastIndexOf(s) == d;
};
```

##### 获取cookie值

```js
function getCookie(name) {
  let arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
  if (arr != null) return unescape(arr[2]);
  return null;
}
```

##### 获得URL中GET参数值

```js
// 用法：如果地址是 test.htm?t1=1&t2=2&t3=3,
// 那么能取得：GET["t1"], GET["t2"], GET["t3"]
function getGet() {
  querystr = window.location.href.split("?");
  if (querystr[1]) {
    GETs = querystr[1].split("&");
    GET = [];
    for (i = 0; i < GETs.length; i++) {
      tmp_arr = GETs.split("=");
      key = tmp_arr[0];
      GET[key] = tmp_arr[1];
    }
  }
  return querystr[1];
}
```
##### 获取页面高度

```js
function getPageHeight() {
  let g = document,
    a = g.body,
    f = g.documentElement,
    d = g.compatMode == "BackCompat" ? a : g.documentElement;
  return Math.max(f.scrollHeight, a.scrollHeight, d.clientHeight);
}
```
##### 获取页面scrollLeft
```js
function getPageScrollLeft() {
  let a = document;
  return a.documentElement.scrollLeft || a.body.scrollLeft;
}
```
##### 获取页面scrollTop
```js
function getPageScrollTop() {
  let a = document;
  return a.documentElement.scrollTop || a.body.scrollTop;
}
```
##### 获取页面可视宽度

```js
function getPageViewWidth() {
  let d = document,
    a = d.compatMode == "BackCompat" ? d.body : d.documentElement;
  return a.clientWidth;
}
```
##### 获取移动设备屏幕宽度
```js
function getScreenWidth() {
  let smallerSide = Math.min(screen.width, screen.height);
  let fixViewPortsExperiment =
    rendererModel.runningExperiments.FixViewport ||
    rendererModel.runningExperiments.fixviewport;
  let fixViewPortsExperimentRunning =
    fixViewPortsExperiment && fixViewPortsExperiment.toLowerCase() === "new";
  if (fixViewPortsExperiment) {
    if (this.isAndroidMobileDevice() && !this.isNewChromeOnAndroid()) {
      smallerSide = smallerSide / window.devicePixelRatio;
    }
  }
  return smallerSide;
}
```
##### 替换全部

```js
String.prototype.replaceAll = function(s1, s2) {
  return this.replace(new RegExp(s1, "gm"), s2);
};
```

##### 清除空格
```js
String.prototype.trim = function() {
  let reExtraSpace = /^\s*(.*?)\s+$/;
  return this.replace(reExtraSpace, "$1");
};
// 清除左空格
function ltrim(s) {
  return s.replace(/^(\s*|　*)/, "");
}
// 清除右空格
function rtrim(s) {
  return s.replace(/(\s*|　*)$/, "");
}
```

##### 校验手机号码
```js
function isTel(value) {
    return /^1[3,4,5,6,7,8,9][0-9]{9}$/.test(value.toString());
}
```

##### 校验是否为中国大陆第二代居民身份证

```js
function isIDCard(str){
    return /^[1-9][0-9]{5}(18|19|(2[0-9]))[0-9]{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)[0-9]{3}[0-9Xx]$/.test(str);
}
```
##### 复制到剪贴板
```js
const copyToClipboard = (text) => navigator.clipboard.writeText(text;

copyToClipboard("Hello World");
```
##### 找出一年中的某一天
```js
const dayOfYear = (date) =>
Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);

dayOfYear(new Date());
// Result: 353
```
##### 将字符串首字母大写
```js
const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);
capitalize("follow for more");
// Result: Follow for more
```

##### 计算两天之间相差的天数

```js
const dayDif = (date1, date2) => Math.ceil(Math.abs(date1.getTime() - date2.getTime()) / 86400000)

dayDif(new Date("2020-10-21"), new Date("2021-10-22"))
// Result: 366
```

##### 清除所有 Cookie

```js
const clearCookies = document.cookie.split(';').forEach(cookie => document.cookie = cookie.replace(/^ +/, '')
.replace(/=.\*/, `=;expires=${new Date(0).toUTCString()};path=/`));
```

##### 从日期获取“时分秒”格式的时间

```js
const timeFromDate = date => date.toTimeString().slice(0, 8);
console.log(timeFromDate(new Date(2021, 0, 10, 17, 30, 0)));
// Result: "17:30:00"
```

##### 获取用户选定的文本

```js
const getSelectedText = () => window.getSelection().toString();
getSelectedText();
```

##### 打乱数组

```js
const shuffleArray = (arr) => arr.sort(() => 0.5 - Math.random());
console.log(shuffleArray([1, 2, 3, 4]));
// Result: [ 1, 4, 3, 2 ]
```
##### 通用判断类型方法


```js
function getType(obj) {
    let type = typeof obj;
    // 使用 typeof 返回的是小写
    if (type !== "object") return type;
    // 如果是 object
    return Object.prototype.toString.call(obj).replace(/^\[object (\S+)\]$/, '$1')
}

getType([])     // "Array" typeof []是object，因此toString返回
getType('123')  // "string" typeof 直接返回
getType(window) // "Window" toString返回
getType(null)   // "Null"首字母大写，typeof null是object，需toString来判断
getType(undefined)   // "undefined" typeof 直接返回
getType()            // "undefined" typeof 直接返回
getType(function(){}) // "function" typeof能判断，因此首字母小写
getType(/123/g)      //"RegExp" toString返回
```

