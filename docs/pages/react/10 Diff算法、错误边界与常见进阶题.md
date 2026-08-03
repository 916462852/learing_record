---
title: Diff算法、错误边界与常见进阶题
date: 2026-08-03 16:15:00
permalink: /pages/react-10/
categories:
  - 全部分类
  - react
tags:
  - react
  - 面试题
  - Diff
author:
  name: Xiang
  # link: https://gitee.com/lxlxlxlxxl
---

## Diff算法、错误边界与常见进阶题

> 前面几篇已经覆盖了 Hooks、性能、React 18 和 Fiber。这篇补上面试里同样高频、但容易被漏掉的进阶题：Diff / 协调、错误边界、Portal、Suspense、HOC / Render Props、路由与 SSR。

<!-- more -->

## 一、React 的 Diff / 协调算法怎么理解？

React 更新时，会比较新旧虚拟树，找出需要变更的地方，这个过程叫协调（Reconciliation）。

为了控制复杂度，React Diff 有几条关键策略：

### 1. 同层比较

只比较同层级节点，不跨层复用。

### 2. 不同类型直接替换

如果新旧节点类型不同，比如从 `div` 变成 `p`，React 会销毁旧树，创建新树。

### 3. 同类型尽量复用

类型相同则保留节点，再比较属性和子节点。

### 4. 列表靠 `key` 识别身份

同层多个子节点时，`key` 用来判断节点是新增、删除还是移动。

面试一句话：

> React Diff 不是追求数学意义上的最优解，而是用“同层比较 + 类型判断 + key 标识”把复杂度控制在可接受范围。

## 二、为什么不跨层 Diff？

因为真实 UI 里跨层移动节点的场景相对少，而跨层 Diff 成本很高。

React 选择了：

+ 工程上更可预期
+ 实现更简单
+ 大多数业务场景已经够用

## 三、`key` 在 Diff 里到底起什么作用？

`key` 是同层节点的身份标识。

有稳定 `key` 时，React 更容易判断：

+ 哪个节点还在
+ 哪个节点是新增
+ 哪个节点移动了位置

没有稳定 `key`，尤其在增删排序列表里，就容易出现：

+ 组件状态错位
+ 输入框内容串位
+ 不必要的销毁重建

## 四、什么是错误边界（Error Boundary）？

错误边界是一类特殊组件，用来捕获子组件树中的渲染错误，避免整页白屏。

它通常通过类组件实现，核心方法有：

+ `static getDerivedStateFromError`
+ `componentDidCatch`

常见能力：

+ 捕获渲染期错误
+ 展示降级 UI
+ 上报错误日志

注意：

+ 错误边界捕不到事件处理器里的错误
+ 捕不到异步代码里直接抛出的错误
+ 捕不到错误边界自身的错误
+ 函数组件目前仍没有等价的官方 Hook 替代

## 五、什么是 Portal？

`Portal` 可以把子节点渲染到父组件 DOM 层级之外的某个 DOM 节点。

常见场景：

+ 弹窗
+ 抽屉
+ 全局提示
+ 浮层

它解决的是：

> 逻辑上属于当前组件，但 DOM 上需要脱离当前层级。

这点和 Vue 的 `Teleport` 很像。

## 六、什么是 `Suspense` 和 `lazy`？

### `React.lazy`

用于组件级懒加载，配合动态 `import`。

### `Suspense`

用于在异步依赖未就绪时展示 fallback。

典型组合：

```jsx
const Page = lazy(() => import("./Page"))

<Suspense fallback={<Loading />}>
  <Page />
</Suspense>
```

面试里可以补一句：

+ 适合路由级、组件级按需加载
+ React 18 后和并发、流式 SSR 的关系更紧密
+ 真实业务里还要考虑错误处理和骨架屏体验

## 七、HOC、Render Props、自定义 Hook 怎么区分？

这是逻辑复用演进题，很常考。

### 1. HOC（高阶组件）

接收组件，返回增强后的新组件。

优点：

+ 能力可复用

缺点：

+ 容易多层包装
+ `props` 来源不直观
+ 命名冲突风险

### 2. Render Props

通过把函数当 `children` 或 `render` 传下去，把数据和控制权交给调用方。

优点：

+ 更灵活

缺点：

+ 嵌套深时可读性差

### 3. 自定义 Hook

现在主流方案。

优点：

+ 不增加组件层级
+ 输入输出清晰
+ 更贴合函数组件

面试总结：

> 早期常见 HOC 和 Render Props，现代 React 更推荐自定义 Hook。

