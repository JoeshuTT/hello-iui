# Button 按钮

## 介绍

常用的操作按钮

## 引入

在页面中引入组件，详细介绍见[快速上手](quickstart)，如果已经使用 `easycom`模式，可以忽略该步骤，直接使用

```js
import IButton from '@/components/i-ui/i-button/i-button'

```

## 代码演示

### 按钮类型

支持`default`、`primary`、`info`、`warning`、`danger`五种类型，默认为`default`

```html
<i-button type="default">默认按钮</i-button>
<i-button type="primary">主要按钮</i-button>
<i-button type="info">信息按钮</i-button>
<i-button type="warning">警告按钮</i-button>
<i-button type="danger">危险按钮</i-button>
<i-button type="danger" text="危险按钮"/>
```

### 按钮文本

通过`text`属性设置按钮文本，也支持常见的插槽显示文本内容

```html
<i-button type="danger" text="危险按钮"/>
<i-button type="danger"><text>危险按钮</text></i-button>
<i-button type="danger">危险按钮</i-button>
```

### 朴素按钮

通过`plain`属性将按钮设置为朴素按钮，朴素按钮的文字为按钮颜色，背景为白色

```html
<i-button plain type="default">朴素按钮</i-button>
<i-button plain type="info">朴素按钮</i-button>
```

### 禁用状态

通过`disabled`属性来禁用按钮，此时按钮的`@click`事件不会触发

```html
<i-button disabled type="default">禁用状态</i-button>
<i-button disabled type="primary">禁用状态</i-button>
```

### 加载状态

```html
<i-button loading />
<i-button loading type="primary" loading-type="spinner" />
<i-button loading type="info" loading-text="加载中..." />
```

### 按钮形状

```html
<i-button square type="primary">方形按钮</i-button>
<i-button round type="info">圆形按钮</i-button>
```

### 图标按钮

通过`icon`属性设置按钮图标，支持 Icon 组件里的所有图标，也可以传入图标 URL

```html
<i-button icon="star-o" type="primary" />
<i-button icon="star-o" type="primary">按钮</i-button>
<i-button icon="https://img.yzcdn.cn/it/logo.png" type="info">
    按钮
</i-button>
```

### 自定义颜色

通过`color`属性可以自定义按钮的颜色

```html
<i-button color="#7232dd">单色按钮</i-button>
<i-button color="#7232dd" plain>单色按钮</i-button>
<i-button color="linear-gradient(to right, #4bb0ff, #6149f6)">
    渐变色按钮
</i-button>
```

### 自定义样式

通过`custom-style`属性可以修改按钮的根元素样式

```html
<i-button :custom-style="{width: '100px', height: '100px', borderRadius: '20rpx'}">
    单色按钮
</i-button>
```

### 开放能力（微信小程序）

同微信小程序按钮，注意事件回调返回的参数是 `detail`

```html
<i-button type="primary" open-type="getUserInfo" @getuserinfo="getUserInfo">获取用户信息</i-button>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 平台差异说明 |
| --- | --- | --- | --- | --- |
| type | 按钮类型，可选值为 `primary` `info` `warning` `danger` | _string_ | `default` | - |
| text | 按钮文本 | _string_ | - | - |
| color | 按钮颜色，支持传入`linear-gradient`渐变色 | _string_ | - | 1.0.0 |
| icon | 左侧图标名称或图片链接，可选值见 [Icon 组件](components/icon/) | _string_ | - | - |
| class-prefix | 图标类名前缀，同 Icon 组件的 [class-prefix 属性](components/icon/) | _string_ | `i-icon` | App-nvue 平台暂不支持 |
| icon-font | 指定字体集，同 Icon 组件的 [fontFamily 属性](components/icon/) | _string_ | `iuiIconFont` | - |
| plain | 是否为朴素按钮 | _boolean_ | `false` | - |
| round | 是否为圆形按钮 | _boolean_ | `false` | - |
| square | 是否为方形按钮 | _boolean_ | `false` | - |
| disabled | 是否禁用按钮 | _boolean_ | `false` | - |
| loading | 是否显示为加载状态 | _boolean_ | `false` | - |
| loading-type | 加载状态图标类型，可选值为 `spinner` | _string_ | `circular` | - |
| loading-size | 加载图标大小 | _string_ | `20px` | - |
| text-style | 按钮文本样式 | _object_ | - | - |
| form-type | 用于 form 组件，可选值为`submit` `reset`，点击分别会触发 form 组件的 submit/reset 事件 | _string_ | - | - |
| open-type | 微信开放能力，具体支持可参考 [微信官方文档](https://mp.weixin.qq.com/debug/wxadoc/dev/component/button.html) | _string_ | - | - |
| hover-class | 指定按钮按下去的样式类 | _string_ | - | App-nvue 平台暂不支持 |
| app-parameter | 打开 APP 时，向 APP 传递的参数 | _string_ | - | 微信小程序 |
| lang | 指定返回用户信息的语言，zh_CN 简体中文，<br>zh_TW 繁体中文，en 英文 | _string_ | `en` | - | 微信小程序 |
| session-from | 会话来源 | _string_ | - | 微信小程序 |
| business-id | 客服消息子商户 id | _number_ | - | -微信小程序 |
| send-message-title | 会话内消息卡片标题 | _string_ | 当前标题 | 微信小程序 |
| send-message-path | 会话内消息卡片点击跳转小程序路径 | _string_ | 当前分享路径 | 微信小程序 |
| send-message-img | sendMessageImg | _string_ | 截图 | 微信小程序 |
| show-message-card | 显示会话内消息卡片 | _string_ | `false` | 微信小程序 |
| custom-style | 自定义样式 | _object_ | - | - |
| custom-class | 根节点样式类 | _string_ | - | 微信小程序 |

### Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| @click | 点击按钮，且按钮状态不为加载或禁用时触发 | - |
| @getuserinfo | 用户点击该按钮时，会返回获取到的用户信息，<br>从返回参数的 detail 中获取到的值同 wx.getUserInfo | - |
| @contact | 客服消息回调，open-type="contact"时有效 | - |
| @getphonenumber | 获取用户手机号回调，open-type="getPhoneNumber"时有效 | - |
| @error | 当使用开放能力时，发生错误的回调 | - |
| @launchapp | 打开 APP 成功的回调，open-type="launchApp"时有效 | - |
| @opensetting | 在打开授权设置页后回调，open-type="openSetting"时有效 | - |

### Slots

| 名称              | 说明           |
| ----------------- | -------------- |
| default           | 按钮内容       |
| loading  | 自定义加载图标 |