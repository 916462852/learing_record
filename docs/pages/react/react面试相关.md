---
title: react面试相关
date: 2023-04-11 19:44:28
permalink: /pages/1e6b69/
categories: 
  - 全部分类
  - react
tags: 
  - react
author: 
  name: GleenLey
  link: https://gitee.com/Gleenley
---


##  四字口诀

   -   讲说 理列

       +  讲概念:

           -  简单的话说清楚该技术是什么。 最好能用一句话描述

       +  说用途:

           -  描述该技术的用途能够具体的结合适合的场景, 拓展性的描述

       +  理思路:

           -  梳理该 技术的核心思路或运作流程. 这个地方可深可浅,

              如果足够的了解的话, 建议详细的展开说明


       +  优缺点,列一遍:

           -  对 该技术栈的 优缺点 进行 举例。 列举 优缺点 肯定 有 其他 技术方案的 横向对比的 过程

              那么 切记 在这个过程中, 踩一  捧一, 容易 引起 面试 官 的 反感


    
   -  React  
      
        + 讲概念 

           -   一句话 解释 技术本质

        + 说用途

           -   简短 说明 技术的 用途

        + 理思路

           -   概要 说明 核心 技术思路

        + 优缺点

           -   独特优势

           -   个别缺点


  
   -  答题

       +  React 是一个 网页 UI 框架, 
          
           通过 组件化的 方式  来  解决 视图层 开发 复用的 问题

           本质上 是一个 组件化的 框架

       +  它的 核心设计 思路 有三点：

           -  声明式

               +  声明式的 优点 在于  直观 和 组合

               +  


           -  组件化

               +  组件化的 优势 在于 视图的 拆分 和 模块复用, 可以 更容易 做到 高内聚 低耦合


           -  通用性

               +  通用性 在于 一次学习, 随处编写. 比如 react native， React 360，这里 主要是 靠 虚拟 DOM 来 保证实现的

       +  这使得 react 的 适用范围 变得 足够广, 无论是 web, natvie， VR, 甚至 shell应用 都可以 进行开发。 这也是 react 的 优势


       +  但是 作为 一个视图层的 框架, React 的 劣势 也十分的 明显.  它 并 没有 提供 完整的 一揽子的解决方案， 在开发 前端 应用的 时候

           需要 向社区 寻找 并 整合 解决 方案. 虽然 一定程度上 促进了 社区的 繁荣, 但 也为开发者 在 技术 选型 和 学习使用 上 造成了 一定的成本




