# 踩坑

记录一些在组件开发中遇到坑

## 在自定义组件上使用 `class`

先编写一个组件：

```
<template>
  <view class="i-sku"> Hi </view>
</template>
```

在页面中使用，添加一些 class， 这些 class 将被追加到该组件的根元素上面

```
<template>
  <i-sku class="my-class your-class" />
</template>

<style>
.my-class {
  font-size: 66px;
  color: #ff0000;
}
</style>

```

渲染为：

```
<view class="i-sku my-class your-class">Hi</view>
# 小程序上表现略有不同
<i-sku class="my-class your-class">
  #shadow-root
    <view class="i-sku">Hi</view>
</i-sku>
```

小结:

- 在 nvue 上，元素样式不能传递
- 在小程序平台上，是以`shadow-root`形式来展现自定义组件的，class 是作用在了`shadow-root`（而非模板中的根节点）上。
- 在小程序平台上，如果发现在`shadow-root`上，部分样式不生效，可以加上`display`属性（shadow-root 有点摸不透）。

## 在自定义组件上使用 `style`

先编写一个组件：

```
<template>
  <view class="i-sku"> Hi </view>
</template>
```

在页面中使用，添加 style 到组件上，被添加到该组件的根元素上面，如果已经存在的 style 合并后覆盖

```
<template>
  <i-sku :style="{ textAlign: 'center' }" />
</template>
```

渲染为：

```
<view class="i-sku" style="text-align: center;">Hi</uni-view>
```

```
<view class="i-sku" style="text-align: center;">Hi</view>
# 在小程序上表现略有不同
<i-sku style="text-align: center;">
  #shadow-root
    <view class="i-sku">Hi</view>
</i-sku>
```

小结:

- 在 nvue 上，元素样式不能传递
- 在小程序平台上，是以`shadow-root`形式来展现自定义组件的，style 是作用在了`shadow-root`（而非模板中的根节点）上。
- 在小程序平台上，如果发现在`shadow-root`上，部分样式不生效，可以加上`display`属性（shadow-root 有点摸不透）。

## 自定义事件名采用 camelCase

尽管 Vue 官方推荐你始终使用 kebab-case 的事件名，但是在 nvue 只有 lowercase 或者 camelCase 才会生效

举个例子，来触发一个 myEvent 名字的事件

```
this.$emit('myEvent')
```

监听`myEvent`事件

```
<my-component @myEvent="doSomething"></my-component>
```

所以还是统一使用 camelCase 来命名吧，可读性更好。

## 阻止事件冒泡，全端可用

```vue
<template>
  <view class="wrapper" @click="onWrapperClick">
    <view class="box" @click.stop="noop">box</view>
  </view>
</template>

<script>
export default {
  methods: {
    onWrapperClick(e) {
      console.log('onWrapperClick', e)
    },
    noop(e) {
      console.log('noop', e)
      // #ifdef APP-NVUE
      e.stopPropagation()
      // #endif
    },
  },
}
</script>
```

## nvue 中样式无法传递

在 nvue 中 css 属性是没有继承性的，属性样式不会传递给子元素。
比如

```
<template>
  <view class="parent">
    <view class="children">children</view>
  </view>
</template>

<style>
.parent {
  font-size: 66px;
  color: #ff0000;
  text-align: center;
}
</style>

```

在`.parent`上定义的样式，无法作用到子元素上，必须在该元素自身上书写样式才起作用。

## 在 window 查看 sketch 文件，可以下个`lunacy`软件
