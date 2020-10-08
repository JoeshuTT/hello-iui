# Page 页面容器

## 介绍

用于承载页面元素的底层组件，内置了加载状态提示，断网提示，重载页面操作。

## 引入

在页面中引入组件，详细介绍见[快速上手](quickstart)，如果已经使用 `easycom`模式，可以省略该步骤，直接使用

```js
import IPage from '@/components/i-ui/i-page/i-page'

```

## 代码演示

### 基础用法

`i-page` 下只允许放置一个根元素

```html
<i-page>
    <view class="container">页面主体</view>
</i-page>
```
 
## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 平台差异说明 |
| --- | --- | --- | --- | --- |
| status | 状态，可选值为 `success` `fail` `loading` | _string_ | `success` | - |
| custom-style | 自定义样式       | _string_           | -       | -    |
| custom-class | 根节点样式类 | _string_ | - | 微信小程序 |

### Slots

| 名称 | 说明                               |
| ---- | ---------------------------------- |
| default    | 默认插槽，放入页面内容 |

