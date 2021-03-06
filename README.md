# iui - 一个基于 uni-app 的高质量 UI 组件库（兼容 NVUE）

## 介绍

`iui` 是一款基于 uni-app，面向移动端，兼顾 NVUE 的 UI 组件库，适用于跨端开发。

## iui 是怎么来的？

> 来自一枚强迫症患者 Front-end Coder 的产物

由个人开发者维护，对 `Vant` 组件库的致敬之作

## 特性

- 极简、轻便、灵活
- 高质量代码，源码易读，可扩，可学
- 上手简单，Vant 组件接口
- 优雅美观，Vant 设计体系

## 支持平台

| app | H5  | 微信小程序 |
| --- | --- | ---------- |
| √   | √   | √          |

提示：其他平台的适配测试工作暂无打算。

## 如何设计一个前端通用组件

组件的形态(DOM 结构)永远是千变万化的，但是其行为(逻辑)是固定的，因此通用组件的秘诀之一
就是将 DOM 结构的控制权交给开发者，组件只负责行为和最基本的 DOM 结构。

将这句话放在末尾，也是为了着重强调，`iui` 是遵循该原则去设计的。

## 👀 预览

[Hello Iui 演示示例发布页面，点击跳转](https://dev.dcloud.net.cn/publish/app/preview?id=helloiui)

记得帮我点个 [start !important](https://github.com/JoeshuTT/hello-iui)，鼓励鼓励我这个切图仔

[使用文档在此，传送门](https://static-386415c0-10b5-4a03-a868-8fb41b9e886e.bspapp.com/docs/)

## 🚀 快速上手

1. 下载组件库

仅仅只需要将示例工程下的 `@/components/iui/`，拷贝到你的项目`@/components/`下，对你的项目没有任何侵入性。
如果项目有用到 `easycom` 模式（会按需打包，自动剔除没有使用的组件），可以跳过引入，注册步骤，直接在页面中使用就好啦。

```vue
// 代码演示
<template>
  <view class="container">
    <i-button type="default" text="默认按钮" />
  </view>
</template>

<script>
// 引入
import IButton from '@/components/i-ui/i-button/i-button.vue'

export default {
  // 注册
  components: {
    IButton,
  },
  // 其他代码...
}
</script>
```

2. 关于 SCSS

iui 有依赖 scss，请务必安装相关依赖项

3. 配置 easycom 组件模式（无需引用、注册，即可直接在页面中使用）

在项目根目录下的 `pages.json` 中进行配置，完成后重启 HX 或者重新编译项目，即可正常使用。

```json
// pages.json
"easycom": {
    "autoscan": true,
    "custom": {
        "^uni-(.*)": "@/components/uni-ui/uni-$1/uni-$1.vue",
        "^i-(.*)": "@/components/i-ui/i-$1/i-$1.vue"
    }
}
```

## 致谢

iui 的组件设计有参考了 uni-ui，vant-ui，weex-ui，感谢开源！

## 开源协议

本项目基于 [MIT](https://zh.wikipedia.org/wiki/MIT%E8%A8%B1%E5%8F%AF%E8%AD%89) 协议，请自由地享受和参与开源
