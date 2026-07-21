/*
 * @Author: xiang<https://gitee.com/lxlxlxlxxl>
 * @Date: 2023-4-18 15:27:18
 * @LastEditors: xiang<https://gitee.com/lxlxlxlxxl>
 * @LastEditTime: 2023-05-20 11:36:50
 */

const { getChildren } = require("./slidebar.js");
let sidebar = {};
/**
 * */
sidebar = {//左侧列表
    '/pages/': [
        {
            // title: 'pages',
            collapsable: false,//展开状态
            sidebarDepth: 2,
            children: getChildren('./docs', 'pages')
        }
    ],
    '/': [''] //不能放在数组第一个，否则会导致右侧栏无法使用
};
module.exports = sidebar;