#  02. 为什么 react 用 JSX？

   -  技术广度, 深挖 知识面 涉猎的 广度, 对流行 框架的 模版方案 是否 了解

   -   技术方案的 调研能力


   -  承题

       +  一句话 解释 JSX  能 一句话 说清楚 JSX 到底是 什么？

       +  核心 概念。 JSX 用于解决 什么问题？ 如何使用？

       +  方案对比。 与 其他的 方案对比, 说明 React 选用 JSX 的 必要性


       +  关注点 分离:

           -  关注点 分离 在计算机 科学中, 是将 代码 分隔为 不同 部分 的 设计原则, 是面 向 对象 的 程序设计的  核心的 概念

              其中的 每一部分 会有各自 的 关注的 焦点

           -  关注点 分离的价值 在于 

               + 简化 程序的 开发 和 维护.

               +  当关注点 分开时,各部分 可以 重复 使用, 以及 独立 开发 和 更新. 具有特殊价值  的 是能够 稍后 改进 或者 修改一段代码

               +   而 无须 知道 其他部分的 细节 必须 对 这些部分 进行的 相应的 修改


       +  在 react 的 关注点 

           -  组件


   -  答题

       +  JSX 是 一个 javaScript 的 语法扩展, 结构类似 与 XML

           -   JSX  主要用于 声明 React 元素, 但 React 中 并不 强制 使用 JSX, 也会在 构建过程中, 通过 Babel 插件 编译 为  React.createElement

               所以 jsx 更像是 React.createElement 的 一种语法糖


           -  所以从这里 可以看出,  React 团队 并不想 引入 javascript 本身 之外的 开发体系. 而是 希望通过 合理的 ***关注点 分离** 保持 组件开发的 纯粹性


           -   接下来 说 与 JSX 之外的 三种 技术方案的 对比：


              +  首先是 模版, React 团队 认为 模版 不应该是 组件 开发 过程中的 关注点， 因为 引入了 模版语法, 模版指令 等概念, 是一种 不佳的 技术 实现方案


              +  其次是  模版 字符串, 模版字符串 编写的  结构 会造成 多次 内部 嵌套, 使得 整个 结构 变得 很复杂, 并且 代码 提示 也会变的 困难重重


              +  最后是 JXON 同样是 代码提示 困难的 原因 而 被放弃


              +  所以 react 最后 使用了 JSX, 因为 JSX 与 其 设计思想 贴合, 不需要 引入过多的 新的 概念, 对编辑器的  代码提示  也 极为友好。 

   - 进阶的问题

        +  Babel 插件 如何 实现 JSX 到 JS 的 编译？

            -  它的 原理是这样的:  

               +  babel 读取代码 并解析,  生成 AST, 再 将 AST 传入 插件 层 进行 转换, 在 转换的时候 就可以 将 jsx 的 结构 转换为 React.createElement 的 函数



