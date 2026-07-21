---
title: 一文读懂vue装饰器
date: 2023-04-17 21:00:45
permalink: /pages/48757f/
categories: 
  - 全部分类
  - vue2
tags: 
  - vue2
author: 
  name: GleenLey
  link: https://gitee.com/Gleenley
---
## 一文读懂vue中的装饰器

> 什么是装饰器
Decorator 是 ES7 的一个新语法，目前仍处于第2阶段提案中，正如其“装饰器”的叫法所表达的，他通过添加@方法名可以对一些对象进行装饰包装然后返回一个被包装过的对象，可以装饰的对象包括：类，属性，方法等。

<!-- more -->

**使用之前需要.eslintrc.js中配置**

```js
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "eslint:recommended"],
  parserOptions: {
    parser: "babel-eslint",
    ecmaFeatures: {
      //支持修饰器
      legacyDecorators: true
    }
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off"
  }
};

```

**第二次进入页面自动开启actived方法**
```js
/**
 * 第二次进入页面自动开启actived方法
 * @export
 * @returns {Function} fn
 */
export function autoActived() {
	return function(target, name, descriptor) {
		const method = descriptor.value
		descriptor.value = function() {
			const _this = this._isVue ? this : target
			_this.autoLive ? method.apply(_this, arguments) : (_this.autoLive = true)
		}
	}
}
```
**组件中使用**
```js
  import { autoActived } from '@/utils/decorator'
  created() {},
  mounted() {},

  @autoActived()
  activated() {
    this.onSubmit()
  },
  beforeDestroy() {},
```
**自动开启表格loading**
```js
/**
 * 自动开启loading
 * @export
 * @param {string} [loadingKey='loading']
 * @returns
 */
export function autoSwitch(loadingKey = 'loading') {
  return function(target, name, descriptor) {
    const method = descriptor.value
    descriptor.value = async function() {
      const _this = this._isVue ? this : target
      _this[loadingKey] = true // 开启
      const [err, result] = await to(method.apply(_this, arguments))
      _this[loadingKey] = false // 关闭
      return err || result
    }
  }
}

```

**组件中使用**

```js
import { autoSwitch } from '@utils/decorator.js'

methods: {
    @autoSwitch('loading')
    async handleSubmit() {
        try {
            const res = this.$api.xx()
            console.log(res)
        } catch (error) {
            console.log(error)
        }
        
    }
}
```

**开启表格高度自动计算**

```js
/**
 * 开启表格高度自动计算
 * @export
 * @param {string} tableName 对应组件 ref 的名字
 * @returns
 */
export function initTableHeight(tableName) {
	return function(target, name, descriptor) {
		descriptor.value = async function() {
			const _this = this._isVue ? this : target
			setTimeout(() => {
				const pageH = document.documentElement.clientHeight || document.body.clientHeight
				const tableY = _this.$refs[tableName].$el.getBoundingClientRect().y
				_this.mainHeight = pageH - tableY
			})
		}
	}
}
```
**组件中使用**
```js
import { initTableHeight } from '@/utils/decorator'

data() {
    reuturn {
        mainHeight: 0 //初始化高度 响应式
    }
},
methods: {
    handleSearch() {},
    /**
     * @description: 使用装饰器计算高度
     * @return {*} initTableHeight('refName') 传入组件名
     * 如果不应用于方法之前 会报错
     */

    @initTableHeight('detail')
    initTableHeightContainer() {},
},
mounted() {
    this.initTableHeightContainer()
}

```


**Element ui 的 异步messageBox**
```js
methods: {
    handleSave() {
        this.$confirm('确定执行批量删除用户吗？', '批量删除用户', {
            dangerouslyUseHTMLString: true,
            distinguishCancelAndClose: true,
            confirmButtonText: '删除',
            beforeClose: async (action, instance, done) => {
                if (action !== 'confirm') return done()
                instance.confirmButtonText = '执行中...'
                const [err] = await this.$to(this.$api.delUser({ ids }))
                if (err) return done()
                this.$message.success('批量删除成功!')
                done()
            }
          })
    }
}

```
**改造之后**

