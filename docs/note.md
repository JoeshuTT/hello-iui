# 注意事项

## 修改组件样式

为了抹平各平台上使用的差异，`iui` 每个组件都提供了 `custom-style`，`custom-class` 2个属性，方便自定义样式（一般是指组件根元素上的样式）。  
举个栗子，如果只在app(包括nvue)和H5上运行，则

```vue
<i-button 
    class="mb20" 
    :custom-style="{width: '100px',height: '100px',borderRadius: '20rpx'}"
> 单色按钮
</i-button>

/* style */
.mb20 {
    margin-bottom: 20rpx;
}
```

就可以了，  
如果还要在微信小程序运行，则必须再加上 `custom-class="mb20" `

```vue
<i-button 
    class="mb20" 
    custom-class="mb20" 
    :custom-style="{width: '100px',height: '100px',borderRadius: '20rpx'}"
> 单色按钮
</i-button>

/* style */
.mb20 {
    margin-bottom: 20rpx;
}
```

这个蹩脚设计是因为在微信小程序中，自定义组件需要通过定义 `externalClasses`，来接受外部样式类。而`uni-app`官方目前还没有提供可以在Vue 组件中使用 externalClasses 属性的方法。关于这个问题已经在论坛发帖，但是不知道官方会不会处理o(´^｀)o。

[Vue 组件支持添加externalClasses属性，编译到微信小程序](https://ask.dcloud.net.cn/question/108141)

> 还有一个常见办法，是直接在页面中定义跟组件同名的样式名，覆盖样式，此方案只适用于非nvue平台，酌情使用

```style
.i-button {
    margin-bottom: 20rpx;
}
```

## 避免使用`i-`的class

`iui`的组件`style`并未开启scoped，所以如果在全局，或页面中添加了与组件同名的class，会影响到组件内部样式，请避免此行为。

2. 关于SCSS

iui 有依赖scss，请务必有安装相关依赖项

## 改变组件属性单位

`iui` 会自动处理组件属性是否携带单位的情况，如果有传入单位，则以传入单位为准，否则以组件默认单位为准

以`i-icon`为例：
```
<i-icon name="success" :size="50" />
<i-icon name="success" size="50px" />
<i-icon name="success" size="100rpx" />
```
都是表明一个大小

## 关于单位

在页面开发中，通常都是一水的使用rpx 单位进行布局的，这是不推荐的，更推荐的做法是
只有元素的单位要根据屏幕宽度大小变化时，才需要用rpx。而字体大小是没必要根据屏幕宽度变化。
因为屏幕更大是为了显示更多的内容，而不是显示更大，不是吗。

`iui` 也是践行该原则的，如果发现组件中的字体使用的是px单位，不要意外，那是有意为之。