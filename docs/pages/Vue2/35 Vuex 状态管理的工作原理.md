---
title: Vuex 状态管理的工作原理
date: 2023-05-19 21:02:24
permalink: /pages/37d055/
categories: 
  - 全部分类
  - vue2
tags: 
  - vue2
author: 
  name: Xiang
  # link: https://gitee.com/lxlxlxlxxl
---
为什么要使用 Vuex
---------------

> 当我们使用 Vue.js 来开发一个单页应用时，经常会遇到一些组件间共享的数据或状态，或是需要通过 props 深层传递的一些数据。在应用规模较小的时候，我们会使用 props、事件等常用的父子组件的组件间通信方法，或者是通过事件总线来进行任意两个组件的通信。但是当应用逐渐复杂后，问题就开始出现了，这样的通信方式会导致数据流异常地混乱。

<!-- more -->

![lerna](/images/vue2.22.webp)

这个时候，我们就需要用到我们的状态管理工具 Vuex 了。Vuex 是一个专门为 Vue.js 框架设计的、专门用来对于 Vue.js 应用进行状态管理的库。它借鉴了 Flux、redux 的基本思想，将状态抽离到全局，形成一个 Store。因为 Vuex 内部采用了 new Vue 来将 Store 内的数据进行「响应式化」，所以 Vuex 是一款利用 Vue 内部机制的库，与 Vue 高度契合，与 Vue 搭配使用显得更加简单高效，但缺点是不能与其他的框架（如 react）配合使用。



安装
---
Vue.js 提供了一个 Vue.use 的方法来安装插件，内部会调用插件提供的 install 方法。
```
Vue.use(Vuex);
```
所以我们的插件需要提供一个 install 方法来安装。
```
let Vue;

export default install (_Vue) {
    Vue.mixin({ beforeCreate: vuexInit });
    Vue = _Vue;
}
```
我们采用 Vue.mixin 方法将 vuexInit 方法混淆进 beforeCreate 钩子中，并用 Vue 保存 Vue 对象。那么 vuexInit 究竟实现了什么呢？

我们知道，在使用 Vuex 的时候，我们需要将 store 传入到 Vue 实例中去。
```
/*将store放入Vue创建时的option中*/
new Vue({
    el: '#app',
    store
});
```
但是我们却在每一个 vm 中都可以访问该 store，这个就需要靠 vuexInit 了。
```
function vuexInit () {
    const options = this.$options;
    if (options.store) {
        this.$store = options.store;
    } else {
        this.$store = options.parent.$store;
    }
}
```
因为之前已经用Vue.mixin 方法将 vuexInit 方法混淆进 beforeCreate 钩子中，所以每一个 vm 实例都会调用 vuexInit 方法。

如果是根节点（$options中存在 store 说明是根节点），则直接将 options.store 赋值给 this.$store。否则则说明不是根节点，从父节点的 $store 中获取。

通过这步的操作，我们已经可以在任意一个 vm 中通过 this.$store 来访问 Store 的实例啦～

Store
-----
数据的响应式化
首先我们需要在 Store 的构造函数中对 state 进行「响应式化」。
```
constructor () {
    this._vm = new Vue({
        data: {
            $$state: this.state
        }
    })
}
```

熟悉「响应式」的同学肯定知道，这个步骤以后，state 会将需要的依赖收集在 Dep 中，在被修改时更新对应视图。我们来看一个小例子。
```
let globalData = {
    d: 'hello world'
};
new Vue({
    data () {
        return {
            $$state: {
                globalData
            }
        }
    }
});
```


```
/* modify */
setTimeout(() => {
    globalData.d = 'hi~';
}, 1000);

Vue.prototype.globalData = globalData;
```
任意模板中

```
<div>{{globalData.d}}</div>

```
上述代码在全局有一个 **globalData**，它被传入一个 Vue 对象的 data 中，之后在任意 Vue 模板中对该变量进行展示，因为此时 **globalData**已经在 **Vue 的 prototype** 上了所以直接通过 **this.prototype** 访问，也就是在模板中的 globalData.d 此时，setTimeout 在 1s 之后将 **globalData.d**进行修改，我们发现模板中的 **globalData.d** 发生了变化。其实上述部分就是 Vuex 依赖 Vue 核心实现数据的“响应式化”。

讲完了 Vuex 最核心的通过 Vue 进行数据的「响应式化」，接下来我们再来看看 Vuex 中几个最重要的核心属性。很多同学学 Vuex 时，能记住 `state`、`getters`、`mutations`、`actions` 这些名字，但不一定真的清楚它们分别解决什么问题。实际上，Vuex 的工作链路可以概括为：

`组件读取 state / getters -> 组件通过 commit / dispatch 发起变更 -> mutation / action 执行逻辑 -> state 更新 -> 视图重新渲染`

Vuex 中到底有哪些核心属性
-------------------------

state
-----
`state` 是 Vuex 中真正用来存放共享状态的地方，本质上就是一个普通对象，只是 Vuex 会把它放进 Vue 实例的 `data` 中，让它变成响应式数据。

它的作用主要有两个：

1. 统一存储多个组件共享的数据。
2. 在数据变化时自动通知视图更新。

例如：

```
const store = new Vuex.Store({
    state: {
        count: 0,
        userInfo: null
    }
});
```

组件中通常通过 `this.$store.state.xxx` 来读取：

