---
title: webpack优化常见方案
date: 2023-04-18 20:34:30
permalink: /pages/54deb0/
categories: 
  - 全部分类
  - webpack
tags: 
  - webpack
author: 
  name: GleenLey
  link: https://gitee.com/Gleenley
---
## 减少打包体积 代码压缩
## uglifyjs-webpack-plugin
+ 代码压缩可以减少构建打包后的体积，但是并不能减少构建的时间，甚至增加了构建的时间，因为压缩也是耗费资源和时间的。

<!-- more -->

`
npm i -D uglifyjs-webpack-plugin
`
```js
// 代码压缩
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
​
  //在configureWebpack中plugins加入
    // 代码压缩
      new UglifyJsPlugin({
        uglifyOptions: {
          output: {
            comments: false // 去掉注释
          },
          //生产环境自动删除console
          compress: {
            drop_debugger: true,
            drop_console: true, //注释console
            pure_funcs: ["console.log"] // 移除console
          }
        },
        sourceMap: false, //是否启用文件缓存
        parallel: true  //使用多进程并行运行来提高构建速度
      }),
```
## terser-webpack-plugin
`webpack4 `默认内置使用 `terser-webpack-plugin` 插件压缩优化代码，而该插件使用 `terser` 来缩小 `JavaScript` 。所以你可以不下载`UglifyJsPlugin`直接使用 `terser-webpack-plugin`
```js

const TerserPlugin = require('terser-webpack-plugin')
​
    config
      .when(process.env.NODE_ENV === 'development',
        config => config.optimization.minimizer([new TerserPlugin({
          terserOptions: {
            mangle: true, // 混淆，默认也是开的，mangle也是可以配置很多选项的，具体看后面的链接  
            compress: {
              drop_console: true,//传true就是干掉所有的console.*这些函数的调用.   
              drop_debugger: true, //干掉那些debugger;   
              pure_funcs: ['console.log'] // 如果你要干掉特定的函数比如console.info ，又想删掉后保留其参数中的副作用，那用pure_funcs来处理  
            }
          }
        })])
      )

```
### [terser-webpack-plugin]  github.com/webpack-con…
gzip压缩

