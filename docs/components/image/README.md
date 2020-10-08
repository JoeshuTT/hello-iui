# Image 图片

## 介绍

增强版的 image 标签，提供多种图片填充模式，支持图片预加载、加载占位。
在 `app-nvue`下，只是补充了一个图像占位符的功能。

## 引入

在页面中引入组件，详细介绍见[快速上手](quickstart)，如果已经使用 `easycom`模式，可以省略该步骤，直接使用

```js
import IImage from '@/components/i-ui/i-image/i-image'

```

## 代码演示

### 基础用法

```html
<i-image width="100px" height="100px" :src="src" />
```
### 图片显示淡入效果（app-nvue 暂不支持）

```html
<i-image width="100" height="100" fade-show :src="src" />
```

### 填充模式

通过`mode`属性可以设置图片填充模式，可选值同[image](https://uniapp.dcloud.io/component/image)一致

```html
<i-image width="100" height="100" :src="src" mode="aspectFill" />
```

### 圆形图片

通过`round`属性可以设置图片变圆，注意当图片宽高不相等且`mode`为`aspectFit`，`heightFix`,`widthFix`时，将无法填充一个完整的圆形。

```html
<i-image width="100" height="100" round :src="src" />
```

### 图片预加载（推荐）

这是组件的特别设计，不可关闭，每个`i-iamge`内部都会有一个隐藏的image元素来加载原图，待原图加载完成后再转移到真实节点上渲染，拥有更好的视觉体验。

```html
<i-image width="100" height="100" lazy-load :src="src" />
```

### 图片懒加载

图片懒加载，在即将进入一定范围（上下三屏）时才开始加载

```html
<i-image width="100" height="100" lazy-load :src="src" />
```

### 加载中提示

`Image`组件提供了默认的加载中提示，支持通过`loading`插槽自定义内容

```html
<i-image>
    <i-icon slot="loading" name="photo-o" size="24" />
</i-image>
```

### 加载失败提示

`Image`组件提供了默认的加载失败提示，支持通过`error`插槽自定义内容

```html
<i-image>
    <i-icon slot="error" name="warning-o" size="24" />
</i-image>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 平台差异说明 |
| --- | --- | --- | --- | --- |
| src | 图片链接 | _string_ | - | - |
| mode | 图片填充模式 | _string_ | _fill_ | - |
| width | 宽度，默认单位为`rpx` | _string \| number_ | - | - |
| height | 高度，默认单位为`rpx` | _string \| number_ | - | - |
| radius | 圆角大小，默认单位为`px` | _string \| number_ | `0` | - |
| round | 是否显示为圆形 | _boolean_ | `false` | - |
| lazy-load | 是否懒加载 | _boolean_ | `false` | - |
| show-error | 是否展示图片加载失败提示 | _boolean_ | `true` | - |
| show-loading | 是否展示图片加载中提示 | _boolean_ | `true` | - |
| show-menu-by-longpress | 是否开启长按图片显示识别小程序码菜单 | _boolean_ | `false` | 微信小程序 |
| custom-style | 自定义样式 | _object_ | - | - |
| custom-class | 根节点样式类 | _string_ | - | 微信小程序 |

### Events

| 事件名 | 说明               | 回调参数     |
| ------ | ------------------ | ------------ |
| click  | 点击图片时触发     | event: Event |
| load   | 图片加载完毕时触发 | event: Event |
| error  | 图片加载失败时触发 | event: Event |

### Slots

| 名称    | 说明                       |
| ------- | -------------------------- |
| loading | 自定义加载中的提示内容     |
| error   | 自定义加载失败时的提示内容 |


