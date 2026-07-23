---
title: 组件通信、逻辑复用与Pinia
date: 2026-07-23 16:39:00
permalink: /pages/vue3-05/
categories:
  - 全部分类
  - vue3
tags:
  - vue3
  - pinia
  - 面试题
author:
  name: Xiang
  # link: https://gitee.com/lxlxlxlxxl
---

## 组件通信、逻辑复用与Pinia

> 这一篇更偏实际开发和业务面试。常见追问会集中在：组件怎么传值、`provide/inject` 怎么看、为什么不再推荐 `mixin`、`Pinia` 和 `Vuex` 有什么区别。

<!-- more -->

## 一、Vue3 中常见的组件通信方式有哪些？

可以按从近到远的顺序回答。

### 1. 父传子: `props`

最基础、最常用，也最符合单向数据流。

### 2. 子传父: `emit`

子组件通过事件把意图或数据通知父组件。

### 3. 跨层通信: `provide / inject`

祖先组件向深层后代注入依赖，避免一层层透传 `props`。

### 4. 全局状态: `Pinia`

适合多个页面、多块区域共享的状态。

### 5. 模板 `ref` + `defineExpose`

父组件主动调用子组件方法的命令式方案。

## 二、`provide / inject` 适合什么场景？

典型场景:

+ 表单容器与表单项
+ 主题配置
+ 国际化或局部配置注入
+ 组件库内部上下文通信

它更适合做“依赖注入”，而不是到处随手改的全局状态。

## 三、`provide / inject` 的优缺点是什么？

### 优点

+ 避免 `props drilling`
+ 适合跨层共享
+ 对局部子树上下文非常好用

### 缺点

+ 数据来源不如 `props` 直接
+ 滥用后可读性下降
+ 不适合作为复杂全局状态管理的全部替代品

## 四、Vue3 中父组件怎么调用子组件方法？

标准回答:

+ 父组件通过模板 `ref` 获取子组件实例
+ 子组件通过 `defineExpose` 暴露方法或属性

适合场景:

+ 表单校验
+ 聚焦输入框
+ 滚动定位

## 五、Vue3 中如何做逻辑复用？

现在最推荐的方式是 `composable`。

也就是把一段相关逻辑提取成 `useXxx()` 函数，例如:

+ `useRequest`
+ `usePagination`
+ `useMouse`

## 六、为什么 `mixin` 不再推荐？

因为 `mixin` 在中大型项目里容易带来:

+ 命名冲突
+ 数据来源不透明
+ 逻辑耦合
+ 类型体验差

而 `composable` 的优势是:

+ 输入输出清晰
+ 来源明确
+ 更适合 TypeScript
+ 更贴合组合式 API 思维

## 七、`composable` 的设计原则有哪些？

可以从这些角度回答:

+ 一个 composable 只解决一类问题
+ 输入参数清晰
+ 返回值语义明确
+ 尽量隐藏内部副作用细节
+ 组合多个 composable，而不是做超级大 Hook

## 八、什么是 Pinia？

一句话:

> `Pinia` 是 Vue 官方推荐的新一代状态管理方案，适配 Vue3，语法更轻、更现代，对 TypeScript 更友好。

## 九、为什么现在更推荐 Pinia，而不是 Vuex？

高频原因主要有这些:

+ 不再强制 `mutation`
+ API 更简洁
+ 更贴近组合式 API 思维
+ TypeScript 体验更自然
+ 模块化写法更轻量

## 十、Pinia 和 Vuex 的区别是什么？

### Pinia

+ 没有强制 `mutation`
+ 修改状态更直接
+ 组合式写法更自然
+ 类型推导更友好

### Vuex

+ 流程更传统
+ `state / getters / mutations / actions` 更固定
+ 老项目里仍然常见

所以面试里比较稳的说法是:

> Vuex 并不是不能用，而是 Pinia 更符合 Vue3 时代的主流开发方式。

## 十一、Pinia 有哪两种常见写法？

### Option Store

结构更像传统 `Options API`:

+ `state`
+ `getters`
+ `actions`

### Setup Store

结构更像 `Composition API`:

+ `ref`
+ `computed`
+ `function`

如果是现代 Vue3 项目，很多人会更偏向 `Setup Store`。

## 十二、什么时候该用 Pinia，什么时候不该上全局状态？

### 适合使用 Pinia

+ 多页面共享状态
+ 多组件重复依赖同一份数据
+ 登录信息、权限、主题等全局能力
+ 复杂业务状态需要统一管理

### 不适合一上来就用 Pinia

+ 只在单个组件内使用的局部状态
+ 提升到父组件就能解决的问题
+ 纯展示层的小交互状态

## 十三、服务端状态也要放 Pinia 吗？

这题在实战面试里越来越常见。

更稳的回答是:

+ 不是所有接口数据都必须放 Pinia
+ 要区分“全局共享状态”和“服务端获取数据”
+ 某些接口数据适合页面内就地管理，或配合请求缓存方案处理

不要把 Pinia 误用成“所有数据最终归宿”。

## 十四、这一类题的高频易错点

+ 把 `provide/inject` 当成万能全局状态管理
+ 把 `mixin` 说成只是“旧一点”
+ 什么状态都想扔进 Pinia
+ 忽视局部状态和全局状态的边界

## 十五、一段适合面试现场的总结话术

> Vue3 的组件通信仍然是以 `props + emit` 为基础，跨层共享可以用 `provide / inject`，更复杂的全局共享状态则更适合交给 `Pinia`。逻辑复用方面，Vue3 主流方案已经从 `mixin` 转向 `composable`，因为它的来源更清晰、类型体验更好、和组合式 API 更一致。实际项目里，关键不是把工具背出来，而是能判断当前状态到底应该留在组件本地、提升到父组件，还是进入全局 store。
