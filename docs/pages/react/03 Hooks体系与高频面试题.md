---
title: Hooks体系与高频面试题
date: 2026-07-23 16:22:00
permalink: /pages/react-03/
categories:
  - 全部分类
  - react
tags:
  - react
  - hooks
  - 面试题
author:
  name: Xiang
  # link: https://gitee.com/lxlxlxlxxl
---

## Hooks体系与高频面试题

> Hooks 是 React 面试中最密集的一块内容。除了会用，更关键的是能讲清楚依赖、闭包、重新渲染和副作用边界。

<!-- more -->

## 一、Hooks 是什么？

一句话:

> Hooks 是 React 提供的一组函数，让函数组件也能使用状态、生命周期能力以及可复用逻辑。

Hooks 出现之前:

+ 函数组件主要负责展示
+ 复杂状态、副作用和生命周期大多写在类组件里

Hooks 出现之后:

+ 函数组件成为主流
+ 逻辑复用从 `mixin` / HOC / Render Props 逐步转向自定义 Hook

## 二、为什么要引入 Hooks？

核心原因有三个:

### 1. 复用状态逻辑更自然

过去复用逻辑常用:

+ `mixin`
+ 高阶组件
+ Render Props

这些方案都能解决问题，但通常会带来:

+ 命名冲突
+ 包装层级过深
+ 逻辑来源不直观

自定义 Hook 的优势是:

+ 输入输出明确
+ 没有额外组件嵌套
+ 更贴合函数组合思维

### 2. 复杂组件更容易组织逻辑

类组件中相关逻辑往往分散在:

+ `componentDidMount`
+ `componentDidUpdate`
+ `componentWillUnmount`

而 Hooks 可以把“同一个功能点”相关的状态和副作用放在一起。

### 3. 更符合 React 后续演进方向

Hooks 和函数组件更适合:

+ 并发渲染
+ 可中断更新
+ 更细粒度的逻辑组合

## 三、常用 Hooks 分别解决什么问题？

### 1. `useState`

用于给函数组件添加本地状态。

高频点:

+ 更新 state 会触发组件重新渲染
+ 新 state 和旧 state 相同值时，React 可能跳过不必要更新
+ 批量更新和闭包问题经常一起考

### 2. `useEffect`

用于处理副作用。

常见副作用:

+ 发请求
+ 订阅事件
+ 操作定时器
+ 同步外部系统

### 3. `useLayoutEffect`

执行时机比 `useEffect` 更早，会在浏览器绘制前同步执行。

常见场景:

+ 读取布局
+ 同步测量 DOM
+ 避免闪动

### 4. `useRef`

有两个典型用途:

+ 获取 DOM 或组件实例引用
+ 保存不会触发渲染的可变值

### 5. `useMemo`

缓存计算结果，避免重复执行高成本计算。

### 6. `useCallback`

缓存函数引用，避免子组件因为函数地址变化而重复渲染。

### 7. `useContext`

读取上层 `Context` 提供的值，解决跨层级共享数据问题。

### 8. `useReducer`

适合复杂状态流转，尤其是:

+ 一个状态依赖多个动作更新
+ 更新逻辑需要集中管理
+ 想让状态变化过程更可预测

## 四、`useState` 为什么是异步感的？

这道题不是在问 Promise 异步，而是在问:

> 为什么调用 `setState` 后，当前同步代码里读到的还是旧值？

原因通常要从两点回答:

+ React 的 state 更新不是立刻原地修改变量
+ 更新会进入调度和渲染流程，在下一次渲染时得到新值

因此下面的代码里:

```jsx
setCount(count + 1)
console.log(count)
```

打印的大概率还是旧值。

## 五、为什么 `setCount(count + 1)` 连续调用两次不一定加 2？

经典面试题。

```jsx
setCount(count + 1)
setCount(count + 1)
```

这里两次读取到的 `count` 很可能都是同一个旧值，所以最终结果只加了 1。

如果想基于上一次最新状态连续更新，应该写成:

```jsx
setCount(prev => prev + 1)
setCount(prev => prev + 1)
```

这个写法的本质是“使用函数式更新”，避免闭包拿到过期值。

## 六、`useEffect` 的执行时机怎么理解？

标准说法:

+ 渲染完成后执行
+ 默认首次渲染后会执行一次
+ 依赖变化后会再次执行
+ 组件卸载前会先执行上一次 effect 的清理函数

例如:

```jsx
useEffect(() => {
  const timer = setInterval(() => {}, 1000)

  return () => {
    clearInterval(timer)
  }
}, [])
```

这里返回的函数就是清理函数。

## 七、`useEffect` 依赖数组怎么理解？

这题很高频，也最容易答偏。

### 1. 不传第二个参数

每次渲染后都执行。

### 2. 传空数组 `[]`

只在首次挂载后执行一次，卸载时执行清理。

### 3. 传入依赖 `[a, b]`

首次执行一次，以后只有依赖变了才重新执行。

重点不是“数组里随便写点东西”，而是:

> effect 回调里用到的响应式输入，原则上都应该进入依赖分析范围。

## 八、为什么会出现闭包陷阱？

