/*
 * @Author: Gleenley<https://gitee.com/Gleenley>
 * @Date: 2023-4-18 15:27:18
 * @LastEditors: Gleenley<https://gitee.com/Gleenley>
 * @LastEditTime: 2023-05-20 11:36:50
 */

const sidebarConfig =  require("./sidebarConfig.js");
const isProd = process.env.NODE_ENV === 'production';
const base = isProd ? '/learing_record/' : '/';
module.exports = {
    host: '127.0.0.1',
    port: 8532,
    base,
    title: `Xiang's Blog`, // 显示在左上角的网页名称以及首页在浏览器标签显示的title名称
    description: '保持热爱 真理无限 一步一个脚印', // meta 中的描述文字，用于SEO
    // 注入到当前页面的 HTML <head> 中的标签
    head: [
        ['link', { rel: 'icon', href: `${base}images/user.avif` }], //浏览器的标签栏的网页图标
        ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }],
        // 禁用缩放
    ],
    theme: 'vdoing',
    markdown: {
        lineNumbers: true,
        // toc: { includeLevel: [2, 3, 4] },
        extractHeaders: ['h1', 'h2', 'h3', 'h4']
    },
    // 监听文件变化并重新构建
    extraWatchFiles: [
        '.vuepress/config.js',
    ],
    serviceWorker: true,
    themeConfig: {
        // 导航栏配置
        navbar: true, // 开启导航
        searchMaxSuggestions: 100, // 搜索结果显示最大数
        // sidebar: 'auto', // 自动生成侧边栏
        sidebarDepth: 2, // 侧边栏显示2级
        // logo: '/images/user.jpeg',
        lastUpdated: '最近更新',
        nav: [
            // 普通链接
            { text: '首页', link: '/' },
            { text: '前端基础', link: '/pages/javaScript/01 什么是变量提升' },
            { text: '浏览器工作原理与实践', link: '/pages/浏览器工作原理与实战/01 简述 http 的缓存机制' },
            { text: '前端部署', link: '/pages/nginx/基础配置.md' },
            // 下拉列表
            {
                text: '工具箱',
                // ariaLabel: '',
                items: [
                    { text: '开发者武器库', link: 'https://devtool.tech/' },
                    { text: 'Astexplorer', link: 'https://astexplorer.net/' },
                    { text: '万能文档', link: 'https://devdocs.io/' },
                    { text: '代码生成', link: 'https://code.fun/' },
                    { text: 'Vue SFC Playground', link: 'https://play.vuejs.org/' },
                    { text: 'sandbox', link: 'https://codesandbox.io/p/sandbox' },
                    { text: 'typescriptlang', link: 'https://www.typescriptlang.org/play' },
                    { text: 'regexper', link: 'https://regexper.com/' },
                    { text: 'codepen', link: 'https://codepen.io/pen' },
                ],
            },
            { text: '稀土掘金', link: 'https://juejin.cn/user/659362706097693/posts' }
        ],
        editLinkText: '帮助我们改善此页面！',
        smoothScroll: true, //页面滚动
        sidebar: sidebarConfig,
        // 博主信息 (显示在首页侧边栏)
        // sidebar: 'structuring',
       
        blogger: {
            // avatar: '/learing_record/images/user.avif',
            avatar: `${base}images/user.avif`,
            // name: `Xiang's Blog`,
            // slogan: '保持热爱 真理无限 一步一个脚印',
        },
        editLinks: true, // 启用编辑
        editLinkText: '编辑',
        //*** 以下是Vdoing主题相关配置，文档：https://doc.xugaoyi.com/pages/a20ce8/ ***//
        pageStyle: 'card',
        // category: false, // 是否打开分类功能，默认true
        // tag: false, // 是否打开标签功能，默认true
        // archive: false, // 是否打开归档功能，默认true
        // categoryText: '随笔', // 碎片化文章（_posts文件夹的文章）预设生成的分类值，默认'随笔'

        // pageStyle: 'line', // 页面风格，可选值：'card'卡片 | 'line' 线（未设置bodyBgImg时才生效）， 默认'card'。 说明：card时背景显示灰色衬托出卡片样式，line时背景显示纯色，并且部分模块带线条边框
        // bodyBgImg: [
        //   'https://fastly.jsdelivr.net/gh/xugaoyi/image_store/blog/20200507175828.jpeg',
        //   'https://fastly.jsdelivr.net/gh/xugaoyi/image_store/blog/20200507175845.jpeg',
        //   'https://fastly.jsdelivr.net/gh/xugaoyi/image_store/blog/20200507175846.jpeg'
        // ], // body背景大图，默认无。 单张图片 String | 多张图片 Array, 多张图片时隔bodyBgImgInterval切换一张。
        // bodyBgImgOpacity: 0.5, // body背景图透明度，选值 0.1~1.0, 默认0.5
        // bodyBgImgInterval: 15, // body多张背景图时的切换间隔, 默认15，单位s
        // titleBadge: false, // 文章标题前的图标是否显示，默认true
        // titleBadgeIcons: [ // 文章标题前图标的地址，默认主题内置图标
        //   '图标地址1',
        //   '图标地址2'
        // ],
        // contentBgStyle: 1, // 文章内容块的背景风格，默认无. 1 方格 | 2 横线 | 3 竖线 | 4 左斜线 | 5 右斜线 | 6 点状
        // updateBar: { // 最近更新栏
        //   showToArticle: true, // 显示到文章页底部，默认true
        //   moreArticle: '/archives' // “更多文章”跳转的页面，默认'/archives'
        // },
        // rightMenuBar: false, // 是否显示右侧文章大纲栏，默认true (屏宽小于1300px下无论如何都不显示)
        // sidebarOpen: false, // 初始状态是否打开左侧边栏，默认true
        // pageButton: false, // 是否显示快捷翻页按钮，默认true

        // 默认外观模式（用户未在页面手动修改过模式时才生效，否则以用户设置的模式为准），可选：'auto' | 'light' | 'dark' | 'read'，默认'auto'。
        // defaultMode: 'auto',

        // 侧边栏  'structuring' | { mode: 'structuring', collapsable: Boolean} | 'auto' | <自定义>    温馨提示：目录页数据依赖于结构化的侧边栏数据，如果你不设置为'structuring',将无法使用目录页
        // 页脚信息
        footer: {
            // createYear: 2023, // 博客创建年份
            copyrightInfo: 'present GleenLey', // 博客版权信息、备案信息等，支持a标签或换行标签</br>
        },
        extendFrontmatter: {
            author: {
                name: 'GleenLey',
                link: 'https://gitee.com/Gleenley'
            }
        },
    },
    // 扩展自动生成frontmatter。（当md文件的frontmatter不存在相应的字段时将自动添加。不会覆盖已有的数据。）
    author: {
        name: `Xiang's Blog`,
        link: 'https://gitee.com/Gleenley'
    },
    plugins: [
        [
            'thirdparty-search',
            {
                thirdparty: [
                    {
                        title: '在MDN中搜索',
                        frontUrl: 'https://developer.mozilla.org/zh-CN/search?q=', // 搜索链接的前面部分
                        behindUrl: '', // 搜索链接的后面部分，可选，默认 ''
                    },
                    {
                        title: '在Vue API中搜索',
                        frontUrl: 'https://cn.vuejs.org/v2/api/#',
                    },
                    {
                        title: '在Bing中搜索',
                        frontUrl: 'https://cn.bing.com/search?q=',
                    },
                ],
            }
        ],
        [
            'one-click-copy', // 代码块复制按钮
            {
                copySelector: ['div[class*="language-"] pre', 'div[class*="aside-code"] aside'], // String or Array
                copyMessage: '复制成功', // default is 'Copy successfully and then paste it for use.'
                duration: 1000, // prompt message display time.
                showInMobile: false, // whether to display on the mobile side, default: false.
            },
        ],
        [
            //彩带背景 
            "ribbon",
            {
                size: 90,     // width of the ribbon, default: 90
                opacity: 0.8, // opacity of the ribbon, default: 0.3
                zIndex: -1    // z-index property of the background, default: -1
            }
        ],
        [
            //图片放大插件 
            '@vuepress/plugin-medium-zoom', {
                selector: '.page img',
                delay: 1000,
                options: {
                    margin: 24,
                    background: 'rgba(25,18,25,0.9)',
                    scrollOffset: 40
                }
            }
        ],
        //鼠标点击特效 
        "vuepress-plugin-cursor-effects",
        {
            size: 3,                    // size of the particle, default: 2
            shape: ['circle'],  // shape of the particle, default: 'star'
            zIndex: 999999999           // z-index property of the canvas, default: 999999999
        },
        // 全局搜索
        // ['flexsearch-pro'],
    ]
}
