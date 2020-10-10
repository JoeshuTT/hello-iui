# 更新日志

iui 遵循 [Semver](https://semver.org/lang/zh-CN/) 语义化版本规范。

---  
## v2.3.6

`2020-10-10`

**修复**

- `i-nav-bar`: 在`app-plus` 平台下标题未居中
- `i-load-more`，`i-page`，`i-nav-bar`: 在微信小程序平台下data内数据在模板内渲染显示 undefined 问题

**优化**

- 示例默认页面改为`.vue`后缀，需要体验`nvue`页面速度的同学，可以执行下根目录下的 `batch.js` 脚本
```sh
# 批量转换文件后缀名
node batch.js
```

## v2.3.5

`2020-10-03`

**上线使用文档**，方便开发者使用 [传送门](https://static-386415c0-10b5-4a03-a868-8fb41b9e886e.bspapp.com/docs/)

**功能**

- `i-button`: 支持渐变色
<!-- - 新增 `i-picker` 和 `datetime-picker` -->

**优化**

- 引入`util.wxs` ，简化代码编写，提高代码可读性
- 新建`config.js`，统一维护各组件配置组件
- 处理兼容适配

**样式**

- `theme.scss` 移出 `@/components/iui/styles`，并提供动态切换主题 `mixins` 方法

## v2.2.4

`2020-09-25`

- 不得不说 `nvue` 的布局，样式问题简直就是个黑盒子
- 修复了 `i-button`， `i-icon`， `i-image`，`i-page`，`i-nav-bar` 几个小问题
- 新增部分组件根元素默认拥有 `custom-style`，`custom-class`属性，方便自定义样式

## v2.2.3

`2020-09-22`

- 支持微信小程序 （目前还只在模拟器上测试过）
- 新增部分组件根元素默认拥有 `custom-style`，`custom-class`属性，方便自定义样式

## v1.2.2

`2020-09-16`

- 优化 `i-button` 组件
- `i-transition` 增加自定义过渡动效，组件示例增加节流控制（#snoop）
- 新增主题定制功能
- 优化精简项目示例代码

## v1.2.1

`2020-09-16`

- 新增 `i-page` 组件

## v1.0.0

`2020-09-01`

- 发布 `iui` v1.0.0
- 首次发布，十余个组件