---
title: Vue3中如何使用Pinia
date: 2023-06-04 19:19:00
permalink: /pages/eae3ba/
categories:
  - 全部分类
  - vue3
tags:
  -  vue3
author: 
  name: GleenLey
  link: https://gitee.com/Gleenley
---


> 先来看看Pinia是什么, Pinia 是一个用于 Vue 的状态管理库，类似 Vuex, 是 Vue 的另一种状态管理方案
Pinia 支持 Vue2 和 Vue3

<!-- more -->

## 常见的 Option Stores 语法
传递带有 state、getters 和 actions 属性的 Options 对象给 defineStore() 就可以定义一个 Store：
```js
export const useCounterStore = defineStore('counter', {
  state: () => ({ 
    count: 0
 }),
  getters: {
    doubleCount: (state) => state.count * 2
  },
  actions: {
    increment() {
      this.count++
    }
  }
})
```

这种语法与 `Vuex` 中定义 `Store` 的语法非常近似，但是少了 Mutation 字段。
不仅如此，这种写法也和 `Vue2` 的 `Options API`（选项式 API）结构类似：`state` 与 `data` 对应、`getters` 与 `computed` 对应、`actions` 与 `methods` 对应。
这种写法的好处就是结构非常清晰，容易上手，特别是对刚从 `Vue2` 和 `Vuex` 转到 `Pinia` 的开发者！

## Setup Stores 语法

`Setup Stores` 使语法更灵活、更函数：

```js
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})

```

在这种语法中，`ref`与 `state` 对应、`computed` 与 `getters` 对应、`function` 与 `actions` 对应。
想必写过 `Vue3` 朋友就能一眼看出来这和 `Vue3` 新推出的 `Composition API`（组合式 API）非常类似！这样的话，在使用` Vue3 `和 `Pinia` 的时候，就能统一语法了。


## 在 Vue3 的 Setup 语法外使用 Pinia

如果你准备在 `Vue3` 的 `Setup` 语法外引入 `Pinia` 的 `Store`，例如 `useCounterStore`。
直接 `import { useCounterStore } from "@/store/modules/xxxxxx"` 是不行的，你得像这样：


```js

import store from "@/store"

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})

/** 在 setup 外使用 */
export function useCounterStoreHook() {
  return useCounterStore(store)
}

```
然后引入 `import { useCounterStoreHook } from "@/store/modules/xxxxxx"` 即可！
