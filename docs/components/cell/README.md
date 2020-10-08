# Cell 单元格

## 介绍

常用的菜单列表项，可组成列表

## 引入

在页面中引入组件，详细介绍见[快速上手](quickstart)，如果已经使用 `easycom`模式，可以省略该步骤，直接使用

```js
import ICell from '@/components/i-ui/i-cell/i-cell'
import ICellGroup from '@/components/i-ui/i-cell-group/i-cell-group'
```

## 代码演示

### 基础用法

```html
<i-cell title="单元格" value="内容" />
<i-cell title="单元格" value="内容" label="描述信息" :border="false" />
```

### 展示图标

使用`slot icon`在标题左侧展示图标

```html
<i-cell title="单元格" value="内容">
    <i-icon slot="icon" name="success" color="#323233" />
</i-cell>
```

### 展示箭头

设置`is-link`属性后会在单元格右侧显示箭头，并且可以通过`arrow-direction`属性控制箭头方向

```html
<i-cell title="单元格" is-link />
<i-cell title="单元格" is-link value="内容" />
<i-cell title="单元格" is-link value="内容" arrow-direction="down" />
```

### 分组标题

通过`CellGroup`的`title`属性可以指定分组标题

```html
<i-cell-group title="分组1">
    <i-cell title="单元格" value="内容" />
</i-cell-group>
<i-cell-group title="分组2">
    <i-cell title="单元格" value="内容" />
</i-cell-group>
```

### 使用插槽

如以上用法不能满足你的需求，可以使用插槽来自定义内容

```html
<i-cell title="单元格" value="内容">
    <text slot="title" class="cell-title">单元格</text>
    <text slot="label" class="cell-desc">自定义label</text>
</i-cell>
<i-cell title="单元格">
    <i-icon slot="right-icon" name="fail" />
</i-cell>
```

### 垂直居中

通过`center`属性可以让`Cell`的左右内容都垂直居中

```html
<i-cell center title="单元格" value="内容" label="描述信息" />
```

## API

### CellGroup Props

| 参数   | 说明           | 类型      | 默认值 | 平台差异说明 |
| ------ | -------------- | --------- | ------ | ---- |
| title  | 分组标题       | _string_  | `-`    | -    |
| border | 是否显示外边框 | _boolean_ | `true` | -    |
| custom-style | 自定义样式 | _object_ | - | - |
| custom-class | 根节点样式类 | _string_ | - | 微信小程序 |

### Cell Props

| 参数 | 说明 | 类型 | 默认值 | 平台差异说明 |
| --- | --- | --- | --- | --- |
| title | 左侧标题 | _string \| number_ | - |
| value | 右侧内容 | _string \| number_ | - | - |
| label | 标题下方的描述信息 | _string_ | - | - |
| border | 是否显示下边框 | _boolean_ | `true` | - |
| center | 是否使内容垂直居中 | _boolean_ | `false` | - |
| url | 点击后跳转的链接地址 | _string_ | - | - |
| clickable | 是否开启点击反馈 | _boolean_ | `false` | - |
| is-link | 是否展示右侧箭头并开启点击反馈 | _boolean_ | `false` | - |
| required | 是否显示表单必填星号 | _boolean_ | `false` | - |
| arrow-direction | 箭头方向，可选值为 `left` `up` `down` | _string_ | `arrow` | - |
| custom-style | 自定义样式 | _object_ | - | - |
| custom-class | 根节点样式类 | _string_ | - | 微信小程序 |

### Cell Event

| 事件名     | 说明             | 参数 |
| ---------- | ---------------- | ---- |
| @click | 点击单元格时触发 | -    |

### CellGroup Slots

| 名称    | 说明           |
| ------- | -------------- |
| default | 默认插槽       |
| title   | 自定义分组标题 |

### Cell Slot

| 名称       | 说明                          |
| ---------- | ---------------------|
| default    | 自定义`value`显示内容|
| title      | 自定义`title`显示内容|
| label      | 自定义`label`显示内容        |
| icon       | 自定义`icon`显示内容         |
| right-icon | 自定义右侧按钮，默认是`arrow` |

