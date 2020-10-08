# Loading 加载

## 介绍

用于页面和区块的加载中状态。

注意在`app-nvue`上表现为内置的 [`loading`](https://weex.apache.org/zh/docs/components/loading.html) 组件，会自动根据平台切换加载类型。

## 引入

在页面中引入组件，详细介绍见[快速上手](quickstart)，如果已经使用 `easycom`模式，可以省略该步骤，直接使用

```js
import ILoading from '@/components/i-ui/i-loading/i-loading'

```

## 代码演示

### 加载类型

```html
<i-loading class="demo-loading" />
<i-loading class="demo-loading" type="spinner" />
```

### 自定义颜色

```html
<i-loading class="demo-loading" color="#1989fa" />
<i-loading class="demo-loading" color="#1989fa" type="spinner" />
```

### 加载文案

```html
<i-loading size="24px" tip="加载中..." />
```

### 垂直排列

```html
<i-loading size="24px" tip="加载中..." vertical />
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 平台差异说明 |
| --- | --- | --- | --- | --- |
| color | 颜色 | _string_ | `#c9c9c9` | - |
| type | 类型，可选值为 `spinner` | _string_ | `circular` | - |
| size | 加载图标大小，默认单位为 `rpx` | _string \| number_ | `60rpx` | - |
| tip | 自定义加载文案 | _string_ | - | - |
| text-style | 自定义加载文案样式 | _object_ | - | - |
| vertical | 是否垂直排列图标和文字内容 | _boolean_ | `false` | - |
| custom-style | 自定义加载图标样式 | _object_ | - | - |
| custom-class | 根节点样式类 | _string_ | - | 微信小程序 |

