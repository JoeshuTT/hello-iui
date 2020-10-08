# Transition 动画

## 介绍

可用于包裹单个元素，添加过渡动效，与 [vue transition](https://cn.vuejs.org/v2/guide/transitions.html) 类似

## 引入

在页面中引入组件，详细介绍见[快速上手](quickstart)，如果已经使用 `easycom`模式，可以省略该步骤，直接使用

```js
import ITransition from '@/components/i-ui/i-transition/i-transition'
```

## 代码演示

### 基础用法

将元素包裹在 transition 组件内，在元素展示/隐藏时，会有相应的过渡动画

```html
<i-transition :show="show" :custom-style="style"> 内容 </i-transition>
```

### 动画类型

transition 组件内置了多种动画，可以通过`name`字段指定动画类型

```html
<i-transition name="fade-up" />
```

### 高级用法

可以通过添加`class`，添加`anim-config`属性，自定义过渡效果，还可以定制进入和移出的持续时间

> 提示：如果不要求在`app-nvue`上运行，那么直添加自定义动画类`class`即可。

```html
<i-transition
    :show="showCustom"
    name="custom"
    :duration="{ enter: 300, leave: 1000 }"
    :anim-config="customAnimConfig"
    :custom-style="style"
/>
```

```js
export default {
  data() {
    return {
        showCustom: false,
        customAnimConfig: {
            'enter': { opacity: '0', transform: `rotate(-360deg)` },
            'enter-to': { opacity: '1', transform: `rotate(0deg)` },
            'leave': { opacity: '1', transform: `rotate(0deg)` },
            'leave-to': { opacity: '0', transform: `rotate(-360deg)` }
        }
    }
  },

  methods: {
    showPopup() {
      this.show = true
    }
  }
}
```

```css
/* #ifndef APP-NVUE */
.i-custom-enter-active,
.i-custom-leave-active {
    transition-property: opacity, transform;
}

.i-custom-enter,
.i-custom-leave-to {
    opacity: 0;
    transform: rotate(-360deg);
}
/* #endif */
```

## API

### Props

| 参数         | 说明                 | 类型               | 默认值 | 平台差异 |
| ------------ | -------------------- | ------------------ | ------ | ---- |
| name         | 动画类型             | _string_           | `fade` | -    |
| show         | 是否展示组件         | _boolean_          | `true` | -    |
| duration     | 动画时长，单位为毫秒  | _number \| object_ | `300`  | -    |
| animConfig     | 配置动画参数       |  _object_           | `null`  | app-nvue |
| custom-style | 自定义样式           | _string_           | -      | -    |
| custom-class | 根节点样式类 | _string_ | - | 微信小程序 |

### Events

| 事件名            | 说明       | 参数 |
| ----------------- | ---------- | ---- |
| @before-enter | 进入前触发 | -    |
| @enter        | 进入中触发 | -    |
| @after-enter  | 进入后触发 | -    |
| @before-leave | 离开前触发 | -    |
| @leave        | 离开中触发 | -    |
| @after-leave  | 离开后触发 | -    |

### 动画类型

| 名称        | 说明     |
| ----------- | -------- |
| fade        | 淡入     |
| fade-up     | 上滑淡入 |
| fade-down   | 下滑淡入 |
| fade-left   | 左滑淡入 |
| fade-right  | 右滑淡入 |
| slide-up    | 上滑进入 |
| slide-down  | 下滑进入 |
| slide-left  | 左滑进入 |
| slide-right | 右滑进入 |