## 八、`forwardRef` 和 `useImperativeHandle` 是什么？

### `forwardRef`

让父组件可以把 `ref` 传到子组件内部。

### `useImperativeHandle`

配合 `forwardRef`，限制对外暴露的命令式 API。

适合场景：

+ 聚焦输入框
+ 触发表单校验
+ 调用子组件有限方法

注意：

+ React 更推崇声明式
+ 命令式暴露应尽量少而明确

## 九、`useId` 是什么？适合什么场景？

`useId` 用于生成在客户端和服务端都相对稳定的唯一 id。

典型场景：

+ 表单项和 `label` / `input` 关联
+ 无障碍属性如 `aria-describedby`
+ SSR 场景下避免客户端和服务端 id 不一致

要注意：

+ 它不是拿来生成列表 `key` 的
+ `key` 仍然应该来自稳定业务数据

## 十、`useSyncExternalStore` 是什么？

这是一个偏进阶的 Hook，主要用于安全地订阅 React 外部状态源。

典型场景：

+ 自定义状态管理库
+ 订阅浏览器或第三方 store
+ 需要和并发渲染保持一致性的外部数据读取

面试里知道它的定位即可：

> `useSyncExternalStore` 不是普通业务组件的高频 Hook，但它是 React 18 时代连接外部 store 的标准接口。

## 十一、`PureComponent` 和 `React.memo` 有什么区别？

+ `PureComponent` 面向类组件
+ `React.memo` 面向函数组件

两者核心思路类似：

+ 对 `props` / `state` 做浅比较
+ 没变化就跳过更新

现代项目里，函数组件场景更常聊 `React.memo`。

## 十二、类组件生命周期怎么映射到 Hooks？

这题现在还是会被问到，尤其是老项目迁移场景。

大致对应关系：

+ `componentDidMount` ≈ `useEffect(() => {}, [])`
+ `componentDidUpdate` ≈ `useEffect(() => {})` 或带依赖的 effect
+ `componentWillUnmount` ≈ effect 的清理函数
+ `shouldComponentUpdate` ≈ `React.memo` / 自定义比较
+ `getDerivedStateFromProps` 多数场景不建议硬映射，优先重新设计数据流

重点提醒：

> 不要把 Hooks 理解成生命周期的一一平替，而要按“状态 + 副作用依赖”来组织。

## 十三、React Router 面试常考什么？

常见点：

+ 路由是什么，为什么需要前端路由
+ 声明式路由和编程式导航
+ 动态路由参数
+ 嵌套路由
+ 路由懒加载
+ 路由守卫 / 权限控制怎么做

一句话理解：

> React 本身不管路由，路由能力通常由 `React Router` 等库提供；面试里重点看你是否理解页面切换、参数传递和权限拦截。

## 十四、SSR / 同构 / hydration 怎么答？

### SSR

服务端先渲染出 HTML，再发给浏览器。

优点：

+ 首屏更快
+ SEO 更好

### hydration

客户端 React 接管服务端已经输出的 HTML，补齐事件和交互能力。

### 常见追问

+ SSR 和 CSR 区别
+ 什么是同构
+ 为什么 hydration 失败会有告警
+ Next.js 这类框架解决了什么

## 十五、React Server Components 需要知道到什么程度？

中高级面试可能会问到，尤其是 Next.js 方向。

可以这样答：

+ RSC 默认在服务端执行
+ 可以减少客户端打包体积
+ 适合数据读取和静态展示逻辑
+ 交互部分仍需要客户端组件

不要求把细节讲到源码级，但要知道它和传统 CSR / SSR 不是一回事。

## 十六、不可变数据为什么在 React 里很重要？

因为 React 很多地方依赖引用比较判断是否变化。

如果直接改原对象：

+ 浅比较可能发现不了变化
+ `memo`、`PureComponent`、部分状态库都会失效

所以更推荐：

+ 创建新对象 / 新数组
+ 或使用 Immer 这类不可变更新方案

## 十七、这段进阶题怎么收口？

如果面试官问“React 除了 Hooks 和 Fiber，你还了解哪些？”

可以这样答：

> 我还会关注 Diff 与协调策略、错误边界、Portal、Suspense 懒加载，以及逻辑复用从 HOC / Render Props 到自定义 Hook 的演进。再往新一点的 React 18 方向，还包括 `useId`、`useSyncExternalStore` 这类 Hook 的定位。工程上也会涉及 React Router、SSR / hydration，以及不可变更新对性能优化的影响。这些点合在一起，才比较完整。