```
computed: {
    count () {
        return this.$store.state.count;
    }
}
```

所以 `state` 可以理解成整个应用的“共享数据仓库”，Vuex 的核心能力之一就是把这份共享数据接入 Vue 的响应式系统。

getters
-------
`getters` 可以理解为 Vuex 中的“计算属性”。它不直接保存数据，而是基于 `state` 派生出新的结果。

它的作用主要是：

1. 对原始状态做过滤、映射、组合。
2. 复用数据处理逻辑，避免多个组件重复计算。
3. 让组件更专注于展示，而不是自己处理复杂的数据加工。

例如：

```
const store = new Vuex.Store({
    state: {
        todos: [
            { id: 1, text: '学习 Vuex', done: true },
            { id: 2, text: '整理笔记', done: false }
        ]
    },
    getters: {
        doneTodos (state) {
            return state.todos.filter(todo => todo.done);
        },
        doneTodosCount (state, getters) {
            return getters.doneTodos.length;
        }
    }
});
```

组件中访问：

```
computed: {
    doneTodosCount () {
        return this.$store.getters.doneTodosCount;
    }
}
```

从原理上说，Vuex 会把定义好的 `getters` 统一收集并挂载到 `store.getters` 上，当它依赖的 `state` 变化后，派生结果也会随之更新。因此 `getters` 的重点不是“存数据”，而是“描述数据怎么被计算出来”。

mutation
--------
`mutation` 是 Vuex 中修改 `state` 的唯一同步入口。注意这里有两个关键词：**修改 state**、**必须同步**。

它存在的意义是：

1. 把所有状态修改集中起来管理。
2. 让状态变化有固定入口，更容易追踪。
3. 方便调试工具记录每一次状态变化。

例如：

```
const store = new Vuex.Store({
    state: {
        count: 0
    },
    mutations: {
        increment (state, payload) {
            state.count += payload;
        }
    }
});
```

组件中不能随意直接修改共享状态，而是要通过 `commit` 触发：

```
this.$store.commit('increment', 1);
```

为什么 `mutation` 必须同步？因为 Vuex 需要明确知道每一次状态变更是何时发生、由谁触发的。如果在 `mutation` 中写异步代码，那么状态真正修改的时机就不可预测，不利于调试和状态追踪。

从实现上看，Vuex 初始化时会把每一个 `mutation` 包装后存进 `store._mutations` 中，`commit` 时根据 `type` 取出对应处理函数并执行，所以我们才会在源码中看到：

```
const entry = this._mutations[type];
```

action
------
`action` 的职责不是直接修改 `state`，而是负责处理异步流程和业务逻辑，然后再通过提交 `mutation` 去修改状态。

它的作用是：

1. 处理异步请求、定时器、接口调用等场景。
2. 封装较复杂的业务流程。
3. 把“流程控制”和“状态修改”分开。

例如：

```
const store = new Vuex.Store({
    state: {
        count: 0
    },
    mutations: {
        increment (state, payload) {
            state.count += payload;
        }
    },
    actions: {
        incrementAsync ({ commit }, payload) {
            setTimeout(() => {
                commit('increment', payload);
            }, 1000);
        }
    }
});
```

组件中通过 `dispatch` 触发：

```
this.$store.dispatch('incrementAsync', 1);
```

这里要特别区分：

- `mutation` 负责真正修改状态。
- `action` 负责组织异步和业务流程。

因此，`action` 可以异步，但最后状态的修改仍然要通过 `mutation` 完成。

modules
-------
当项目越来越大时，如果把所有状态、方法都堆在一个 Store 里，就会变得非常难维护。所以 Vuex 又提供了 `modules` 机制，用来把一个大的 Store 拆分成多个小模块。

例如可以拆成：

- `user` 模块
- `cart` 模块
- `order` 模块

每个模块都可以拥有自己的：

- `state`
- `getters`
- `mutations`
- `actions`

从原理上看，Vuex 初始化时会递归安装这些模块，把各模块的 `state` 组合成一棵完整的状态树，再把模块中的 `mutations`、`actions`、`getters` 分别注册到全局收集结构中。

commit
-------
首先是 commit 方法，我们知道 commit 方法是用来触发 mutation 的。
```
commit (type, payload, _options) {
    const entry = this._mutations[type];
    entry.forEach(function commitIterator (handler) {
        handler(payload);
    });
}
```
从 _mutations 中取出对应的 mutation，循环执行其中的每一个 mutation。

dispatch
--------
dispatch 同样道理，用于触发 action，可以包含异步状态。
```
dispatch (type, payload) {
    const entry = this._actions[type];

    return entry.length > 1
    ? Promise.all(entry.map(handler => handler(payload)))
    : entry[0](payload);
}

```
同样的，取出 _actions 中的所有对应 action，将其执行，如果有多个则用 Promise.all 进行包装。

最后
----
理解 Vuex 的核心，不只是知道它能做“全局状态共享”，更重要的是理解它如何借助 Vue 的响应式机制，把 `state`、`getters`、`mutations`、`actions` 组织成一条稳定、可预测的数据流。

Vuex 本身代码不多且设计优雅，非常值得一读

[《Vuex状态管理的工作原理》](https://github.com/answershuto/VueDemo/blob/master/%E3%80%8AVuex%E7%8A%B6%E6%80%81%E7%AE%A1%E7%90%86%E7%9A%84%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E3%80%8B.js) 