gzip可以减少构建打包后的体积，但是并不能减少构建的时间，甚至增加了构建的时间，因为压缩也是耗费资源和时间的。如果是使用nginx进行发布的，记得nginx配置支持gzip
`
npm install compression-webpack-plugin@6.1.1 --save-dev
`
```js
​
const CompressionWebpackPlugin = require('compression-webpack-plugin');
​
  //在configureWebpack中plugins加入
  new CompressionWebpackPlugin({
        // [file] 会被替换成原始资源。[path] 会被替换成原始资源的路径，[query] 会被替换成查询字符串
        filename: '[path][base].gz',
        // 压缩成gzip
        algorithm: 'gzip',
        // 使用正则给匹配到的文件做压缩，这里是给html、css、js以及字体做压缩
        test: /.js$|.css$|.html$|.ttf$|.eot$|.woff$/,
        // 只有大小大于该值的资源会被处理。单位是 bytes。默认值是 0。
        threshold: 10240,
        // 只有压缩率小于这个值的资源才会被处理。默认值是 0.8。
        minRatio: 0.8
      })

// 如果你按照上面优化一遍，启动时间直接接近翻倍。因为都是为了减少打包体积；
// 减少构建时间
```
### HardSourceWebpackPlugin
HardSourceWebpackPlugin是一个webpack插件，为模块提供中间缓存步骤。第一次构建将花费正常的时间。之后的建设将大大加快。就算重启，只要缓存还有效，都会使用。
```js
npm install --save-dev hard-source-webpack-plugin
```
```js
 plugins: [      
      // 缓存 加速二次构建速度
      new HardSourceWebpackPlugin({
        //设置缓存目录的路径      相对路径或者绝对路径
        //  cacheDirectory是在高速缓存写入 ，设置缓存在磁盘中存放的路径
        cacheDirectory: './../disk/.cache/hard-source/[confighash]',
        // 也就是cacheDirectory中的[confighash]值
        recordsPath: './../disk/.cache/hard-source/[confighash]/records.json',
        //configHash在启动webpack实例时转换webpack配置，并用于cacheDirectory为不同的webpack配置构建不同的缓存
        configHash: function (webpackConfig) {
          // node-object-hash on npm can be used to build this.
          return require('node-object-hash')({ sort: false }).hash(webpackConfig);
        },
        // Either false, a string, an object, or a project hashing function.
        environmentHash: {
          root: process.cwd(),
          directories: [],
          files: ['package-lock.json']
          // files: ['./package-lock.json', './yarn.lock'],
        },
        //自动清除缓存
        cachePrune: {
          //缓存最长时间（默认2天）,设置了30天
          maxAge: 30 * 24 * 60 * 60 * 1000,
          //所有的缓存大小超过size值将会被清除 (默认50MB) 设置了200MB
          sizeThreshold: 200 * 1024 * 1024
        },
      }),
    ],
```
### 配置 externals 引入 cdn 资源
如果要用CDN引入一些资源，为了防止将某些 `import` 的包(`package`)打包到 `bundle` 中，而是在运行时(`runtime`)再去从外部获取这些扩展依赖，可以配置 `externals` 引入CDN资源；就是改变包引用路径，开发和生产环境统统改变有效。 比如 `import Vue from 'vue'` 默认来说 引用‘vue’默认从`node_modules`里面找`vue`,但是`vue.config.js`配置了`externals`，就不去引用`node_modules`，转而去找`public/index.html`里面的cdn有关vue的链接
`vue.config.js`
```
  生产环境上cdn,本地还是走node_modules,但是2者版本号保持一致,版本号看package.json
  https://unpkg.com/ unpkg如何找cdn链接
  cdn  https://unpkg.com/jquery/  留下最后一个/
  -> https://unpkg.com/browse/jquery@3.6.1/dist/jquery.slim.min.js  去掉browse/
  -> https://unpkg.com/https://unpkg.com/jquery@3.6.1/dist/jquery.slim.min.js
 
 ```
 ```js
const CDN = {
  css: ["https://unpkg.com/vant@2.12.53/lib/index.css"],
  js: [
    "https://unpkg.com/vue@2.6.11/dist/vue.min.js",
    "https://unpkg.com/vue-router@3.2.0/dist/vue-router.min.js",
    "https://unpkg.com/vant@2.12.53/lib/vant.min.js",
    "https://unpkg.com/axios@1.1.3/dist/axios.min.js",
    "https://unpkg.com/vconsole@3.14.7/dist/vconsole.min.js",
    "https://unpkg.com/moment@2.29.4/min/moment.min.js",
    "https://unpkg.com/lodash@4.17.21/lodash.min.js",
  ],
};
module.exports = {
 
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === "development") {
        // ......
    } else {
      //生产环境
      /**
       * externals:externals配置的对象统统走cdn.（不管生产还是本地开发）
       * 解释一下：import A from 'a' 去使用小a的时候不走node_modules了，统统走public/index.html里面配置的cdn链接。前提是要往html里面配置cdn各种链接.到这里就结束了 externals用法就完了
       * 但是有的时候本地开发走node_modules，生产环境走cdn，于是需要区分环境
       */
      config.externals = {
        vue: "Vue", //解释一下：import XX from 'vue' 这里的'vue' 就是externals的key vue. "Vue"是cdn vue链接全局挂载window上的Vue
        "vue-router": "VueRouter",
        moment: "moment",
        vant: "vant",
        axios: "axios",
        vconsole: "VConsole",
        lodash: "_",
      };
    }
  },
  //修改已有插件用chainWebpack vuecli官网明确说过。
  //这里就解释了为啥不在configureWebpack配置define，其实也可以配，不过很麻烦。
  chainWebpack: (config) => {
    config.plugin("define").tap((args) => {
      //这样是搞不出来的  args[0]['process_env'].isProd=JSON.stringify(process.env.NODE_ENV !== "development");
      args[0].isProd = JSON.stringify(process.env.NODE_ENV !== "development"); //都需要JSON.stringify
      args[0].CDN = JSON.stringify(CDN);
      return args;
    });
  },
};
```
`public/index.html`

