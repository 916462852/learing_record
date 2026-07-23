---
title: computed、watch、生命周期与渲染控制
date: 2026-07-23 16:38:00
permalink: /pages/vue3-04/
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

## computed、watch、生命周期与渲染控制

> 这篇是 Vue3 面试里副作用和渲染控制的核心部分。很多人会把 `computed`、`watch`、生命周期混着讲，这其实很容易失分。

<!-- more -->

## 一、`computed` 和 `watch` 的区别是什么？

这是 Vue3 必问题。

### `computed`

+ 用于从已有状态派生出一个新值
+ 有缓存
+ 更适合“算一个值”

### `watch`

+ 用于监听变化并执行副作用
+ 常见于发请求、同步外部状态、操作 DOM
+ 更适合“做一件事”

一句话总结:

> `computed` 解决“值的派生”，`watch` 解决“变化后的副作用”。

## 二、为什么 `computed` 有缓存？

因为它内部会基于依赖进行惰性求值。

只要依赖没变:

+ 不会重新执行 getter
+ 会直接复用上一次结果

所以它和直接在模板里调方法的差别，通常不只是语法，而是计算时机和缓存语义。

## 三、`watch` 和 `watchEffect` 的区别是什么？

### `watch`

+ 监听源需要显式指定
+ 可以拿到新值和旧值
+ 控制力更强

### `watchEffect`

+ 自动收集回调中使用到的依赖
+ 首次立即执行
+ 更适合简单副作用逻辑

面试里可以这样说:

> `watch` 更精确，`watchEffect` 更省代码；一个偏显式监听，一个偏自动依赖收集。

## 四、`watch` 的常见配置有哪些？

高频点主要有:

+ `immediate: true`
+ `deep: true`
+ `flush: 'pre' | 'post' | 'sync'`

其中比较容易被追问的是 `flush`。

### `flush` 怎么理解？

+ `pre`：组件更新前触发
+ `post`：组件更新后触发
+ `sync`：同步触发

如果面试官继续深挖，可以补一句:

> 默认多数业务场景不需要手动改 `flush`，但涉及 DOM 更新时机时要知道它的区别。

## 五、什么是副作用？

副作用指的是:

+ 发请求
+ 绑定事件
+ 开启定时器
+ 操作 DOM
+ 同步外部状态

它们都不是“单纯根据输入算输出”，所以通常不该塞进 `computed`。

## 六、Vue3 生命周期相比 Vue2 有什么变化？

最常见的变化有两个:

+ `beforeDestroy` 改名为 `beforeUnmount`
+ `destroyed` 改名为 `unmounted`

并且在 `Composition API` 中，生命周期通常通过 `onXxx` 的形式使用。

## 七、组合式 API 中常见生命周期有哪些？

常用的包括:

+ `onBeforeMount`
+ `onMounted`
+ `onBeforeUpdate`
+ `onUpdated`
+ `onBeforeUnmount`
+ `onUnmounted`
+ `onActivated`
+ `onDeactivated`

需要特别记住:

+ `beforeCreate`
+ `created`

这两个没有直接对应的组合式钩子，大多数逻辑直接写在 `setup` 顶层即可。

## 八、`onMounted` 里通常做什么？

常见场景:

+ 获取 DOM
+ 初始化第三方实例
+ 发首次请求
+ 注册某些只能在挂载后执行的逻辑

但也要知道:

> 不是所有请求都必须写在 `onMounted`，有些数据请求也可以在更高层的异步流程里处理。

## 九、`nextTick` 是什么？什么时候用？

Vue 更新 DOM 是异步批处理的，所以修改状态后，DOM 不一定会立刻同步完成。

`nextTick` 的作用是:

> 等当前这轮 DOM 更新结束后，再执行后续逻辑。

典型场景:

+ 获取更新后的 DOM 尺寸
+ 聚焦最新渲染出来的元素
+ 列表渲染完成后执行滚动

## 十、`v-if` 和 `v-show` 的区别是什么？

### `v-if`

+ 真正控制节点创建和销毁
+ 切换成本高，初始条件不成立时不渲染

### `v-show`

+ 只是切换 `display`
+ 初始会渲染，只是显示隐藏不同

适用建议:

+ 频繁切换用 `v-show`
+ 不频繁切换或初始可能不显示用 `v-if`

## 十一、为什么 `v-for` 一定要配合稳定的 `key`？

`key` 的本质是节点身份标识。

它影响:

+ 节点复用
+ 组件局部状态是否串位
+ 输入框值是否错乱

所以面试里最好顺带补一句:

> 不推荐在可增删、可排序的列表里使用数组下标作为 `key`。

## 十二、`KeepAlive` 是什么？它的生命周期有什么不同？

`KeepAlive` 用于缓存动态组件实例，避免频繁卸载和重建。

配套高频钩子:

+ `onActivated`
+ `onDeactivated`

注意点:

+ 被缓存组件切走时不一定真正卸载
+ 一些清理逻辑要放在 `deactivated` 中考虑

## 十三、`Teleport` 和 `Suspense` 怎么理解？

### `Teleport`

把模板的一部分渲染到当前 DOM 层级之外，比如 `body`。

常见场景:

+ 弹窗
+ 抽屉
+ 遮罩

### `Suspense`

用于协调异步依赖加载态，例如异步组件或 `async setup()`。

它在真实业务里的使用频率通常没有 `Teleport` 那么高，但面试里要知道它是 Vue3 的异步协调能力之一。

## 十四、这类题常见易错点

+ 把 `computed` 和 `watch` 混着讲
+ 把 `watchEffect` 理解成“更高级的 watch”
+ 忽略 `nextTick` 的真正用途
+ 忘记 `KeepAlive` 缓存组件的生命周期差异

## 十五、一段适合面试现场的总结话术

> Vue3 里和“副作用、渲染时机、生命周期”相关的题，核心要先把职责分清。`computed` 用于派生值，`watch` 用于副作用，`watchEffect` 用于自动收集依赖的副作用。生命周期方面，组合式 API 通过 `onMounted`、`onUnmounted` 等钩子组织逻辑，而 `beforeCreate`、`created` 这类能力大多被 `setup` 顶层取代。再往下延伸，`nextTick`、`KeepAlive`、`Teleport`、`Suspense` 本质上也都和 Vue3 的渲染时机与视图协调能力有关。
