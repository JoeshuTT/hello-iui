# 注意事项

## 带有`-vue`组件是什么？

在组件设计过程中，发现 nvue 不是很能支持 vue 页面上的一些特性，但是丢掉有很可惜，所以专门实现个`vue`版，仅仅用在 vue 页面上也不错，
像`i-col-vue`，`i-icon-vue`，`i-transition-vue` 之类的组件就是。

## 修改组件样式

`iui` 为每个组件都提供了 `custom-style` 属性，便于自定义样式（一般是指组件根元素上的样式）。  
废弃了旧版本的 `custom-class`

```vue
<i-button :custom-style="{ width: '100px', height: '100px', borderRadius: '20rpx' }" text="自定义" />
```

## 避免使用`i-`的 class

`iui`的组件`style`并未开启 scoped，所以如果在全局，或页面中添加了与组件同名的 class，会影响到组件内部样式，请避免此行为。

2. 关于 SCSS

iui 有依赖 scss，请务必有安装相关依赖项

## 组件属性单位说明

`iui` 会自动处理组件属性是否携带单位的情况，如果有传入单位，则以传入单位为准，否则以组件默认单位为准

以`i-icon`为例：

```
<i-icon name="success" :size="50" />
<i-icon name="success" size="50px" />
<i-icon name="success" size="100rpx" />
```

都是表明同一个大小（请避免使用小数）

## 关于单位

在页面开发中，通常都是一水的使用 rpx 单位进行布局的，这是不推荐的，更推荐的做法是
只有元素的单位要根据屏幕宽度大小变化时，才需要用 rpx。而字体大小是没必要根据屏幕宽度变化。
因为屏幕更大是为了显示更多的内容，而不是显示更大，不是吗。

`iui` 也是践行该原则的，如果发现组件中的字体使用的是 px 单位，不要意外，那是有意为之。
