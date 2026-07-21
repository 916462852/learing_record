---
title: 浅谈npm、yarn、pnpm的区别
date: 2023-05-24 21:58:50
permalink: /pages/8eb816/
categories:
  - 全部分类
  - 版本控制
tags:
  - 版本控制
author: 
  name: GleenLey
  link: https://gitee.com/Gleenley
---

# 浅谈npm yarn pnpm的区别

## 一. 概述


> `npm`、`yarn`和`pnpm`都是`JavaScript`包管理器,用于管理和安装`JavaScript包`和`依赖项`。虽然它们的目的相同，但它们之间存在一些区别。

<!-- more -->

### 二. npm、yarn、pnpm 的区别

### npm

`npm`是最早的`JavaScript`包管理器之一，它是`Node.js`的默认包管理器。它使用`package.json`文件来管理依赖项和版本控制，并提供了一些命令行工具来安装、升级和删除包。

*   如何使用npm：
    
    1.  安装npm:在安装`Node.js`时，`npm`会自动安装。如果需要单独安装`npm`，可以使用以下命令：
    
    ```js
    npm install npm -g
    ```
    
    2.  创建`package.json`文件：在项目根目录下运行以下命令，可以创建一个`package.json`文件，用于管理依赖项和版本控制。
    
    ```js
    npm init
    ```
    
    3.  安装包：要安装一个包，可以使用以下命令：
    
    ```js
    npm install <package-name>
    ```
    
    4.  升级包：要升级一个包，可以使用以下命令：
    
    ```js
    npm update <package-name>
    ```
    
    5.  删除包：要删除一个包，可以使用以下命令：
    
    ```js
    npm uninstall <package-name>
    ```
    
*   npm的优缺点：
    *   优点
        1.  广泛使用和社区支持：`npm`是最早最早的`JavaScript`包管理器之一，拥有广泛的用户支持和社区支持。
        2.  与`Node.js`的紧密集成：`npm`是`Node.js`的默认包管理器，与`Node.js`的集成非常紧密。
        3.  简单易用：`npm`提供了一些简单易用的命令行工具，使得安装、升级和删除包非常方便。
    *   缺点
        1.  速度较慢：`npm`在安装大型依赖项时速度较慢，这可能会影响开发效率。
        2.  安全性问题：`npm`的包管理机制存在一些安全性问题，可以导致恶意包的安装和使用。
*   总的来说，`npm`是一种广泛使用和社区支持的`JavaScript`包管理器，具有简单易用的命令行工具和与`Node.js`的紧密集成。但是，它的速度较慢，存在安全性和版本控制问题。

### yarn

`yarn`是由`Facebook`开发的`JavaScript`包管理器，旨在解决`npm`的一些问题。它使用`yarn.lock`文件来管理依赖项和版本控制，并提供了一些命令行工具来安装、升级和删除包。

*   如何使用yarn：
    
    1.  安装yarn：可以使用以下命令：
    
    ```js
    npm install -g yarn
    ```
    
    2.  创建`package.json`文件：在项目根目录下运行以下命令，可以创建一个`package.json`文件，用于管理依赖项和版本控制：
    
    ```js
    yarn init
    ```
    
    3.  安装包：要安装一个包，可以使用以下命令：
    
    ```js
    yarn add <package-name>
    ```
    
    4.  升级包：要升级一个包，可以使用以下命令：
    
    ```js
    yarn upgrade <package-name>
    ```
    
    6.  删除包：要删除一个包，可以使用以下命令：
    
    ```js
    yarn remove <package-name>
    ```
    
*   yarn的优缺点：
    *   优点：
        1.  速度快：`yarn`在安装大型依赖性时速度比`npm`快得多，这可以提高开发效率。
        2.  安全性高：`yarn`的包管理机制更加安全，可以避免恶意包的安装和使用。
        3.  版本控制更好：`yarn`的版本控制机制更加灵活，可以避免依赖项冲突和版本不一致的问题。
    *   缺点：
        1.  社区支持相对较少：相对`npm`,`yarn`的用户和社区支持相对较少。
        2.  与`Node.js`不够紧密：`yarn`与`Node.js`的集成不如`npm`紧密
*   总的来说，`yarn`是一种速度快、安全性高、版本控制更好的`JavaScript`包管理器。但是，它的社区支持相对较少，与`Node.js`的集成不够紧密。

### pnpm

`pnpm`是另一个`JavaScript`包管理器，它的目标是`减少磁盘空间`和`网络带宽的使用`。它使用`硬链接`和`符号链接`来共享依赖项，并提供了一些命令行工具来安装、升级和删除包。

*   如何使用pnpm:
    
    1.  安装pnpm：可以使用以下命令：
    
    ```js
    npm install -g pnpm
    ```
    
    2.  创建`package.json`文件：在项目根目录下运行以下命令，可以创建一个`package.json`文件，用于管理依赖项和版本控制：
    
    ```js
    pnpm init
    ```
    
    3.  安装包：要安装一个包，可以使用以下命令：
    
    ```js
    pnpm add <package-name>
    ```
    
    4.  升级包：要升级一个包，可以使用以下命令：
    
    ```js
    pnpm update <package-name>
    ```
    
    6.  删除包：要删除一个包，可以使用以下命令：
    
    ```js
    pnpm remove <package-name>
    ```
    
*   pnpm的优缺点：
    *   优点：
        1.  速度快：`pnpm`在安装大型依赖项时速度比`npm`和`yarn`都快，这可以提高开发效率。
        2.  空间占用小：`pnpm`的包管理机制可以避免重复安装依赖项，从而减少磁盘空间的占用。
        3.  版本控制更好：`pnpm`的版本控制机制更加灵活，可以避免依赖项冲突和版本不一致的问题。
        4.  支持多项目共享依赖项：`pnpm`支持多个项目共享同一份依赖项，从而减少磁盘空间的占用。
    *   缺点：
        1.  社区支持相对较少：相对于`npm`和`yarn`，`pnpm`的用户和社区支持相对较少。
        2.  与`Node.js`的集成不够紧密：`pnpm`与`Node.js`的集成不如`npm`紧密。
*   总的来说，`pnpm`是一种速度快、空间占用小、版本控制更好、支持多项目共享依赖项的`JavaScript`包管理器。但是，它的社区支持相对较少，与`Node.js`的集成不够紧密。

  

