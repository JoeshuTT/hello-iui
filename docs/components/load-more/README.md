# LoadMore 加载更多

## 介绍

常用于展示数据列表的各种加载状态（源自`uni-ui`的LoadMore）。

## 引入

在页面中引入组件，详细介绍见[快速上手](quickstart)，如果已经使用 `easycom`模式，可以省略该步骤，直接使用

```js
import ILoadMore from '@/components/i-ui/i-load-more/i-load-more'

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
| status | 状态，可选值为 `more` `loading` `noMore` | _string_ | `more` | - |
| contentText | 自定义加载文本说明 | _object_ | `{ more: '上拉显示更多', loading: '正在加载...', noMore: '没有更多数据了' }` | - |
| color | 图标和文字颜色 | _string_ | `#c9c9c9` | - |
| iconType | 类型，可选值为 `spinner` | _string_ | `circular` | - |
| iconSize | 加载图标大小，默认单位为 `rpx` | _string \| number_ | `60rpx` | - |
| custom-style | 自定义样式 | _object_ | - | - |
| custom-class | 根节点样式类 | _string_ | - | 微信小程序 |

### Events

| 事件名 | 说明               | 回调参数     |
| ------ | ------------------ | ------------ |
| click  | 点击加载更多触发     | {status:'loading'} |