```html
<!DOCTYPE html>
<html lang="">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"
    />
    <link rel="icon" href="<%= BASE_URL %>favicon.ico" />
    <!-- 生产环境生效 配合externals一起用
 直接就是isProd CDN使用 而不是htmlWebpackPlugin.options.isProd htmlWebpackPlugin.options.CDN使用.⚠️  -->
    <% if(isProd){ %> 
      <% for(var i in CDN.css) {%> 
        <link rel="stylesheet" href="<%= CDN.css[i]%>">
      <% } %>  
    <% } %>
​
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
    <noscript>
      <strong
        >We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't work
        properly without JavaScript enabled. Please enable it to
        continue.</strong
      >
    </noscript>
    <div id="app"></div>
​
    <!-- built files will be auto injected -->
    <!-- 生产环境生效  配合externals一起用-->
​
    <% if(isProd){ %>
      <% for(var i in CDN.js) {%> 
        <script  src="<%= CDN.js[i]%>"> </script>
      <% } %>  
    <% } %>
  </body>
</html>
```


### splitChunks分包

`webpack 4` 两个新的配置项`optimization.splitChunks` 和 `optimization.runtimeChunk`，webpack通用模式现在已经做了一些通用性优化，适用于多数使用者。
常用参数：

`minSize`(默认是30000)：最小包体积，这里的单位是byte，超过这个大小的包会被`splitChunks`优化
`minChunks`（默认是1）：模块的最小引用次数，如果引用次数低于这个值，将不会被优化
`maxInitialRequests`（默认是3）：设置`initial chunks`的最大并行请求数
`maxAsyncRequests`（默认是5）：按需加载时候最大的并行请求数,设置`async chunks`的最大并行请求数
`chunks` (默认是`async`) ：`initial`、`async`和`all`
`test`： 用于控制哪些模块被这个缓存组匹配到。原封不动传递出去的话，它默认会选择所有的模块。可以传递的值类型：`RegExp`、`String`和`Function`
`name`(打包的`chunks`的名字)：字符串或者函数(函数可以根据条件自定义名字)
`priority` ：缓存组打包的先后优先级。
```js
  config.optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\/]node_modules[\/]/,
                  priority: 10,
                  chunks: 'initial' // 仅打包最初依赖的第三方
                },
                elementUI: {
                  name: 'chunk-elementUI', // 将elementUI拆分为单个包
                  priority: 20, // 重量需要大于libs和app，否则将打包成libs或app
                  test: /[\/]node_modules[\/]_?element-ui(.*)/ // 为了适应cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // 可以自定义规则
                  minChunks: 3, //  最小公共数
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          config.optimization.runtimeChunk('single')
```

###  量化、分析
`speed-measure-webpack-plugin` 时间分析

测量出在你的构建过程中，每一个 `Loader `和 `Plugin` 的执行时长
而它的使用方法也同样简单，如下方示例代码所示，只需要在你导出 `Webpack` 配置时，为你的原始配置包一层 `smp.wrap `就可以了，接下来执行构建，你就能在 `console` 面板看到如它 `demo` 所示的各类型的模块的执行时长


安装
```sh
npm i speed-measure-webpack-plugin -D
```
使用
vue.config.js中配置
```js
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const smp = new SpeedMeasurePlugin({
  outputFormat: 'human'
})
module.exports = {
  configureWebpack: smp.wrap({
    plugins: []
  })
}

```

### webpack-bundle-analyzer 体积分析

安装
`
npm i webpack-bundle-analyzer -D
`
使用
```js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = {
configureWebpack: {
   plugins: [
      new BundleAnalyzerPlugin({
        //  可以是`server`，`static`或`disabled`。
        //  在`server`模式下，分析器将启动HTTP服务器来显示软件包报告。
        //  在“静态”模式下，会生成带有报告的单个HTML文件。
        //  在`disabled`模式下，你可以使用这个插件来将`generateStatsFile`设置为`true`来生成Webpack Stats JSON文件。
        analyzerMode: 'server',
        //  将在“服务器”模式下使用的主机启动HTTP服务器。
        analyzerHost: '127.0.0.1',
        //  将在“服务器”模式下使用的端口启动HTTP服务器。
        analyzerPort: 8888, 
        //  路径捆绑，将在`static`模式下生成的报告文件。
        //  相对于捆绑输出目录。
        reportFilename: 'report.html',
        //  模块大小默认显示在报告中。
        //  应该是`stat`，`parsed`或者`gzip`中的一个。
        //  有关更多信息，请参见“定义”一节。
        defaultSizes: 'parsed',
        //  在默认浏览器中自动打开报告
        openAnalyzer: true,
        //  如果为true，则Webpack Stats JSON文件将在bundle输出目录中生成
        generateStatsFile: false, 
        //  如果`generateStatsFile`为`true`，将会生成Webpack Stats JSON文件的名字。
        //  相对于捆绑输出目录。
        statsFilename: 'stats.json',
        //  stats.toJson（）方法的选项。
        //  例如，您可以使用`source：false`选项排除统计文件中模块的来源。
        //  在这里查看更多选项：https：  //github.com/webpack/webpack/blob/webpack-1/lib/Stats.js#L21
        statsOptions: null,
        logLevel: 'info' // 日志级别。可以是'信息'，'警告'，'错误'或'沉默'。
      })
    ]
  },
}

```

