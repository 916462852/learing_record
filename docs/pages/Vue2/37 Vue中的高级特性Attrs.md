---
title:  Vue中的高级特性$attrs
date: 2023-06-10 19:16:22
permalink: /pages/9fd2f9/
categories:
  - 全部分类
  - vue2
tags:
  - vue2
author: 
  name: GleenLey
  link: https://gitee.com/Gleenley
---


> 在 `Vue2 中 attr` 是指组件接收的 `HTML` 特性(`attribute`)，通过 `props` 的方式传递给子组件。

<!-- more -->

## Vue2 中使用 $attrs

**使用 v-bind指令绑定 HTML 属性**
在 `Vue2 中`，如果想将父组件传递的 `HTML` 属性传递给子组件进行使用，可以在子组件中通过 `props` 接收参数，并使用 `v-bind `指令将其绑定到子组件的 `HTML` 元素上。例如：
```js
// 父组件
<template>
    <div>
        父组件
        <child-components
         :name="name"
         :age="age"
         :sex="sex"
        ></child-components>
    </div>
</template>

<script>
import childComponents from "./child.vue"
export default {
    name: 'parentsComponents',
    components: {
        childComponents
    },
    data() {
        return {
            name: 'GleenLey',
            age: 12,
            sex: 'male'
        }
    },
    methods: {},
    mounted() {}
}
</script>
<style>
</style>
```
在父组件中使用该组件时，可以通过` v-bind `指令将` HTML `特性传递给子组件：
```js
//  子组件
<template>
    <div 
    v-bind="$attrs"
    class="container">
     子组件
    </div>
</template>

<script>
export default {
    name: 'childrenCompoents',
    props: {},
    data() {
        return {}
    },
    methods: {},
    mounted() {
      console.log(this.$attrs);
      console.log(this.$attrs.name);
      // Proxy(Object) {names: 'GleenLey', age: 12, sex: 'male', __vInternal: 1}[[Handler]]: Object[[Target]]: Object[[IsRevoked]]: 
     //  GleenLey
    }
}
</script>
<style>
</style>
```
## 结论
通过子组件打印出来的信息，可以得出结论： **在 Vue2 中，可以通过 $attrs 对象获取父组件传递给子组件但未被 props 所接收的特性，从而实现组件复用和扩展的目的，在父组件中通过props的方式传递参数给子组件，子组件并未通过props的方式去接收父组件传递过来的参数**

**注意:** **`inheritAttrs`**

需要注意的是，**由于 element-ui 组件本身也包含了一些默认的属性和事件，因此需要在组件中设置 inheritAttrs: false，以避免传递 element-ui 组件自带的属性和事件**