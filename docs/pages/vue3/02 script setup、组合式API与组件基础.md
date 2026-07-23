---
title: script setup、组合式API与组件基础
date: 2026-07-23 16:36:00
permalink: /pages/vue3-02/
categories:
  - 全部分类
  - vue3
tags:
  - vue3
  - 面试题
author:
  name: Xiang
  # link: https://gitee.com/lxlxlxlxxl
---

## script setup、组合式API与组件基础

> 这篇主要讲 Vue3 组件层最常用、也最容易被问到的一组能力: `setup()`、`script setup`、`defineProps`、`defineEmits`、`defineExpose`、`defineModel`。

<!-- more -->

## 一、`setup()` 是什么？

`setup()` 是 Vue3 组合式 API 的入口函数。

它的特点:

+ 在组件创建前期执行
+ 拿不到组件实例 `this`
+ 可以直接使用响应式 API
+ 可以注册生命周期钩子

一句话理解:

> `setup()` 不是围绕组件实例 `this` 工作，而是围绕响应式状态和闭包组织逻辑。

## 二、`script setup` 是什么？

它本质上是 `setup()` 的编译时语法糖。

它的优势主要有这些:

+ 不需要手动 `return`
+ 顶层变量和函数可直接给模板使用
+ 写法更短
+ 和 TypeScript 配合更自然
+ 编译宏使用更方便

这也是为什么现在 Vue3 项目里，`script setup` 基本已经成了默认写法。

## 三、`setup()` 和 `script setup` 有什么区别？

### 共同点

+ 都是组合式 API 的写法
+ 都可以使用 `ref`、`computed`、`watch` 等能力
+ 都没有组件实例上的 `this`

### 区别

+ `setup()` 是运行时函数入口
+ `script setup` 是编译时语法糖
+ `script setup` 更简洁，更符合现代 Vue3 项目习惯

## 四、为什么 `setup` 里拿不到 `this`？

因为 Vue3 的组合式 API 不再依赖组件实例来组织逻辑。

在 `setup` 中:

+ `this` 是 `undefined`
+ 逻辑通过局部变量、闭包和响应式 API 组织

面试里可以这样概括:

> Vue3 把很多过去挂在实例上的能力，改成了显式导入和显式调用，所以 `this` 不再是核心。

## 五、`defineProps` 是什么？

它是 `script setup` 中的编译宏，用来声明组件接收的 `props`。

高频点:

+ 不需要手动导入
+ 可以做运行时声明，也可以配合 TS 做类型声明
+ 返回 `props` 对象

## 六、`defineEmits` 是什么？

它也是编译宏，用来声明组件会触发哪些事件，并返回 `emit` 方法。

常见场景:

+ 子组件向父组件传值
+ 声明组件对外事件契约

## 七、`defineExpose` 是什么？

在 `script setup` 中，组件内部默认不会把所有内容暴露给父组件。

如果父组件想通过模板 `ref` 主动调用子组件方法，子组件通常需要显式使用 `defineExpose` 暴露能力。

它适合:

+ 表单校验方法暴露
+ 滚动定位
+ 聚焦输入框

## 八、`defineModel` 是什么？

`defineModel` 是较新的编译宏，用于更自然地声明组件上的 `v-model`。

传统写法里，组件 `v-model` 往往需要自己处理:

+ `modelValue`
+ `update:modelValue`

而 `defineModel` 可以让这件事更直接。

面试里知道它的作用即可，不一定每场都要求手写。

## 九、Vue3 中 `v-model` 相比 Vue2 有什么变化？

Vue2 默认是:

+ `value`
+ `input`

Vue3 默认变成:

+ `modelValue`
+ `update:modelValue`

并且 Vue3 支持多个 `v-model`，例如:

+ `v-model:title`
+ `v-model:visible`

## 十、`props` 在 Vue3 里可以直接解构吗？

这题非常容易答绝对。

更严谨的回答应该是:

+ 早期 Vue3 里，直接解构 `props` 容易丢失响应性
+ 可以使用 `props.xxx`、`toRef(props, 'xxx')` 或 `toRefs(props)`
+ 在 Vue 3.5+ 的 `script setup` 中，响应式解构体验更好

所以最好不要简单说成“完全不能解构”。

## 十一、`emit` 和回调式通信怎么理解？

Vue 里更典型的方式是:

+ 父组件通过 `props` 传值
+ 子组件通过 `emit` 通知父组件

这和 React 里“父传回调函数给子组件”很像，但 Vue 的事件模型会更显式一些。

## 十二、Vue3 中怎么获取 DOM 或组件实例？

推荐方式通常是模板 `ref`。

如果是 DOM:

+ 用模板 `ref` 获取元素

如果是子组件:

+ 父组件通过模板 `ref` 拿实例
+ 子组件通过 `defineExpose` 暴露可调用能力

更底层的 `getCurrentInstance()` 通常不作为日常主要方案。

## 十三、`attrs` 和 `slots` 在组合式 API 中怎么拿？

可以使用:

+ `useAttrs()`
+ `useSlots()`

这比过去基于实例的 `$attrs`、`$slots` 更显式，也更符合组合式 API 风格。

## 十四、Vue3 组件基础中常见高频易错点

+ 不要在 `setup` 里期待 `this`
+ 不要把 `props` 解构问题讲成绝对结论
+ 不要把 `defineExpose` 当成默认必开
+ 不要把 `getCurrentInstance()` 当成日常方案

## 十五、一段适合面试现场的总结话术

> Vue3 组件层最核心的变化，是从过去围绕组件实例的 `Options API`，转向围绕响应式状态和函数组合的 `Composition API`。其中 `script setup` 是当前主流写法，本质是 `setup()` 的语法糖。开发中常见的 `defineProps`、`defineEmits`、`defineExpose`、`defineModel` 都是为了让组件的输入、输出和暴露能力更清晰。面试里除了会用，更重要的是知道它们背后对应的是 Vue3 从“实例式”到“组合式”的思路变化。
