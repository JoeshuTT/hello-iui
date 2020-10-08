# 快速上手

### 背景知识

在开始使用 `iui` 之前你需要先阅读 [uni-app](https://uniapp.dcloud.io/README)，了解 [weex](https://weex.apache.org/cn/guide/) 、[微信小程序](https://developers.weixin.qq.com/miniprogram/dev/framework/) 相关知识，这是基础。

## 安装

### 下载源码（推荐）

仅仅只需要将示例工程下的 `@/components/iui/`，拷贝到你的项目`@/components/`下，对你的项目没有任何侵入性。

然后在按照下面的方式使用组件，以 Button 为例。

## 使用
### `easycom` 方式（推荐）

```vue
<template>
    <view class="container">
        <i-button type="default">默认按钮</i-button>
    </view>
</template>

<script>
    // 这里不用import引入，也不需要在components内注册i-button组件。template里就可以直接用
    export default {
        data() {
            return {

            }
        }
    }
</script>
```

配置方法如下

在项目根目录下的 `pages.json` 中进行配置，完成后重启HX或者重新编译项目，即可正常使用。

```json
// pages.json
"easycom": {
    "autoscan": true,
    "custom": {
        "uni-(.*)": "@/components/uni-ui/uni-$1/uni-$1.vue",
        "i-(.*)": "@/components/i-ui/i-$1/i-$1.vue"
    }
}
```

[想要了解更多easycom知识点](https://uniapp.dcloud.io/collocation/pages?id=easycom)

### 手动按需引入

```vue
<template>
    <view class="container">
        <i-button type="default">默认按钮</i-button>
    </view>
</template>

<script> 
    import IButton from '@/components/i-ui/i-button/i-button'
    export default {
        components: {
            IButton
        },
        data() {
            return {

            }
        }
    }
</script>
```

泻药。
