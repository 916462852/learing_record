---
title: React高频面试题整理（常考）
date: 2026-07-23 16:28:00
permalink: /pages/react-09/
categories:
  - 全部分类
  - react
tags:
  - react
  - 面试题
author:
  name: Xiang
  # link: https://gitee.com/lxlxlxlxxl
---

## React高频面试题整理（常考）

> 这一篇更偏面试前速记，把 React 里最常见、最容易连环追问的题集中放在一起。建议和前面几篇专题配合着看。

<!-- more -->

## 一、React 是什么？

`React` 是一个用于构建用户界面的 JavaScript 库，核心特点是组件化、声明式和单向数据流。它主要聚焦视图层，本身不是完整的全家桶框架。

## 二、React 和 Vue 的核心区别怎么答？

一个比较稳的回答方式:

+ React 更偏 JavaScript 能力组织 UI，常用 JSX
+ Vue 更偏模板和响应式系统一体化体验
+ React 社区生态选择更灵活，Vue 官方方案更集中
+ React 函数组件 + Hooks 更强调逻辑组合，Vue Composition API 也在往类似方向靠近

不要答成简单的“谁更好”，更适合说适用场景和设计取向不同。

## 三、JSX 是什么？

JSX 是 JavaScript 的语法扩展，用来描述 UI 结构，本质会被编译成 React Element 创建调用。它不是字符串模板，也不是浏览器原生语法。

## 四、为什么 React 要用虚拟 DOM？

更准确的说法是，React 需要一种内存中的 UI 描述结构，来支撑声明式开发、Diff 和后续调度。它的价值不只是“更快”，而是让 UI 更新更可预测、更容易抽象和跨平台。

## 五、React 中 `key` 的作用是什么？

`key` 用于标识同层级节点身份，帮助 React 在 Diff 时正确复用、移动、删除节点。`key` 不稳定会导致状态错位、输入框错乱等问题。

## 六、类组件和函数组件的区别是什么？

当前主流答法:

+ 类组件基于实例和生命周期
+ 函数组件基于函数执行和 Hooks
+ 现代 React 生态主流是函数组件
+ 类组件没有彻底失效，但新实践基本围绕 Hooks 展开

## 七、Hook 为什么不能写在条件判断里？

因为 React 是按调用顺序关联 Hook 状态的。条件分支会破坏调用顺序稳定性，导致 Hook 状态错位。

## 八、`useState` 和 `useRef` 的区别是什么？

+ `useState` 更新后会触发重新渲染，适合驱动 UI
+ `useRef` 更新 `.current` 不会触发渲染，适合保存 DOM 引用和跨渲染周期的可变值

## 九、`useEffect` 和 `useLayoutEffect` 的区别是什么？

+ `useEffect` 通常在绘制后执行，不阻塞渲染
+ `useLayoutEffect` 在 DOM 变更后、绘制前同步执行，适合布局测量

## 十、为什么会有闭包陷阱？

因为函数组件每次渲染都会形成新的作用域。异步回调或 effect 如果捕获了旧渲染中的变量，就可能拿到旧值。

## 十一、`useMemo` 和 `useCallback` 的区别是什么？

+ `useMemo` 缓存值
+ `useCallback` 缓存函数引用

二者都不是默认必须使用，只在优化收益明确时使用。

## 十二、什么是受控组件？

表单值由 React state 控制，输入值通过 `value` 和 `onChange` 形成单向数据流。复杂联动和校验场景更常用受控组件。

## 十三、Context 能替代 Redux 吗？

部分场景可以，全部替代并不严谨。

+ 简单跨层共享状态，Context 足够
+ 复杂全局状态、异步流、可追踪性要求高时，Redux Toolkit 等方案更合适

## 十四、Redux 的核心流程是什么？

用户操作触发 `dispatch`，把 `action` 交给 `reducer` 计算新状态，`store` 保存新状态，订阅组件拿到变化后重新渲染。

## 十五、为什么现在更推荐 `Redux Toolkit`？

因为它减少了 Redux 样板代码，内置 Immer 和常用配置，更符合现代 Redux 最佳实践。

## 十六、React 为什么会重复渲染？

常见原因:

+ state 变化
+ 父组件渲染传导
+ Context 变化
+ 开发环境 `StrictMode` 额外检查

## 十七、`React.memo` 的作用是什么？

它会对函数组件的 `props` 做浅比较，`props` 没变时可跳过组件渲染结果计算，适合纯展示且渲染成本较高的组件。

## 十八、React 18 的自动批处理是什么？

React 18 会把更多场景下的多个状态更新自动合并，减少多次重复渲染，不再局限于 React 事件回调内部。

## 十九、什么是并发渲染？

不是多线程，而是 React 能把渲染工作拆成可中断、可恢复、按优先级调度的任务，提高交互流畅度。

## 二十、`useTransition` 的作用是什么？

把某些更新标记成非紧急更新，让输入、点击等更高优先级交互优先响应。

## 二十一、Fiber 是什么？

Fiber 是 React 的核心架构之一，既是一种节点数据结构，也是一套可调度的渲染执行模型。它让 React 可以把渲染拆分成更小的工作单元。

## 二十二、render 阶段和 commit 阶段的区别是什么？

+ render 阶段做计算，可中断，不直接操作 DOM
+ commit 阶段做提交，不可中断，真正更新 DOM 和执行副作用

## 二十三、`setState` 到底是同步还是异步？

更准确的说法是:

+ 调用更新函数本身是同步发生的
+ 但新状态何时被渲染和提交，要看 React 的调度与批处理

所以它表现出“异步感”。

## 二十四、为什么函数式更新更稳？

因为它基于更新队列中的上一个最新状态继续计算，避免直接依赖当前闭包中的旧值。

## 二十五、为什么说 React 更适合大型项目？

不是因为 API 更多，而是因为:

+ 组件化边界清晰
+ 逻辑复用能力强
+ 工程化生态成熟
+ 状态管理、SSR、测试、跨端方案都比较完整

## 二十六、React 面试最容易答错的点

+ 把虚拟 DOM 说成“绝对更快”
+ 把 `useEffect` 当成类生命周期的一一映射
+ 把 Context 直接说成 Redux 替代品
+ 把 `setState` 简单回答成“异步”
+ 把并发渲染理解成多线程

## 二十七、React 面试速记关键词

如果时间很紧，至少记住这组关键词:

+ JSX
+ 单向数据流
+ 受控组件
+ `useState / useEffect / useRef`
+ 闭包陷阱
+ `useMemo / useCallback / React.memo`
+ Context / Redux Toolkit
+ React 18 / 自动批处理 / 并发更新
+ Fiber / render / commit / Lane

## 二十八、一段适合 React 面试结尾的总结话术

> React 面试的主线，其实可以归纳成三层。第一层是组件、JSX、状态、通信这些基础使用；第二层是 Hooks、性能优化和 React 18 并发更新；第三层是 Fiber、调度器、更新队列和 commit 机制这些源码原理。只要能把这三层串起来，基本大多数 React 面试题都能接得住，而且回答也不会显得只是在背 API。
