# 内置样式

## 介绍

iui 中内置了一些常用的 `sass mixins`，方便开发者自由定义[详细代码](https://github.com/JoeshuTT/hello-iui/components/iui/styles/mixins/)。

## 引入

也可以在 `uni.scss` 中全局引入

```scss
/* 自定义mixins，复用样式，按需引入 */
@import '@/components/i-ui/styles/mixins/ellipsis.scss'; 
@import '@/components/i-ui/styles/mixins/flex-box.scss';
@import '@/components/i-ui/styles/mixins/hairline.scss';

```

## 代码演示

### 文字省略


当文本内容长度超过容器最大宽度时，自动省略多余的文本。

> 在`app-nvue`上必须得是在 `text`标签上

```html
<!-- 最多显示一行 -->
<text class="i-ellipsis">这是一段最多显示一行的文字，多余的内容会被省略</text>

<!-- 最多显示两行 -->
<text class="i-ellipsis--l2">
  这是一段最多显示两行的文字，多余的内容会被省略
</text>

<!-- 最多显示三行 -->
<text class="i-ellipsis--l3">
  这是一段最多显示三行的文字，多余的内容会被省略
</text>
```

```scss
.i-ellipsis {
    @include ellipsis();
}

.i-ellipsis--2 {
    @include ellipsis(2);
}

.i-ellipsis--3 {
    @include ellipsis(3);
}
```

### Flex 布局

`flex `盒子的 `mixin`，抹平了 `vue` 和 `nvue` 的展现

```html
<!-- Flex 布局 -->
<view class="flex-box"> flex 盒子 </view>
```

```scss

/* Flex 布局 */
.flex-box {
    @include flex-box();
}

```

### layout 布局

快速进行 flex 布局，`i-row` 和 `i-col`组件的 `sass` 版实现

```html
<!-- layout 布局 - 基础用法 -->
<view class="demo-row">
    <view class="demo-col-8"> span: 8</view>
</view>
<!-- layout 布局 - 设置列元素间距 -->
<view class="demo-row2">
    <view class="demo-col2--8"> span: 8</view>
</view>
```

```scss
/* layout 布局 - 基础用法 */
.demo-row {
    @include i-row();
}

.demo-col-8 {
    @include i-col(8, 0, 690);
    margin-bottom: 20rpx;
}

/* layout 布局 - 设置列元素间距 */
.demo-row2 {
    @include i-row(40);
}

.demo-col2--8 {
    @include i-col(8, 40, 690);
    margin-bottom: 20rpx;
}
```

### 1px 边框(app-nvue 暂不支持)

为元素添加 Retina 屏幕下的 1px 边框（即 hairline），基于伪类 transform 实现。

```html
<!-- 上边框 -->
<div class="i-hairline--top"></div>

<!-- 下边框 -->
<div class="i-hairline--bottom"></div>

<!-- 左边框 -->
<div class="i-hairline--left"></div>

<!-- 右边框 -->
<div class="i-hairline--right"></div>

<!-- 上下边框 -->
<div class="i-hairline--top-bottom"></div>

<!-- 全边框 -->
<div class="i-hairline--surround"></div>
```

```scss
[class*='i-hairline'] {
    &::after {
        @include hairline();
    }
}

.i-hairline {
    &,
    &--top,
    &--left,
    &--right,
    &--bottom,
    &--surround,
    &--top-bottom {
        position: relative;
    }

    &--top::after {
        border-top-width: 1px;
    }

    &--left::after {
        border-left-width: 1px;
    }

    &--right::after {
        border-right-width: 1px;
    }

    &--bottom::after {
        border-bottom-width: 1px;
    }

    &--top-bottom::after {
        border-width: 1px 0;
    }

    &--surround::after {
        border-width: 1px;
    }
}

```
