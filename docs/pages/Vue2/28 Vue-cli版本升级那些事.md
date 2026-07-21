---
title: vue-cli版本升级那些事
date: 2023-05-24 21:08:20
permalink: /pages/93b23d/
categories:
  - 全部分类
  - vue2
tags:
  - vue2
author: 
  name: GleenLey
  link: https://gitee.com/Gleenley
---

# 前言

对于项目太大，升级有难度，又想体验`compositionAPI`的可以先过渡到`vue2.7`[官方升级指南](https://blog.vuejs.org/posts/vue-2-7-naruto.html)

<!-- more -->


## 实践
1. 删除`lock`文件和`node_modules`，防止有缓存
如果使用`yarn`安装的依赖，删除`yarn.lock`
如果是用`npm`，删除`package-lock.json`
如果是用`pnpm`，删除`pnpm-lock.yaml`
2. 升级`vue-cli`的版本
如果脚手架版本是4.x.x，推荐升级到~4.5.18
如果脚手架版本是5.x.x，推荐升级到~5.0.6
由于当前我的项目的用的还是vue-cli3，所以这里升级到vue-cli4；
修改前：
```js
 "@vue/cli-plugin-babel": "^3.12.1",
 "@vue/cli-plugin-eslint": "^3.12.1",
 "@vue/cli-service": "^3.12.1",
 ```

修改后：
```js
 "@vue/cli-plugin-babel": "~4.5.18",
 "@vue/cli-plugin-eslint": "~4.5.18",
 "@vue/cli-service": "~4.5.18",
 ```
升级下`core-js`，因为不升级我这里会报"`* core-js/modules/es6…`"类似的错误
修改前：
```js
"core-js": "^2.6.11",
```
修改后：
```js
"core-js": "^3.25.1",
```
升级下`sass-loader`，`vue-cli4`支持的最低的`sass-loader`版本是8.0
修改前：
```js
 "sass": "~1.32.6",
 "sass-loader": "^7.3.1",
```
修改后：
```js
 "sass": "~1.32.6",
 "sass-loader": "^8.0.2",
```
修改`vue.config.js`里， `CSS` 相关的 `loader` 传递选项，`data`改为`prependData`
修改前：
```js
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/variables.scss";@import "@/common.scss";`
      }
    }
  }
```
修改后：
```js
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/variables.scss";@import "@/common.scss";`
      }
    }
  }
```
修改`babel.config.js`
修改前：
```js
module.exports = {
  presets: [
    '@vue/app'
  ]
}
```
修改后：
```js
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ]
}
```
## 升级vue的版本
删除"`vue-template-compiler`"，因为在2.7中不再需要它
修改前：
```js
"vue": "^2.6.11",
"vue-template-compiler": "^2.6.11"
```
修改后：
```js
"vue": "^2.7.0"
```