### 缓存
`webpack`缓存的插件有两个

`DllPlugin `配置比较繁琐
`hard-source-webpack-plugin`

`DllPlugin`
提取固定三方库预编译，减少打包体积，加快编译速度

使用
在项目根目录下新建 `webpack.dll.conf.js`，输入以下内容
```js
const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')

// dll文件存放的目录
const dllPath = 'public/vendor'

module.exports = {
  entry: {
    // 需要提取的库文件
    vendor: [
      'vue-router/dist/vue-router.esm.js',
      'vuex/dist/vuex.esm.js',
      'axios',
      'mint-ui',
      'echarts',
      'toastr',
      'mockjs',
      'es6-promise'
    ]
  },
  output: {
    path: path.join(__dirname, dllPath),
    filename: '[name].dll.js',
    // vendor.dll.js中暴露出的全局变量名
    // 保持与 webpack.DllPlugin 中名称一致
    library: '[name]_[hash]'
  },
  plugins: [
    // 清除之前的dll文件
    new CleanWebpackPlugin(['*.*'], {
      root: path.join(__dirname, dllPath)
    }),
    // 设置环境变量
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: 'production'
      }
    }),
    // manifest.json 描述动态链接库包含了哪些内容
    new webpack.DllPlugin({
      path: path.join(__dirname, dllPath, '[name]-manifest.json'),
      // 保持与 output.library 中名称一致
      name: '[name]_[hash]',
      context: process.cwd()
    })
  ]
}

// 在 package.json 中加入如下命令，生成dll
"scripts": {
    ...
    "dll": "webpack -p --progress --config ./webpack.dll.conf.js"
}

配置完成以后运行命令
```

```sh
npm run dll
```


### 为了节约编译的时间，这时间我们需要告诉 webpack 公共库文件已经编译好了，减少 webpack 对公共库的编译时间。在项目根目录下找到 vue.config.js，配置如下
```js
const webpack = require('webpack')

module.exports = {
    configureWebpack: {
        plugins: [
          new webpack.DllReferencePlugin({
            context: process.cwd(),
            manifest: require('./public/vendor/vendor-manifest.json')
          })
        ]
    }
}


// 经过上面的配置，公共库提取出来了，编译速度快了,但需要在index.html引用生成的 dll 文件
<script src="./vendor/vendor.dll.js"></script>

// 不想手动引入也可以 vue.config.js 在 configureWebpack plugins 节点下，配置 add-asset-html-webpack-plugin
const path = require('path')
const webpack = require('webpack')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')

module.exports = {
    ...
    configureWebpack: {
        plugins: [
          new webpack.DllReferencePlugin({
            context: process.cwd(),
            manifest: require('./public/vendor/vendor-manifest.json')
          }),
          // 将 dll 注入到 生成的 html 模板中
          new AddAssetHtmlPlugin({
            // dll文件位置
            filepath: path.resolve(__dirname, './public/vendor/*.js'),
            // dll 引用路径
            publicPath: './vendor',
            // dll最终输出的目录
            outputPath: './vendor'
          })
        ]
    }
}

```


### 多进程构建的方案比较知名的有以下三个
- thread-loader (推荐使用这个)
- HappyPack
- parallel-webpack


`thread-loader`
`webpack4` 官方提供了一个`thread loader`

把这个 `loader` 放置在其他 `loader`之前， 放置在这个 `loader `之后的 loader 就会在一个单独的` worker【worker pool】` 池里运行，一个`worker` 就是一个`nodeJS` 进程`【node.js proces】`，每个单独进程处理时间上限为600ms，各个进程的数据交换也会限制在这个时间内。

