---
title: elementUI中常见问题汇总

date: 2023-06-15 20:11:21
permalink: /pages/eb2486/
categories:
  - 全部分类
  - 其他
tags:
  - Elemetn UI
author: 
  name: GleenLey
  link: https://gitee.com/Gleenley
---
> 记录日常开发中遇到的若干问题及其解决办法

<!-- more -->
## form 下面只有一个 input 时回车键刷新页面
原因是触发了表单默认的提交行为，给`el-form` 加上`@submit.native.prevent`

```js
<el-form inline @submit.native.prevent>
  <el-form-item label="订单号">
    <el-input
      v-model="query.orderNo"
      :placeholder="输入订单号查询"
      clearable
      @keyup.enter.native="enterInput"
    />
  </el-form-item>
</el-form>
```

## 校验手机号配置项
```js
    rules: { // 验证规则
      emplName: [
        { required: true, message: '请输入姓名', trigger: 'blur' }
      ],
      emplTel: [
        { required: true, message: '请输入手机号码', trigger: 'blur' },
        { pattern: /^1[3456789]\d{9}$/, message: '手机号码格式不正确', trigger: 'blur' } 
      ],
    },
```

## 表格固定列最后一行显示不全

```css
// 设置全局
.el-table__fixed-right {
  height: 100% !important;
}
```

## 气泡确认框文档里的confirm事件不生效

`ElementUI 2.14.0` 版本事件名称改为 `confirm` 和 `cancel`，如果你的版本低于 `2.14.0`，记得使用`onConfirm、onCancel`

```js
// 将confirm改为onConfirm
<el-popover @onConfirm="">
</el-popover>
```

## 输入框用正则限制但绑定值未更新

```js
<el-input 
  v-model="form.retailMinOrder" 
  placeholder="请输入" 
  onkeyup="value=value.replace(/[^\d.]/g,'')" 
/>

// 这样做虽然输入框的显示是正确的，但绑定的值是没有更新的，将 onkeyup 改为 oninput 即可。

// PS：输入中文后 v-model 会失效，下面的方式更好一点：

<el-input 
  v-model="form.retailMinOrder" 
  placeholder="请输入" 
  @keyup.native="form.retailMinOrder=form.retailMinOrder.replace(/[^\d.]/g,'')"
/>

```

## 去除type="number"输入框聚焦时的上下箭头

```css
/* 设置全局 */
.clear-number-input.el-input::-webkit-outer-spin-button,
.clear-number-input.el-input::-webkit-inner-spin-button {
  margin: 0;
  -webkit-appearance: none !important;
} 
.clear-number-input.el-input input[type="number"]::-webkit-outer-spin-button,
.clear-number-input.el-input input[type="number"]::-webkit-inner-spin-button {
  margin: 0;
  -webkit-appearance: none !important;
}
.clear-number-input.el-input {
  -moz-appearance: textfield;
} 
.clear-number-input.el-input input[type="number"] {
  -moz-appearance: textfield;
}

```

```js
<el-input type="number" class="clear-number-input" />
```

## 只校验表单其中一个字段
在一些用户注册场景中，提交整个表单前有时候我们会做一些单独字段的校验，例如发送手机验证码，发送时我们只需要校验手机号码这个字段，可以这样做：
```js
this.$refs['form'].validateField('mobile', valid => {
  if (valid) {
    // 发送验证码
  }
})
```

如果需要多个参数，将参数改为数组形式即可。


## 弹窗重新打开时表单上次的校验信息未清除
有人会在`open`时在`$nextTick`里重置表单，而我选择在关闭时进行重置。

```js
<el-dialog @close="onClose">
  <el-form ref="form">
  </el-form>
</el-dialog>

// 弹窗关闭时重置表单
onClose() {
  this.$refs['form'].resetFields()
}

```

## 表头与内容错位

```css 
// 全局设置
.el-table--scrollable-y .el-table__body-wrapper {
 overflow-y: overlay !important;
}
```

## 表单多级数据结构校验问题

```js
<el-form :model="form">
  <el-form-item label="部门" prop="dept"></el-form-item>
  <el-form-item label="姓名" prop="user.name"></el-form-item>
</el-form>

```

```js
rules: {
  'user.name': [{ required: true, message: '姓名不能为空', trigger: 'blur' }]
}
```

## 表格跨分页多选
只需加上`row-key`和`reserve-selection`即可。
```js
<el-table row-key="id">
  <el-table-column type="selection" reserve-selection></el-table-column>
</el-table>
```
## 根据条件高亮行并去除默认hover颜色

```js
<el-table :row-class-name="tableRowClassName">
</el-table>

tableRowClassName({ row }) {
  return row.status === 2 ? 'highlight' : ''
}

```

```css
// 设置全局
.el-table .highlight {
  background-color: #b6e8fe;
  &:hover > td {
    background-color: initial !important;
  }
  td {
    background-color: initial !important;
  }
}
```

## 表单不想显示label但又想显示必填星号怎么办

```js
// label给个空格即可
<el-form>
  <el-table>
    <el-table-column label="名称">
      <template>
        <el-form-item label=" ">
           <el-input placeholder="名称不能为空" />
        </el-form-item>
      </template>
    </el-table-column>
  </el-table>
</el-form>

```

## table 内嵌 input 调用 focus 方法无效

```js
<el-table>
  <el-table-column label="名称">
    <template>
      <el-input ref="inputRef" />
    </template>
  </el-table-column>
</el-table>

// 无效
this.$refs['inputRef'].focus()
this.$refs['inputRef'][0].focus()
this.$refs['inputRef'].$el.children[0].focus()

// 有效
<el-input id="inputRef" />
document.getElementById('inputRef').focus()
```

## 表格内容超出省略

```js
<el-table-column label="客户名称" prop="customerName" show-overflow-tooltip>
</el-table-column>
```

## el-tree 展开/收起所有节点

```js
<el-tree ref="tree"></el-tree>
```
```js
expandTree(expand = true) {
  const nodes = this.$refs['tree'].store._getAllNodes()
  nodes.forEach(node => {
    node.expanded = expand
  })
}

```

## el-popover 位置偏移问题

```js
<el-popover ref="popover" placement="left" trigger="click">
</el-popover>
```

```js
// 获取数据后
this.$nextTick(() => {
  this.$refs['popover'].updatePopper()
})

```

## el-dialog 的 destroy-on-close 属性设置无效

`destroy-on-close` 设置为 `true` 后发现弹窗关闭后 `DOM` 元素仍在，没有被销毁。

解决办法：`在 el-dialog` 上添加 `v-if`。

```js
<el-dialog :visible.sync="visible" v-if="visible" destroy-on-close>
</el-dialog>
```

## el-cascader 选择后需要点击空白处才能关闭

级联选择器在设置为可选任意一级时，选定某个选项时需要手动点击空白处才能关闭。
解决办法：可在 `change` 事件触发时将其关闭。

```js
<el-cascader
  ref="cascader"
  @change="onChange"
/>
```
```js
onChange() {
  this.$refs['cascader'].dropDownVisible = false
}
```

## el-table-column添加v-if后数据位置错乱

```js
<el-table-column v-if="type === 'edit'" key="1"></el-table-column>
<el-table-column v-if="type === 'edit'" key="2"></el-table-column>
```