#  03. 如何避免生命周期中的坑？



   -  坑 有两种:

      +  在不合适的时间 调用了 不合适的 代码

      +  在需要 调用的时候,, 却忘记了 调用


   -  承题

      +  确立 讨论的范围

         -  基于 周期的梳理, 确认 生命周期 函数的 使用方式

             +  挂载阶段
             +  更新阶段
             +  卸载阶段

         -  基于 职责的 梳理, 确认 生命周期 函数的 适用范围

             +  状态 变更

             +  错误 处理


      +  入手

         +  概念

            - 当我们在 讨论 react 组件周期的 时候, 一定是在 讨论 类组件(Class Component)

            -  函数式 组件 并没有 生命周期的 概念， 因为它 就是 一个函数, 只会 从头 执行到尾

         +  流程梳理

            -  挂载阶段

               +  挂载 阶段 是指 组件 初始化 到 完成 加载的 时候

               +   constructor

                    -  constructor 是 类 通用的 构造函数, 常用 于 初始化

                    -  所以在 过去 constructor 通常用于 初始化 state 与 绑定函数

                    ```
                     import React from 'react'

                     class Counter extends React.Component {
                         constructor(props) {

                             super(props);

                             this.state = {
                                 count: 0,
                             }

                             this.handleClick = this.handleClick.bind(this);
                         }

                         handleClick() {
                             // do some thing
                         }

                         render() {
                             return null;
                         }
                     }

                    ```

                    -  因为 类 属性 开始 流行 之后, React 社区 的 写法 发生了 变化, 即 去除了 constructor

                    ```
                     import React from 'react'

                     class Counter extends React.Component {
                         state = {
                             count: 0,
                         }

                         // 类属性 第三阶段 提案
                         handleClick = () => {
                             // do some
                         }

                         render() {
                             return null;
                         }
                     }

                    ```

                    -  社区中 去除 constructor 的 原因非常 明确:

                       + constructor 中 并不推荐 去 处理初始化 以外 的 逻辑

                       + 本身 constructor 并不属于 react 的 生命周期, 它 只是 Class 的 初始化 函数

                       + 通过 移除 constructor， 代码也会 变得 更为 简洁

               +   getDerivedStatFromProps

                   -  本函数的 作用是 使 组件在 props 变化 时 更新 state,

                   -  那 它 什么时候 才会 起效呢？ 它的 触发时机是:

                       + 当 props 被传入的 时候

                       + state 发生变化的时候

                       +  forceUpdate 被调用的时候

                   - 最常见的 一个错误 就是 认为 只有 props 发生变化的时候,  getDerivedStateFromProps 才会被调用

                       +  而 实际上  只要 父组件 重新渲染时, getDerivedStateFromProps 就会被 调用

                       +  所以是 外部参数, 也就是 props 传入时 就会发生变化

                       ```
                        class Example extends React.Component {
                            // 在 构造函数 中 初始化 state
                            // 或者 使用 属性 初始化 器

                            state = {
                                isScrollingDown: false,
                                lastRow: null,
                            };

                            static getDerivedStateFromProps(props, state) {

                                if (props.currentRow !== state.lastRow) {
                                    
                                    return {}
                                }
                            }

                            // 返回 null  表示 无需 更新 state
                            return null
                        }

                       ```

               +   UNSAFE_componentWillMount

                   -  componentWillMount()， 本来 用于 组件 即将 加载前 做 某些操作(        弃用)

                   -   因为 会在 React 的 异步渲染 机制下, 该方法 可能 会被 多次 调用

                       +  一个 常见的 错误 就是 componentWillMount 跟 服务器 端的 同构渲染的 时候,

                       +  如果 该函数 里面 发起 网络请求, 拉取数据, 那么会在 服务端 和 客户端 分别执行一次

                       +  所以 更推荐 在 componentDidMount 中 完成 数据的 拉取


                   -  一个良好的 设计 应该是 不让 用户 有 较高的 理解 成本 

               +  render 

                   -  render 函数 返回 JSX 结构, 用于 描述 具体的 渲染内容.

                   -  但是,  render 函数 并没有 真正的 去 渲染 组件, 渲染 是  依靠  React 操作 JSX  描述结构 来完成的

                   -   还有一点 需要注意的是: 

                       +  render 函数 应该是 一个纯 函数, 不应该 在 里面 产生副作用 (调用 setState() 或者 绑定事件)


                       +  但是 为什么 不能 setState 呢？
                        
                          -  因为 render 函数 在每次 渲染的时候 都会被 调用, 而 setState 会触发 渲染， 就会造成 死循环。

                       +  又为啥不能 绑定事件呢？

                          -  因为 容易被 频繁的 调用注册

                    
               +  componentDidMount

                   -  componentDidMount: 主要用于 组件加载 ***完成** 做某些操作, 比如 发起网络 请求 或者 绑定事件

                      +  该函数 是在 render 之后 调用的


                      +  但是 componentDidMount 一定是 在 真实的 DOM 绘制 完成后 调用吗？ 在 浏览器 端， 我们可以这么 认为


                      +  React Native 场景下,  componentDidMount 并不意味着 真实的 界面 已 绘制 完毕。

                         -  由于 机器的 性能 所限, 视图 可能 还在 绘制中

            
            -  更新阶段

                +  更新 阶段 是指 外部的 props 传入, 或者 state 发生 变化的时 的 阶段。


                +  UNSAFE_componentWillReceiveProps

                    -  该函数 已被 标记弃用.  因为 其功能 可被 函数  getDeriveStateFromProps 所代替

                    -    getDeriveStateFromProps  存在时,  UNSAFE_componentWillReceiveProps 也不会被调用


                +  getDerivedStateFromProps


                    -  同挂载 阶段 的 表现 一致


                + shouldComponentUpdate 

                    -   该方法  返回 true/FALSE  来 确定是否 需要 触发 最后一道 关卡, 所以 也是 性能 优化的 必争之地


                       +  通过  添加 判断条件 来阻止 不必要的 渲染

                    -  React 官方 提供了 一个 通用的 优化 方案, PureComponent.

                       +  PureComponent 的 核心 原理 就是 默认 实现 了  shouldComponentUpdate 函数

                       +  这个 函数中 对 state 和 props 进行 浅比较, 用来 判断 是否 触发 更新


                     ```
                      shouleComponentUpdata(nextProps,  nextState) {

                          // 浅比较 仅 比较 值 和 引用 , 并不会 object  每一项 值 都进行 比较

                          if (shadowEqual( nextProps, this.props) || shadowEqual(nextState, this.state)) {

                              return true;
                          }

                          return false;
                      }

                     ```
                    
                 +  UNSAFE_componentWillUpdate

                     - (废弃)  因为 后续的 react 异步渲染 中, 可能 会 出现 组件 暂停 更新 渲染 的 情况


                 +  render

                     - 同 挂载阶段

                
                 +  getSnapeshotBeforeUpdate

                     -  getSnapeshotBeforeUpadte  方法是  配合 react 新的 异步渲染的 机制

                     -  在 DOM 更新 发生 前 被调用

                     -  返回值 会 作为 componentDidUpdate 的 第三个参数


                 +  componentDidUpdate

                      -   getSnapshotBeforeUpdate 的返回值会作为componentDidUpdate的第三个参数使用。

                      -  componentDidUpdate中可以使用 setState，***会触发重渲染**，但一定要小心使用，
                        
                         ***避免死循环**


            - 卸载 阶段 

                +  卸载阶段就容易很多了，只有一个回调函数

                +  componentWillUnmount

                    -  该函数 主要用于 执行清理 工作, 

                    -   一个 常见的 bug  就是 忘记在 componentWillUnmount 中取消定时器

                        +  导致定时操作依然在组件销毁后不停地执行。所以一定要在该阶段解除事件绑定，取消定时器。


         +  职责梳理

             -  如果我们的 React 应用足够复杂、渲染层级足够深时，一次重新渲染，将会消耗非常高的性能，导致卡顿等问题

             
             -   下面 3 种情况都会触发重新渲染

                +  函数组件

                   -  ***函数组件 任何 情况下 都会 重新 渲染.** 

                   -  它 并没有 生命周期..  官方 有一种 方式 优化方案   React.memo 

                ```
                  const MyComponent = React.memo(function MyComponent(props) {

                      // 使用 props 渲染
                  })

                ```
                +  React.memo 并不是 阻断 渲染, 而是 跳过 渲染组件的 操作 并直接 复用 最近一次的 渲染结果


                +  React.Component

                   -  如果 不 实现 shouldComponetUpdate 函数, 那么 有两种 情况 会 触发 渲染


                      +  当 state 发生变化的时候,

                      +  当 父级 组件的 props 传入的时候, 无论 props 有没有 变化, 只要 传入 就会 引发 重新渲染


                +  React.PureComponent

                   -  PureComponent 默认实现了 shouldComponentUpdate 函数。
                   
                   -   所以仅在 props 与 state 进行浅比较后，确认有变更时才会触发重新渲染。

                +  错误边界

                   -   错误边界是一种 React 组件，这种组件可以捕获并打印发生在其子组件树任何位置的 JavaScript 错误，并且，它会渲染出备用 UI

                   ```
                    class ErrorBoundary extends React.Component {

                        constructor(props) {

                            super(props);

                            this.state = { hasError: false};
                        }

                        static getDerivedStateFromError(error) {

                            // 更新 state 使 下一次 渲染 能够 显示 降级 后的 UI
                            return { hasError: true};
                        }

                        componentDidCatch(error,  errorInfo) {

                            logErrorToMyService(error, errorInfo)
                        }

                        render()  {

                            if (this.state.hasError) {

                                // 你可以 自定义 降级后的 UI 并 渲染
                                return <h1>SOMETHING IS WRONG<h1/>
                            }

                            return  this.props.children;
                        }
                    }


                   ```



                   -   无论是 React，还是 React Native，如果没有错误边界，在用户侧看到的现象会是这样的：在执行某个操作时，触发了 Bug，引发了崩溃，页面突然白屏

                   -   但渲染时的报错，只能通过 *** componentDidCatch 捕获**。这是在做线上页面报错监控时，极其容易忽略的点儿。






   
   -  答题：

       +  避免生命周期种的 坑 就是 需要 做好 两件事情:

          -  不 在 不恰当的时候 调用了 不该调用的 代码

          -  在需要调用时, 不要忘了 调用


       +  7 钟 情况

         
          -   getDerivedStateFromProps  
          
            
              +   容易 编写 反模式的 代码, 使 受控的 组件 和 非 受控组件 区分 模糊


          -  componentWillMount


              +  (弃用了)


              +   主要是 因为 异步渲染 架构 会导致 它 被多次 调用

              +   所以 网络请求 以及  事件绑定  应 移至  componentDidMount 中


          -  componentWilReceiveProps

             +  （弃用）


             +   被 getDeivedStateFromProps  取代， 主要的 原因 是 性能 问题


          -  shouldComponentUpdate

             +  通过 返回 false/true  来 确定 是否 是需要 触发 新的 渲染

             +  主要 用于 性能 优化


          -   componentWillUpdate

             +  因 新的异步渲染机制（废弃） 


             +  原先的逻辑  可以 结合  

                -  getSnapshotBeforeUpdate  


                -  componentDidUpdate 改造 使用


          -    componentWillUnmount


             +   如果在 componentWillUnmount 函数中忘记解除事件绑定，取消定时器等清理操作，容易引发 bug。


        
          -   如果没有添加错误边界处理，当渲染发生异常时，
          
              +  用户将会看到一个无法操作的白屏，所以一定要添加。

                   +   getDerivedStateFromError


                   +   componentDidCatch  捕获错误






