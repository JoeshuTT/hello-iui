# iui - 一个基于 uni-app 的 UI 组件库（兼容NVUE）

## 介绍
iui 是适用于APP，兼容NVUE的UI组件库，非常适合面向app用户的跨端开发。

## 快速体验

- 扫码体验
![发布页二维码](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-joeshu-cloud/41ebc530-edb7-11ea-9dfb-6da8e309e0d8.png)

- 浏览器打开体验
[H5页面快速体验，点击跳转](https://static-386415c0-10b5-4a03-a868-8fb41b9e886e.bspapp.com/#/)

## 设计思路
iui 的组件和
```
└─i-ui
    ├─common
    ├─i-button
    ├─i-cell
    ├─i-col
    ├─i-icon
    ├─i-image
    ├─i-load-more
    ├─i-loading
    ├─i-nav-bar
    ├─i-overlay
    ├─i-popup
    ├─i-row
    ├─i-transition
    ├─mixins
    └─utils
```

## 如何使用

1. 下载组件
仅仅只需要复制本示例源码下的 `/components/iui`，到你的项目根目录，不会对现有项目有任何影响。

2. 关于SCSS
iui 有依赖scss，请务必有安装 `sass`

3. 配置easycom组件模式（无需引用、注册，直接在页面中使用）
在项目根目录下的 `pages.json` 中进行，配置完成后重启HX或者重新编译项目，即可正常使用。
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
## 关于单位
在页面开发中，通常都是一水的使用rpx 单位进行布局的，这是不推荐的，更推荐的做法是只有元素的单位要根据屏幕宽度大小变化时，才需要用rpx。而字体大小是没必要根据屏幕宽度变化。因为屏幕更大是为了显示更多的内容，而不是显示更大，不是吗。

## 开源协议
[MIT](LICENSE) © 2020 Joeshu

