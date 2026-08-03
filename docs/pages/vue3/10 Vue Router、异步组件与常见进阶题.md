---
title: Vue Router、异步组件与常见进阶题
date: 2026-08-03 16:16:00
permalink: /pages/vue3-10/
categories:
  - 全部分类
  - vue3
tags:
  - vue3
  - 面试题
  - Vue Router
author:
  name: Xiang
  # link: https://gitee.com/lxlxlxlxxl
---

## Vue Router、异步组件与常见进阶题

> 前面几篇已经覆盖了组合式 API、响应式、性能和源码主线。这篇补上同样高频、但之前相对薄弱的内容：Vue Router、异步组件、自定义指令、插槽细节、Diff 细节、`nextTick` 原理，以及 Vue2 到 Vue3 迁移易错点。

<!-- more -->

## 一、Vue Router 是什么？常考哪些点？

Vue Router 是 Vue 官方路由方案。面试里常见题型有：

+ 前端路由原理
+ `hash` 模式和 `history` 模式区别
+ 动态路由
+ 嵌套路由
+ 路由懒加载
+ 导航守卫
+ 路由和 `KeepAlive` 搭配

## 二、`hash` 模式和 `history` 模式有什么区别？

### `hash`

+ URL 里带 `#`
+ 依赖 `hashchange`
+ 兼容性好
+ 不需要服务端额外配置

### `history`

+ URL 更干净
+ 依赖 `HTML5 History API`
+ 刷新时需要服务端把路由回退到前端入口，否则容易 404

面试一句话：

> `history` 更美观，但要服务端配合；`hash` 更省事，但 URL 带井号。

## 三、导航守卫怎么理解？

导航守卫用于在路由跳转前后插入控制逻辑。

常见分类：

+ 全局守卫：`beforeEach`、`afterEach`
+ 路由独享守卫：`beforeEnter`
+ 组件内守卫：`onBeforeRouteLeave`、`onBeforeRouteUpdate`

高频场景：

+ 登录鉴权
+ 权限校验
+ 离开页面前确认
+ 页面切换埋点

## 四、路由懒加载怎么做？为什么要做？

通常用动态 `import`：

```js
component: () => import("./views/About.vue")
```

价值在于：

+ 拆分路由级代码
+ 降低首屏体积
+ 按需加载页面

## 五、什么是异步组件？`defineAsyncComponent` 有什么用？

异步组件可以延迟加载某个组件，等真正需要时再请求对应资源。

`defineAsyncComponent` 还能配置：

+ `loadingComponent`
+ `errorComponent`
+ 超时
+ 重试

它和路由懒加载经常一起出现，但关注点不同：

+ 路由懒加载偏“页面级拆包”
+ 异步组件偏“组件级按需加载”

## 六、自定义指令常考什么？

自定义指令用于封装可复用的 DOM 操作逻辑。

常见场景：

+ 自动聚焦
+ 权限按钮显隐
+ 防抖点击
+ 懒加载图片

Vue3 中指令钩子有调整，常见包括：

+ `created`
+ `beforeMount`
+ `mounted`
+ `beforeUpdate`
+ `updated`
+ `beforeUnmount`
+ `unmounted`

面试提醒：

> 能用组件或 composable 解决的，不一定非要上自定义指令；指令更适合贴近 DOM 的场景。

## 七、插槽和作用域插槽怎么答得更完整？

### 普通插槽

父组件把内容放到子组件指定位置。

### 具名插槽

一个组件有多个插槽出口时，用名字区分。

### 作用域插槽

子组件把内部数据暴露给插槽内容，父组件决定如何渲染。

可以记成：

+ 普通插槽：父传内容
+ 作用域插槽：子传数据给父的内容

## 八、Vue3 Diff 算法和 Vue2 有什么不同？

这是源码向高频题。

Vue2 常见是双端比较。

Vue3 在快速路径之外，对最长递增子序列（LIS）做了优化，核心目标是：

+ 尽量复用已有节点
+ 尽量减少 DOM 移动次数

面试回答可以抓这几个关键词：

+ 静态标记
+ 快速 Diff
+ 最长递增子序列
+ 最小化移动

一句话：

> Vue3 Diff 不只是“比较新旧节点”，还结合编译期信息和更优的列表复用策略，减少无效更新和移动。

## 九、`nextTick` 的原理怎么讲？

Vue 更新 DOM 是异步批处理的。同一轮里多个状态变化，通常会合并后再更新。

`nextTick` 的作用是：

> 把回调放到 DOM 更新之后执行。

实现上会优先使用微任务，例如：

+ `Promise.then`
+ 必要时兜底到其他异步方式

常见场景：

+ 修改数据后立刻读 DOM
+ 列表渲染后滚动到最新项
+ 弹窗打开后自动聚焦

## 十、什么是 `effectScope`？

`effectScope` 可以把一组副作用放进同一个作用域里统一管理，方便一次性停止。

适合场景：

+ 较复杂的 composable
+ 需要统一清理多个 `watch` / `computed` 副作用

它不是每场必问题，但答出来会比较加分。

## 十一、Vue2 升级到 Vue3，常见坑有哪些？

高频迁移点：

+ 全局 API 改为应用实例 API
+ `$on` / `$off` / `$once` 事件总线思路不再推荐
+ 过滤器 `filters` 被移除
+ 部分生命周期改名
+ `v-model` 默认值变化
+ 响应式写法从 `Vue.set` 转向 `Proxy` 自然支持
+ 状态管理从 Vuex 迁到 Pinia

面试里可以说：

> Vue2 到 Vue3 不只是语法迁移，更是开发模型和最佳实践迁移。

## 十二、`v-model` 修饰符和自定义组件 `v-model` 还要知道什么？

常见修饰符：

+ `.lazy`
+ `.number`
+ `.trim`

自定义组件中：

+ Vue3 默认 `modelValue` / `update:modelValue`
+ 支持多个 `v-model`
+ 新版本可用 `defineModel` 简化

## 十三、Vue3 中样式相关常考什么？

常见点：

+ `scoped` 样式原理
+ 深度选择器 `:deep()`
+ 动态 `class` / `style`
+ CSS Modules 在 Vue SFC 中的使用

`scoped` 一句话理解：

> 通过给元素加唯一属性，并改写选择器，实现组件样式局部化。

## 十四、SSR / Nuxt 方向需要补到什么程度？

如果岗位偏业务中高级，至少要知道：

+ SSR 提升首屏和 SEO
+ 客户端还需要激活（hydration）
+ Nuxt 是 Vue 生态里常见的全栈 / SSR 框架
+ 不是所有项目都必须上 SSR

## 十五、这段进阶题怎么收口？

如果面试官问“Vue3 你还了解哪些工程和进阶能力？”

可以这样答：

> 除了响应式和组合式 API，我还会关注 Vue Router 的模式差异与导航守卫、异步组件和路由懒加载、自定义指令、插槽体系，以及 Vue3 Diff、`nextTick` 这些原理点。如果再往工程走，还会涉及 Vue2 到 Vue3 迁移差异，以及 SSR / Nuxt 在首屏和 SEO 场景中的取舍。