```js
// utils/decorator.js
/**
 * 确认框
 * @param {String} title - 标题
 * @param {String} concent - 内容
 * @param {String} confirmButtonText - 确认按钮名称
 * @returns 
 */
export const confirm = (title, concent, confirmButtonText = '确定') => {
  return (target, name, descriptor) => {
    const method = descriptor.value
    descriptor.value = function (...args) {
      const isUseFunction = (key) => toType(key, 'Function') ? key(...args) : key
      const _this = this._isVue ? this : target
      const _title = isUseFunction(title)
      const _concent = isUseFunction(concent)
      return _this.$confirm(_concent, _title, {
        dangerouslyUseHTMLString: true,
        distinguishCancelAndClose: true,
        confirmButtonText: confirmButtonText,
        beforeClose: async (action, instance, done) => {
          if (action !== 'confirm') return done()
          instance.confirmButtonText = '执行中...'
          const [err] = await to(method.call(_this, ...args), instance, 'confirmButtonLoading')
          if (err) return console.error(err)
          done()
        }
      })
    }
  }
}
```
**组件中使用**
```js
import { formValidation } from '@utils/decorator.js'

methods: {
    @confirm('批量删除用户', '确定执行批量删除用户吗？', '删除')
    async handleDel(ids) {
        const [err] = await this.$to(this.$api.delUser({ ids }))
        if (err) return
        this.$message.success('批量删除成功!')
        this.getData()
    }
}

```

**confirm确认框方式二**
```js
export function confirm(message, title, cancel) {
    return (target, name, descriptor) => {
        console.log('name ', name);
        console.log('target ', target);
        console.log('descriptor ', descriptor);
        // 保存被装饰的函数
        const fn = descriptor.value
        // 重写函数扩展功能
        descriptor.value = function (...reset) {
            const result = window.confirm(`${title}\n\n${message}`)
            if (result) {
                // 执行原函数
                fn.apply(this, reset)
            } else {
                // 执行取消函数并绑定this便于后续使用
                cancel && cancel.apply(this, [])
            }
        }
    }
}
```
**组件中使用**

```js
<script>
import { confirm } from "./decorators";
export default {
  name: "App",
  methods: {
    @confirm("确定要删除吗？", "提示", function() {
        // 通过在装饰器函数中使用apply改变this,使得此处可以使用定义的cancel函数    
        this.cancel();
    })
    // 简化在删除功能中的二次确认部分
    deleteItem(id) {
      console.log("删除成功", id);
    },
    cancel() {
      console.log("取消了");
    },
  },
};
</script>
```


**防抖**
```js
// utils/decorator.js
/**
 * 防抖，连续操作时，只在最后一次触发
 * @export
 * @param {Function} fun - 运行函数
 * @param {Number} wait - 延迟时间
 * @returns
 */
export function debounce(wait) {
  return function(target, name, descriptor) {
    const fn = descriptor.value
    let timer = null
    descriptor.value = function() {
      const _this = this._isVue ? this : target
      clearTimeout(timer)
      timer = setTimeout(() => {
        fn.apply(_this, arguments)
      }, wait)
    }
  }
}

```

**组件中使用**
```js
import { debounce } from '@utils/decorator.js'

methods: {
    @debounce(500)
    handleSubmit() {
        console.log('试试就试试')
    }
}
```

**节流**
```js
// utils/decorator.js
/**
 * 节流，一定时间内，只能触发一次操作
 * @export
 * @param {Function} fn - 运行函数
 * @param {Number} wait - 延迟时间
 * @returns
 */
export function throttle(wait) {
  return function(target, name, descriptor) {
    const fn = descriptor.value
    let canRun = true
    descriptor.value = function() {
      const _this = this._isVue ? this : target
      if (!canRun) return
      fn.apply(_this, arguments)
      canRun = false
      setTimeout(() => {
        canRun = true
      }, wait)
    }
  }
}
```
**组件中使用**

```js
import { throttle } from '@utils/decorator.js'

methods: {
    @throttle(500)
    handleSubmit() {
        console.log('试试就试试')
    }
}
```

**缓存计算结果**
```js
/**
 * 缓存计算结果
 * @export
 * @param {Function} fn
 * @returns
 */
export function cached() {
  return function(target, name, descriptor) {
    const method = descriptor.value
    const cache = new Map()
    descriptor.value = function() {
      const _this = this._isVue ? this : target
      const key = JSON.stringify(arguments)
      if (!cache.has(key)) {
        cache.set(key, method.apply(_this, arguments))
      }
      return cache.get(key)
    }
  }
}
```

**组件中使用**

```js

import { cached } from '@utils/decorator.js'
methods: {
    @cached()
    handleSubmit(a, b, c) {
        console.log('试试就试试')
        return a + b + c
    }
}
```