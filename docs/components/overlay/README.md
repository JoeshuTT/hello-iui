# Overlay 遮罩层

## 介绍

创建一个遮罩层，用于强调特定的页面元素，并阻止用户进行其他操作

## 引入

在页面中引入组件，详细介绍见[快速上手](quickstart)，如果已经使用 `easycom`模式，可以省略该步骤，直接使用

```js
import IOverlay from '@/components/i-ui/i-overlay/i-overlay'

```

## 代码演示

### 基础用法

```html
<i-button type="primary" text="显示遮罩层" @click="show = true" />
<i-overlay :show="show" @click="onMaskToggle" />
```

```js
export default {
  data() {
    return {
        show: false
    }
  },

  methods: {
    onMaskToggle() {
      this.show = !this.show
    }
  }
}
```

### 嵌入内容

通过默认插槽可以在遮罩层上嵌入任意内容

```html
<i-button type="primary" text="嵌入内容" @click="show = true" />
<i-overlay :show="show" @click="onMaskToggle" >
    <view class="block">
        <text class="blokc-txt">111</text>
    </view>
</i-overlay>
```

```js
export default {
  data() {
    return {
        show: false
    }
  },

  methods: {
    onMaskToggle() {
      this.show = !this.show
    }
  }
}
```

```scss
.block {
    width: 300rpx;
    height: 300rpx;
    background-color: #fff;
    &-txt {
        color: #666;
        font-size: 16px;
    }
}
```

### Props

| 参数         | 说明             | 类型               | 默认值  | 平台差异说明 |
| ------------ | ---------------- | ------------------ | ------- | ---- |
| show         | 是否展示遮罩层   | _boolean_          | `false` | -    |
| duration     | 动画时长，单位毫秒 | _string \| number_ | `333`   | -    |
| custom-style | 自定义样式       | _string_           | -       | -    |
| custom-class | 根节点样式类 | _string_ | - | 微信小程序 |

### Events

| 事件名     | 说明       | 回调参数 |
| ---------- | ---------- | -------- |
| @click | 点击时触发 | -        |

### Slots

| 名称 | 说明                               |
| ---- | ---------------------------------- |
| default    | 默认插槽，用于在遮罩层上方嵌入内容 |
