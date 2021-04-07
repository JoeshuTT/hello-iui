# 定制主题

## 介绍

iui 默认提供一套 UI 主题，同时允许在一定程度上定制新的主题，以满足业务的多样化视觉需求（业务组件不参与其中）。

## 样式变量

`iui` 的样式是基于 SCSS 开发的，定义了一套默认样式变量，通过替换样式变量即可定制你自己需要的主题。
组件的样式变量是由 2 处维护的

[ scss 配置文件](https://github.com/JoeshuTT/hello-iui/blob/master/components/i-ui/styles/var.scss)，用于组件内部元素的 Class。

[ JS 配置文件](https://github.com/JoeshuTT/hello-iui/blob/master/components/i-ui/common/config.js)，用于组件内部元素的 Style。

下面是一些与颜色相关基本样式变量，所有可用的变量请参考 [var.scss](https://github.com/JoeshuTT/hello-iui/blob/master/components/i-ui/styles/var.scss)。

```scss
// Color Palette
$black: #000 !default;
$white: #fff !default;
$gray-1: #f7f8fa !default;
$gray-2: #f2f3f5 !default;
$gray-3: #ebedf0 !default;
$gray-4: #dcdee0 !default;
$gray-5: #c8c9cc !default;
$gray-6: #969799 !default;
$gray-7: #646566 !default;
$gray-8: #323233 !default;
$red: #ee0a24 !default;
$blue: #1989fa !default;
$orange: #ff976a !default;
$green: #07c160 !default;
```

下面只是列出了一部分颜色变量，这些都可以在 [config.js](https://github.com/JoeshuTT/hello-iui/blob/master/components/i-ui/common/config.js) 里找到。

```js
// Color Palette
export const COLOR_PALETTE = {
  black: '#000',
  white: '#fff',
  'gray-1': '#f7f8fa',
  'gray-2': '#f2f3f5',
  'gray-3': '#ebedf0',
  'gray-4': '#dcdee0',
  'gray-5': '#c8c9cc',
  'gray-6': '#969799',
  'gray-7': '#646566',
  'gray-8': '#323233',
  red: '#ee0a24',
  blue: '#1989fa',
  orange: '#ff976a',
  green: '#07c160',
}
```

## 定制方法

### 通过 scss

不同于其他家思路，`iui`是利用的官方提供的`uni.scss`来达到全局可用的目的。

> uni.scss 是一个特殊文件，在代码中无需 import 这个文件即可在 scss 代码中使用这里的样式变量。uni-app 的编译器在 webpack 配置中特殊处理了这个 uni.scss，使得每个 scss 文件都被注入这个 uni.scss，达到全局可用的效果。

1.在项目根目录下新建 `styles/theme.scss`文件，自定义变量覆盖默认值，来全局定制项目和`iui`的主题

```scss
/**
 * 定制项目的基本样式变量
 * 还可以新增样式变量，来覆盖组件的默认样式变量，使得组件和项目的样式，保持一致。
 */

$brand-color: #42b983; // 品牌色
$gray-8: #333;

// Color Palette
$black: #000;
$white: #fff;
$gray-1: #f7f8fa;
$gray-2: #f2f3f5;
$gray-3: #ebedf0;
$gray-4: #dcdee0;
$gray-5: #c8c9cc;
$gray-6: #969799;
$gray-7: #646566;
$gray-8: #323233;
$red: #ee0a24;
$blue: #1989fa;
$orange: #ff976a;
$green: $brand-color;
```

2.在 `uni.scss`下引入自定义主题样式文件

```scss
/*主题 */
@import '@/styles/theme.scss';
```

### 通过 js

`iui` 提供了一个 [config.js](https://github.com/JoeshuTT/hello-iui/blob/master/components/i-ui/common/config.js)文件，专门用于配置组件的常量选项数据

直接修改位于 `@/components/iui/common/` 下的 `config.js`

```js
// Color Palette
export const COLOR_PALETTE = {
  black: '#000',
  white: '#fff',
  'gray-1': '#f7f8fa',
  'gray-2': '#f2f3f5',
  'gray-3': '#ebedf0',
  'gray-4': '#dcdee0',
  'gray-5': '#c8c9cc',
  'gray-6': '#969799',
  'gray-7': '#646566',
  'gray-8': '#323233',
  red: '#42b983',
  blue: '#42b983',
  orange: '#42b983',
  green: '#42b983',
}
```

## 扩展

> 动态切换主题方案（使用 css 变量）[css-variables](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_custom_properties)，注意浏览器兼容性

```
/**
 * theme
 * @desc 可以通过给页面元素的 style，设置css变量，以实现主题的动态切换
 * @param {String} $property CSS 属性名
 * @param {String} $value CSS 属性值
 * @param {String} $var CSS 变量名
 */
@mixin theme($property, $value, $var: 'brand-color') {
    #{$property}: $value;
    /* #ifndef APP-NVUE */
    #{$property}: var(--#{$var}, $value);
    /* #endif */

```
