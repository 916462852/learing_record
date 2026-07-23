---
title: v-if和v-for的优先级是什么
date: 2023-05-25 21:44:46
permalink: /pages/ae786f/
categories:
  - 全部分类
  - vue2
tags:
  - vue2
author: 
  name: Xiang
  # link: https://gitee.com/lxlxlxlxxl
---


## 一、作用

`v-if` 指令用于条件性地渲染一块内容。这块内容只会在指令的表达式返回 `true`值的时候被渲染

`v-for` 指令基于一个数组来渲染一个列表。`v-for` 指令需要使用 `item in items` 形式的特殊语法，其中 `items` 是源数据数组或者对象，而 `item` 则是被迭代的数组元素的别名

<!-- more -->

在 `v-for` 的时候，建议设置`key`值，并且保证每个`key`值是独一无二的，这便于`diff`算法进行优化


两者在用法上

```js
<Modal v-if="isShow" />

<li v-for="item in items" :key="item.id">
    {{ item.label }}
</li>
```

## 二、优先级

`v-if`与`v-for`都是`vue`模板系统中的指令

在`vue`模板编译的时候，会将指令系统转化成可执行的`render`函数

### 示例

编写一个`p`标签，同时使用`v-if`与 `v-for`

```html
<div id="app">
    <p v-if="isShow" v-for="item in items">
        {{ item.title }}
    </p>
</div>
```

创建`vue`实例，存放`isShow`与`items`数据

```js
const app = new Vue({
  el: "#app",
  data() {
    return {
      items: [
        { title: "foo" },
        { title: "baz" }]
    }
  },
  computed: {
    isShow() {
      return this.items && this.items.length > 0
    }
  }
})
```

模板指令的代码都会生成在`render`函数中，通过`app.$options.render`就能得到渲染函数

```js
ƒ anonymous() {
  with (this) { return 
    _c('div', { attrs: { "id": "app" } }, 
    _l((items), function (item) 
    { return (isShow) ? _c('p', [_v("\n" + _s(item.title) + "\n")]) : _e() }), 0) }
}
```

`_l`是`vue`的列表渲染函数，函数内部都会进行一次`if`判断

初步得到结论：`v-for`优先级是比`v-if`高

再将`v-for`与`v-if`置于不同标签

```html
<div id="app">
    <template v-if="isShow">
        <p v-for="item in items">{{item.title}}</p>
    </template>
</div>
```

再输出下`render`函数

```js
ƒ anonymous() {
  with(this){return 
    _c('div',{attrs:{"id":"app"}},
    [(isShow)?[_v("\n"),
    _l((items),function(item){return _c('p',[_v(_s(item.title))])})]:_e()],2)}
}
```

这时候我们可以看到，`v-for`与`v-if`作用在不同标签时候，是先进行判断，再进行列表的渲染

我们再在查看下`vue`源码

源码位置：` \vue-dev\src\compiler\codegen\index.js`

```js
export function genElement (el: ASTElement, state: CodegenState): string {
  if (el.parent) {
    el.pre = el.pre || el.parent.pre
  }
  if (el.staticRoot && !el.staticProcessed) {
    return genStatic(el, state)
  } else if (el.once && !el.onceProcessed) {
    return genOnce(el, state)
  } else if (el.for && !el.forProcessed) {
    return genFor(el, state)
  } else if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.tag === 'template' && !el.slotTarget && !state.pre) {
    return genChildren(el, state) || 'void 0'
  } else if (el.tag === 'slot') {
    return genSlot(el, state)
  } else {
    // component or element
    ...
}
```

在进行`if`判断的时候，`v-for`是比`v-if`先进行判断

最终结论：在 `Vue2` 中，`v-for` 优先级比 `v-if` 高

### Vue3 中的变化

到了 `Vue3`，两者的优先级发生了变化：`v-if` 的优先级比 `v-for` 更高。

也就是说，在同一个元素上同时写这两个指令时，`Vue3` 会先执行 `v-if`，再处理 `v-for`。

例如下面这种写法：

```html
<li v-for="item in items" v-if="item.isShow" :key="item.id">
    {{ item.title }}
</li>
```

在 `Vue2` 中，理解方式更接近“先遍历，再判断”；

但在 `Vue3` 中，`v-if` 会先执行，这时候 `item` 还没有被 `v-for` 创建出来，因此这种写法会有作用域访问问题。

所以这个问题的最终结论应该分开记：

1. `Vue2` 中：`v-for` 优先级高于 `v-if`
2. `Vue3` 中：`v-if` 优先级高于 `v-for`

## 三、注意事项

1. 永远不要把 `v-if` 和 `v-for` 同时用在同一个元素上
2. 在 `Vue2` 中，这样写会带来性能浪费，因为每次渲染都会先循环，再逐项进行条件判断
3. 在 `Vue3` 中，这样写还可能导致 `v-if` 访问不到 `v-for` 中定义的变量
4. 如果是控制整个列表是否显示，推荐在外层嵌套 `template`，先做 `v-if` 判断，再在内部进行 `v-for` 循环

```js
<template v-if="isShow">
    <p v-for="item in items" :key="item.id">
        {{ item.title }}
    </p>
</template>
```

5. 如果条件出现在循环内部，推荐通过计算属性 `computed` 先过滤出需要显示的数据，再进行循环

```js
computed: {
    items: function() {
      return this.list.filter(function (item) {
        return item.isShow
      })
    }
}
```
