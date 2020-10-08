# NavBar 导航栏

## 介绍

常用于满足开发者个性化需求，二次开发，自定义导航栏

## 引入

在页面中引入组件，详细介绍见[快速上手](quickstart)，如果已经使用 `easycom`模式，可以省略该步骤，直接使用

```js
import INavBar from '@/components/i-ui/i-nav-bar/i-nav-bar'

```

## 代码演示

### 基础用法

```html
<i-nav-bar
    left-text="返回"
    title="标题"
/>
```

### 高级用法

通过 slot 定制右侧操作按钮

```html
<i-nav-bar title="标题" left-text="返回" left-arrow>
    <template slot="right">
        <i-icon name="plus" size="18" @click="onClickRight" />
    </template>
</i-nav-bar>
```

```js
export default {
  data() {
    return {

    }
  },

  methods: {
    onClickRight() {
        uni.showToast({ icon: 'none', title: '按钮' })
    }
  }
}
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 平台差异说明 |
| --- | --- | --- | --- | --- |
| title | 标题 | _string_ | `''` | - |
| left-text | 左侧文案 | _string_ | `''` | - |
| left-arrow | 是否显示左侧箭头 | _boolean_ | `false` | - |
| fixed | 是否固定在顶部 | _boolean_ | `false` | - |
| custom-style | 自定义样式       | _string_           | -       | -    |
| custom-class | 根节点样式类 | _string_ | - | 微信小程序 |

### Events

| 事件名           | 说明               | 参数 |
| ---------------- | ------------------ | ---- |
| @back  | 点击左侧返回按钮时触发 | -    |

### Slot

| 名称  | 说明               |
| ----- | ------------------ |
| title | 自定义标题         |
| left  | 自定义左侧区域内容 |
| right | 自定义右侧区域内容 |