#   04. 类组件与函数组件有什么区别呢？

   -  破题


      +  描述区别，就是求同存异的过程

         -  在确认共性的基础上，才能找到它独特的个性

         -  再通过具体的场景逐个阐述它的个性

      
      +  类组件与函数组件的共同点

         -  都可以用它们作为基础组件展示 UI



  -  承题


      +  从组件的 **使用方式和表达效果** 来总结相同点


      +  从 **代码实现**、 **独有特性** 、 **具体场景** 等细分领域描述不同点


  -  答题

      
      +  作为 组件 而言


         -  类组件 与 函数组件 在使用 与 呈现上 没有 任何不同, 性能上 在 现代 浏览器中 不会有 明显的 差异


      +  它们 开发 的 心智 模型上 却 存在 巨大的 差异


         -   类组件 是 面向对象 编程的 

             +  主打 继承, 生命周期的 

         -   函数组件的 内核 是 函数式 编程

             +  主打 immutable 没有副作用, 引用 透明


         -  使用 场景上

             +  需要使用到 生命周期的 组件

                -  主 推 类组件


             +  设计模式上, 需要 使用 继承

                -  主 推 类 组件

             + React Hooks 的推出 

                - 生命周期概念的 淡出

                   +  函数组件 可以 完全 取代 类组件

        
          -  其次 继承 并不是 组件 最佳的 设计模式

               -  官方 更推荐 **组合优于继承**  的设计概念

               -  所以 类组件 也开始 淡出

          -  性能优化

               +   类组件 主要 依靠 shouldComponentUpdate 阻断渲染 来 提升 性能

               +   函数组件 依靠  React.memo  缓存渲染 结果 来 提升性能


          -  上手程度

               +  类组件 更容易 上手


          -   从未来的 趋势 上看

               +  由于 React Hooks 推出, 函数组件 成了 社区未来的 主推的 方案


          -   类组件 在  **未来时间 切片**  与 **并发模式** 

               +  由于 生命周期 带来的 复杂度, 并不易于 优化

          -   而函数组件本身轻量简单 
          
               +  且在 Hooks 的基础上提供了比原先更细粒度的逻辑组织与复用，更能适应 React 的未来发展。


    
# 05.如何设计 React 组件？

   -  


