# iui - 一个基于 uni-app 的 UI 组件库（兼容NVUE）

## 介绍
iui 是适用于APP，兼容NVUE的UI组件库，非常适合面向app用户的跨端开发。

## 快速体验

[Hello Iui 演示示例发布页面，点击跳转](https://dev.dcloud.net.cn/publish/app/preview?id=helloiui)

记得帮我点点 [start](https://github.com/JoeshuTT/hello-iui)，鼓励鼓励我这个切图仔

## 快速上手

1. 下载组件库

仅仅只需要拷贝下示例源码根目录下的 `/components/iui`，到你的项目`/components`，不会对现有项目有任何影响。

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

iui 有依赖scss，请务必有安装 `sass`

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
...
```
## 设计思路

iui 的组件设计基本参考了uni-app官方组件库，vant-ui，weexui的实现，尽可能的保持各平台特色，力求打造高性能，高质量的组件库，上手简单，易于使用的目标。

## 后续强制遵循规范

- 语义化版本号，规范参考 [Semantic Versioning 2.0.0](https://semver.org/lang/zh-CN/)。
- Git 提交信息规范化，[git-commit-emoji-cn](https://github.com/liuchengxu/git-commit-emoji-cn)。
- 统一代码风格，[ESLint](https://panjiachen.gitee.io/vue-element-admin-site/zh/guide/advanced/eslint.html#%E9%85%8D%E7%BD%AE%E9%A1%B9)

## 如何设计一个前端通用组件

> 在一篇文章看到的，至于出处就不知道了

组件的形态(DOM结构)永远是千变万化的,但是其行为(逻辑)是固定的,因此通用组件的秘诀之一
就是将 DOM 结构的控制权交给开发者,组件只负责行为和最基本的 DOM 结构。

## 关于单位

在页面开发中，通常都是一水的使用rpx 单位进行布局的，这是不推荐的，更推荐的做法是
只有元素的单位要根据屏幕宽度大小变化时，才需要用rpx。而字体大小是没必要根据屏幕宽度变化。
因为屏幕更大是为了显示更多的内容，而不是显示更大，不是吗。


## 开源协议

[MIT](LICENSE) © 2020 Joeshu

