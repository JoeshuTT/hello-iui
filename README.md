# iui - 一个基于 uni-app 的 UI 组件库（兼容NVUE）

## 介绍

`iui` 是一款基于uni-app，面向移动端，兼顾NVUE的UI组件库，适用于跨端开发。

目标

- 打造高性能表现，高质量代码的组件库
- 完成上手简单，易于使用的目标 
- 在不牺牲各平台特色的情况下，处理跨端

## 预览

[Hello Iui 演示示例发布页面，点击跳转](https://dev.dcloud.net.cn/publish/app/preview?id=helloiui)

记得帮我点个 [start !important](https://github.com/JoeshuTT/hello-iui)，鼓励鼓励我这个切图仔

[文档在此，传送门](https://static-386415c0-10b5-4a03-a868-8fb41b9e886e.bspapp.com/docs/)

## 支持平台

app | H5 | 微信小程序
---|---|---
√  | √ | √

提示：其他平台的适配工作暂无打算。


## 快速上手

> 请注意，由于部分演示页面有用到npm包，在运行示例项目工程前，请先执行下 `npm i`。

1. 下载组件库

仅仅只需要将示例工程下的 `@/components/iui/`，拷贝到你的项目`@/components/`下，对你的项目没有任何侵入性。

```
// 代码演示
<template>
    <view class="container">
        <i-button type="default">默认按钮</i-button>
    </view>
</template>

<script>
// 引入
import IButton  from '@/components/i-ui/i-button/i-button.vue'

export default {
    // 注册
    components: {
        IButton,
    }
    // 其他代码...
}
</script>
```

2. 关于SCSS

iui 有依赖scss，请务必安装相关依赖项

3. 配置easycom组件模式（无需引用、注册，即可直接在页面中使用）

在项目根目录下的 `pages.json` 中进行配置，完成后重启HX或者重新编译项目，即可正常使用。

```
// pages.json
"easycom": {
    "autoscan": true,
    "custom": {
        "uni-(.*)": "@/components/uni-ui/uni-$1/uni-$1.vue",
        "i-(.*)": "@/components/i-ui/i-$1/i-$1.vue"
    }
}
```

## 项目目录结构

```
├── common/             # 公共文件目录
├── public/             # 静态资源文件目录
│ ├── components/       # 组件目录
│ │ ├── iui/            # iui组件库
│ │ ├── ...             # 其他业务组件
├── config/             # 项目配置目录
├── docs/               # 组件库文档目录
├── mixins/             # 项目mixins目录
├── pages/              # 页面组件目录
├── static/             # 静态资源文件目录
├── styles/             # 项目样式目录
├── unpackage/          # 项目打包后输出目录
├── .editorconfig       # 编辑器配置
├── .eslintignore       # ESlint忽略文件配置
├── .eslintrc.js        # ESlint配置
├── .gitignore          # Git忽略文件配置
├── batch.js            # 批量互转文件后缀名脚本
├── App.vue             # 项目主组件
├── main.js             # 项目入口文件
├── manifest.json       # 项目应用配置
├── package.json        # 项目包管理
├── pages.json          # 项目页面配置
├── uni.scss            # uni-app内置的`scss`
├── vue.config.js       # vuecli配置

```
## 设计思路借鉴

iui 的组件设计基本参考了uni-app官方组件库，vant-ui，weexui的实现，尽可能的保持各平台特色，力求打造高性能，高质量的组件库，上手简单，易于使用的目标。

## 如何设计一个前端通用组件

> 在一篇文章看到的，至于出处就不知道了

组件的形态(DOM结构)永远是千变万化的,但是其行为(逻辑)是固定的,因此通用组件的秘诀之一
就是将 DOM 结构的控制权交给开发者,组件只负责行为和最基本的 DOM 结构。

## 开源协议

本项目基于 [MIT](https://zh.wikipedia.org/wiki/MIT%E8%A8%B1%E5%8F%AF%E8%AD%89) 协议，请自由地享受和参与开源