`npm i thread-loader -D`
配置长这样：
```js

module.exports = {
  configureWebpack: smp.wrap({
    module: {
      rules: [
        {
          test: /\.js$/,
          include: path.resolve("src"),
          use: [{
            loader: "thread-loader",
            // loaders with equal options will share worker pools
            // 设置同样option的loaders会共享
            options: {
              // worker的数量，默认是cpu核心数
              workers: 2,

              // 一个worker并行的job数量，默认为20
              workerParallelJobs: 50,

              // 添加额外的node js 参数
              workerNodeArgs: ['--max-old-space-size=1024'],

              // 允许重新生成一个dead work pool
              // 这个过程会降低整体编译速度
              // 开发环境应该设置为false

              poolRespawn: false,

              //空闲多少秒后，干掉work 进程
              // 默认是500ms
              // 当处于监听模式下，可以设置为无限大，让worker一直存在
              poolTimeout: 2000,

              // pool 分配给workder的job数量
              // 默认是200
              // 设置的越低效率会更低，但是job分布会更均匀
              poolParallelJobs: 50,

              // name of the pool
              // can be used to create different pools with elsewise identical options
              // pool 的名字
              //
              name: "my-pool"
            }
          },
          // your expensive loader (e.g babel-loader)
        ]}
      ]
    }
  })
}

// 经过测试，thread-loader 对于打包速度几乎没有影响，是因为它本身的额外开销导致，建议只在极高性能消耗的场景下使用
```


### HappyPack
将任务分解给多个子进程去并发执行，子进程处理完后再将结果发给主进程

安装
```sh
npm i happypack -D
```
使用
```js
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

module.exports = {
  configureWebpack: smp.wrap({
    plugins: [
      new HappyPack({
        id: 'babel',
        loaders: ['babel-loader?cacheDirectory=true'],
        threadPool: happyThreadPool
      })
    ]
  }),
  chainWebpack: config => {
		const jsRule = config.module.rule('js');
    jsRule.uses.clear();
    jsRule.use('happypack/loader?id=babel')
      .loader('happypack/loader?id=babel')
      .end();
	}
}
```
经过测试，在我们的项目中，对 js 和 ts 文件使用 `happypack `收益最大
需要注意的是，`Vue-loader` 不支持 `happypack`


### 多进程多实例并行压缩
使用 `parallel-uglify-plugin` 插件
`uglifyjs-webpack-plugin` 开启 `parallel` 参数
`terser-webpack-plugin` 开启 `parallel` 参数 （推荐使用这个，支持 ES6 语法压缩）
`uglifyjs-webpack-plugin`
通过开启 cache 配置开启我们的缓存功能，也可以通过开启 parallel 开启多核编译功能

安装
```js
npm i terser-webpack-plugin -D
```
使用
```js
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  configureWebpack: smp.wrap({
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          uglifyOptions: {
            warnings: false,
            parse: {},
            // 删除console debugger 删除警告
            compress: {
              warnings: false,
              drop_console: true,//console
              drop_debugger: false,
              pure_funcs: ['console.log']//移除console
            },
            mangle: true,
            // 删除注释
            output:{
              comments:false
            },
            toplevel: false,
            nameCache: null,
            ie8: false,
            keep_fnames: false
          },
          cache: true,
          parallel: true
        })
      ]
    }
  })
}
```
### 另外还有一些关于css打包体积的优化

抽离css
安装
`
npm install --save-dev mini-css-extract-plugin
`
使用
```
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css'  // 将css文件统一放入css文件夹
    })
  ]  
}
```
压缩css
安装
`npm install -D optimize-css-assets-webpack-plugin`
使用
```js
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
        new OptimizeCssAssetsWebpackPlugin()
    ]
  }
}
```


### 移除未使用的css
在大型项目中，经常会有很多样式内容，在代码中根本未使用，但是会被打包，这些样式需要打包时应该移除
安装

`npm i purgecss-webpack-plugin -D`

使用

```js
const PurgecssWebpackPlugin = require('purgecss-webpack-plugin');
const glob = require('glob'); // 根据路径查找文件
module.exports = {
  plugins:[
    new PurgecssWebpackPlugin({ //paths要求是绝对路径
      paths: glob.sync(`${path.join(__dirname, 'src/**/*')}`, { nodir: true })
    })
  ]
}
```