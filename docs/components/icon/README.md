# Icon 图标

## 介绍

基于字体的图标集，可以通过 Icon 组件使用，也可以在其他组件中通过 icon 属性引用。

## 引入

在页面中引入组件，详细介绍见[快速上手](quickstart)，如果已经使用 `easycom`模式，可以省略该步骤，直接使用

```js
import IIcon from '@/components/i-ui/i-icon/i-icon'
```

## 代码演示

### 基础用法

`Icon`的`name`属性支持传入图标名称或图片链接

```html
<i-icon name="success" />
<i-icon name="https://img.yzcdn.cn/vant/logo.png" />
<i-icon name="/static/logo.png" />
```

### 图标颜色

设置`color`属性来控制图标颜色

```html
<i-icon name="success" color="red" />
```

### 图标大小

设置`size`属性来控制图标大小

```html
<i-icon name="success" :size="50" />
<i-icon name="success" size="50px" />
<i-icon name="success" size="100rpx" />
```

### 通过 `Font class` 来自定义图标（app-nvue 平台暂不支持）

如果需要在现有 Icon 的基础上使用更多图标，可以引入第三方 iconfont 对应的字体文件，之后就可以在 Icon 组件中直接使用。  
启用 `class-prefix`后，图标的颜色大小需要通过 css 来控制，直接书写属性是无效的

```scss
/* #ifndef APP-NVUE */
/* 引入第三方或自定义的字体图标样式 */
@font-face {
  font-family: 'myIcon';
  src: url('https://at.alicdn.com/t/font_720567_dnwdc9tepfd.ttf') format('truetype');
}

.my-icon {
  font-family: 'myIcon';
}

.my-icon-wechat:before {
  content: '\e632';
}

/* #endif */
```

```html
<!-- 通过 class-prefix 指定类名为 my-icon -->
<van-icon class-prefix="my-icon" name="wechat" />
```

### 通过 `UniCode` 来自定义图标

如果需要在现有 Icon 的基础上使用更多图标，可以引入第三方 iconfont 对应的字体文件，之后就可以在 Icon 组件中直接使用。

```js
// #ifdef APP-NVUE
const dom = weex.requireModule('dom')
dom.addRule('fontFace', {
  fontFamily: 'myIcon',
  src: "url('https://at.alicdn.com/t/font_720567_dnwdc9tepfd.ttf')",
})
// #endif

export default {
  mixins: [pageMixin],
  data() {
    return {
      myIconWechat: '\ue632',
    }
  },
}
```

```scss
/* #ifndef APP-NVUE */
/* 引入第三方或自定义的字体图标样式 */
@font-face {
  font-family: 'myIcon';
  src: url('https://at.alicdn.com/t/font_720567_dnwdc9tepfd.ttf') format('truetype');
}
/* #endif */
```

```html
<!-- 通过 font-family 指定字体集为 my-icon -->
<van-icon font-family="myIcon" :name="myIconWechat" />
```

## 常见问题

### font-family，和 class-prefix 这 2 个属性不是一个作用吗？

在 `app-nvue` 平台不支持伪元素，无法使用 `Font class`方式来自定义图标，`class-prefix` 属性是不起作用的，目前只有 `Unicode` 方式是可以跨所有平台的，这就是 `font-family`属性产生原因。
所以再页面不需要适配 nvue 的情况下，则推荐使用`Font class`方式，简单点。

### 开发者工具上提示 Faild to load font 是什么情况？

这个是开发者工具本身的问题，可以忽略，具体可以查看[微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/ui/font/wx.loadFontFace.html)注意第 5 条

## API

### Props

| 参数         | 说明                                         | 类型               | 默认值        | 平台差异说明          |
| ------------ | -------------------------------------------- | ------------------ | ------------- | --------------------- |
| name         | 图标名称或图片链接（必填）                   | _string_           | -             | -                     |
| size         | 图标大小，如 `20px`，`40rpx`，默认单位为`px` | _string \| number_ | `16px`        | -                     |
| color        | 图标颜色                                     | _string_           | `#999`        | -                     |
| font-family  | 指定字体集                                   | _string_           | `iuiIconFont` | -                     |
| class-prefix | 类名前缀                                     | _string_           | `i-icon`      | App-nvue 平台暂不支持 |
| custom-style | 自定义样式                                   | _object_           | -             | -                     |

### Events

| 事件名 | 说明           | 参数 |
| ------ | -------------- | ---- |
| @click | 点击图标时触发 | -    |
