# iui - 一个基于 uni-app 的 UI 组件库（兼容NVUE）

## 介绍
iui 是适用于APP，兼容NVUE的UI组件库，非常适合面向app用户的跨端开发。

## 快速体验
截图

## 设计思路
iui 的组件设计基本参考了uni-app官方组件库，vant-ui，weexui的实现，尽可能的保持各平台特色，力求打造高性能，高质量的组件库，上手简单，易于使用的目标。

## 如何使用

1. 下载组件库  
仅仅只需要拷贝下示例源码根目录下的 `/components/iui`，到你的项目`/components`，不会对现有项目有任何影响。
![代码演示](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-joeshu-cloud/f8382d10-ec63-11ea-81ea-f115fe74321c.png)

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
在页面开发中，通常都是一水的使用rpx 单位进行布局的，这是不推荐的，更推荐的做法是
只有元素的单位要根据屏幕宽度大小变化时，才需要用rpx。而字体大小是没必要根据屏幕宽度变化。
因为屏幕更大是为了显示更多的内容，而不是显示更大，不是吗。


## 开源协议  
[MIT](LICENSE) © 2020 Joeshu

