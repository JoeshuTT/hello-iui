# Layout 布局

## 介绍

Layout 提供了`i-row`和`i-col`两个组件来进行行列布局

## 引入

在页面中引入组件，详细介绍见[快速上手](quickstart)，如果已经使用 `easycom`模式，可以省略该步骤，直接使用

```js
import IRow from '@/components/i-ui/i-row/i-row'
import ICol from '@/components/i-ui/i-col/i-col'

```

## 代码演示

### 基本用法

Layout 组件提供了`24列栅格`，通过在`Col`上添加`span`属性设置列所占的宽度百分比

```html
<i-row>
  <i-col span="8">span: 8</i-col>
  <i-col span="8">span: 8</i-col>
  <i-col span="8">span: 8</i-col>
</i-row>

```

### 设置列元素间距

通过`gutter`属性可以设置列元素之间的间距，默认间距为 0

```html
<i-row gutter="20">
  <i-col span="8">span: 8</i-col>
  <i-col span="8">span: 8</i-col>
  <i-col span="8">span: 8</i-col>
</i-row>
```

### 只使用 Flex 布局

通过设置 `justify`和`align` 属性，可以进行灵活对齐布局

```html
<!-- 左对齐 -->
<i-row>
    <i-col span="6">span: 6</i-col>
    <i-col span="6">span: 6</i-col>
    <i-col span="6">span: 6</i-col>
</i-row>

<!-- 居中 -->
<i-row justify="center">
    <i-col span="6">span: 6</i-col>
    <i-col span="6">span: 6</i-col>
    <i-col span="6">span: 6</i-col>
</i-row>

<!-- 右对齐 -->
<i-row justify="end">
    <i-col span="6">span: 6</i-col>
    <i-col span="6">span: 6</i-col>
    <i-col span="6">span: 6</i-col>
</i-row>

<!-- 两端对齐 -->
<i-row justify="space-between">
    <i-col span="6">span: 6</i-col>
    <i-col span="6">span: 6</i-col>
    <i-col span="6">span: 6</i-col>
</i-row>

<!-- 每个元素的两侧间隔相等 -->
<i-row type="flex" justify="space-around">
  <i-col span="6">span: 6</i-col>
  <i-col span="6">span: 6</i-col>
  <i-col span="6">span: 6</i-col>
</i-row>
```

## 常见问题

### 在`app-nvue`页面首次加载中，有发现布局组件会出现明显抖动过程，低端Android机器尤其明显？

在 `app-nvue` 平台上是不支持百分比作为单位，所以这里的组件实现过程是，先查询父DOM元素宽度，然后再根据 `span`占比计算得出每个 `col` 实际宽度，最后再写入style的操作，有一定的异步延时。
所以更推荐使用[内置样式](components/styles/)提供的 `sass mxins`来辅助布局，全平台可用，更灵活。

## API

### Row Props

| 参数   | 说明                          | 类型               | 默认值 | 平台差异说明 |
| ------ | ----------------------------- | ------------------ | ------ | ---- |
| gutter | 列元素之间的间距（单位为 px） | _string \| number_ | -      | -    |
| justify | Flex 主轴对齐方式，可选值为 `end` `center` <br> `space-around` `space-between` | _string_ | `start` |
| align | Flex 交叉轴对齐方式，可选值为 `center` `bottom` | _string_ | `top` |
| custom-style | 自定义样式 | _object_ | - | - |
| custom-class | 根节点样式类 | _string_ | - | 微信小程序 |

### Col Props

| 参数   | 说明           | 类型               | 默认值 | 平台差异说明 |
| ------ | -------------- | ------------------ | ------ | ---- |
| span   | 列元素宽度     | _string \| number_ | -      | -    |
| offset | 列元素偏移距离 | _string \| number_ | -      | -    |
| custom-style | 自定义样式 | _object_ | - | - |
| custom-class | 根节点样式类 | _string_ | - | 微信小程序 |

### Row Events

| 事件名 | 说明       | 回调参数       |
| ------ | ---------- | -------------- |
| click  | 点击时触发 | _event: Event_ |

### Col Events

| 事件名 | 说明       | 回调参数       |
| ------ | ---------- | -------------- |
| click  | 点击时触发 | _event: Event_ |
