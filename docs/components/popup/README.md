# Popup 弹出层

## 介绍

弹出层容器，用于展示弹窗、信息提示等内容

## 引入

在页面中引入组件，详细介绍见[快速上手](quickstart)，如果已经使用 `easycom`模式，可以省略该步骤，直接使用

```js
import IPopup from '@/components/i-ui/i-popup/i-popup'
```

## 代码演示

### 基础用法

通过 `v-model` 控制弹出层是否展示

```html
<i-cell is-link @click="showPopup">展示弹出层</i-cell>

<i-popup v-model="show">内容</i-popup>
```

```js
export default {
  data() {
    return {
      show: false
    }
  },

  methods: {
    showPopup() {
      this.show = true
    }
  }
}
```

### 弹出位置

通过`position`属性设置弹出位置，默认居中弹出，可以设置为`top`、`bottom`、`left`、`right`

```html
<i-popup v-model="show" position="top" :custom-style="{height: '200rpx'}">内容</i-popup>     
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| v-model (value) | 是否显示弹出层 | _boolean_ | `false` | - |
| overlay | 是否显示遮罩层 | _boolean_ | `true` | - |
| position | 弹出位置，可选值为 `top` `bottom` `right` `left` | _string_ | `center` | - |
| duration | 动画时长，单位为毫秒 | _number \| object_ | `300` | - |
| close-on-click-overlay | 是否在点击遮罩层后关闭 | _boolean_ | `true` | - |
| overlay-style | 自定义遮罩层样式 | _string_ | `` | - |
| custom-style | 自定义弹出层样式 | _object_ | - | - |
| custom-class | 弹出层样式类 | _string_ | - | 微信小程序 |

### Events

| 事件名             | 说明             | 参数 |
| ------------------ | ---------------- | ---- |
| @close         | 关闭弹出层时触发 | -    |
| @click-overlay | 点击遮罩层时触发 | -    |
| @before-enter  | 进入前触发       | -    |
| @enter         | 进入中触发       | -    |
| @after-enter   | 进入后触发       | -    |
| @before-leave  | 离开前触发       | -    |
| @leave         | 离开中触发       | -    |
| @after-leave   | 离开后触发       | -    |