这是 Hooks 面试里的核心概念之一。

函数组件每次渲染，本质上都会形成一套新的作用域。某些回调如果捕获了旧渲染中的变量，就可能拿到旧值。

典型场景:

+ `setTimeout`
+ `setInterval`
+ 事件回调
+ effect 中遗漏依赖

例如:

```jsx
useEffect(() => {
  const timer = setInterval(() => {
    console.log(count)
  }, 1000)

  return () => clearInterval(timer)
}, [])
```

如果依赖数组是空的，这里的 `count` 很可能永远是初始值。

常见解决方案:

+ 补齐依赖
+ 使用函数式更新
+ 使用 `useRef` 保存最新值

## 九、`useEffect` 和 `useLayoutEffect` 的区别

### `useEffect`

+ 异步地在浏览器绘制后执行
+ 不阻塞浏览器绘制
+ 更适合绝大多数副作用

### `useLayoutEffect`

+ 在 DOM 变更后、浏览器绘制前同步执行
+ 会阻塞绘制
+ 适合读写布局、同步测量

面试一句话总结:

> 大部分场景优先 `useEffect`，只有在必须同步读取布局或避免闪烁时才用 `useLayoutEffect`。

## 十、`useMemo` 和 `useCallback` 的区别

### `useMemo`

缓存的是计算结果。

```jsx
const total = useMemo(() => heavyCalc(list), [list])
```

### `useCallback`

缓存的是函数引用。

```jsx
const handleClick = useCallback(() => {
  submit(id)
}, [id])
```

一句话区分:

> `useMemo` 缓存值，`useCallback` 缓存函数。

## 十一、`useMemo` / `useCallback` 是不是越多越好？

不是。

它们本身也有成本:

+ 依赖比较有成本
+ 代码复杂度上升
+ 滥用会让可读性下降

适合使用的场景:

+ 计算本身很重
+ 子组件确实依赖引用稳定性做了 `memo`
+ 优化收益明确

不适合使用的场景:

+ 计算很轻
+ 组件本来不慢
+ 只是“看起来像性能优化”

## 十二、`useRef` 和 `useState` 的区别

### `useState`

+ 改变值会触发重新渲染
+ 适合驱动 UI

### `useRef`

+ `.current` 改变不会触发重新渲染
+ 适合保存 DOM 引用、定时器 id、上一次值等

所以一句话可以这样说:

> 要驱动页面显示，用 `useState`；要保存一个跨渲染周期可变但不触发渲染的值，用 `useRef`。

## 十三、为什么 Hooks 不能写在条件语句里？

这是原理题。

React 在函数组件渲染时，是按调用顺序去“读取和关联每一个 Hook”的。

如果你写成:

```jsx
if (visible) {
  useEffect(() => {})
}
```

那某次渲染和下一次渲染里的 Hook 调用顺序就可能不一致，React 就无法正确知道:

+ 第一个 Hook 对应谁
+ 第二个 Hook 对应谁

所以规则本质是:

> Hooks 依赖稳定的调用顺序，而不是依赖变量名。

## 十四、自定义 Hook 的设计原则是什么？

面试里如果聊到自定义 Hook，可以从这几个点答:

+ 名字以 `use` 开头
+ 内部可以组合其他 Hook
+ 对外暴露清晰的输入输出
+ 尽量隐藏实现细节
+ 不要把无关逻辑都堆进一个 Hook

例如一个好的自定义 Hook，应该更像“能力封装”，而不是“超大杂物箱”。

## 十五、`useReducer` 和 `useState` 怎么选？

### 更适合 `useState` 的场景

+ 状态简单
+ 更新逻辑直接
+ 单个字段或少量字段

### 更适合 `useReducer` 的场景

+ 状态复杂
+ 有多个 action
+ 需要更明确的状态流转语义
+ 想让更新逻辑集中、可测试

## 十六、开发环境下为什么 `useEffect` 像执行了两次？

React 18 下，如果开启 `StrictMode`，开发环境会故意做额外检查，可能表现为:

+ 组件渲染多一次
+ effect 挂载和清理多执行一轮

目的是帮助开发者尽早发现:

+ 不纯的副作用
+ 没有清理的订阅
+ 非幂等逻辑

注意:

+ 这是开发环境行为
+ 不是生产环境真正会渲染两次

## 十七、Hooks 面试高频易错点

+ 不要把 `useEffect` 当成类组件生命周期的简单平替
+ 不要把依赖数组理解成“想什么时候执行就怎么填”
+ 不要把 `useMemo` 当成万能优化
+ 不要把 `useRef` 和响应式状态混用
+ 不要忽视闭包导致的旧值问题

## 十八、一段适合面试现场的总结话术

> Hooks 让函数组件具备了状态、副作用和逻辑复用能力，所以现代 React 项目基本都以函数组件加 Hooks 为主。面试里最关键的点，不只是会写 `useState`、`useEffect`，而是能解释 React 为什么会有闭包问题、依赖数组怎么决定 effect 执行、`useMemo` 和 `useCallback` 的边界，以及为什么 Hooks 必须保持稳定调用顺序。这些问题本质上都和 React 的重新渲染模型有关。
