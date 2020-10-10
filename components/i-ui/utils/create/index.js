
export function createComponent(name, com) {
    // 组件名称
    com.name = name

    // #ifdef MP
    com.options = {
        virtualHost: true, // 在微信小程序中将组件节点渲染为虚拟节点，更加接近Vue组件的表现
        multipleSlots: true, // 在微信小程序中关闭当前组件的多slot支持，默认启用
        // addGlobalClass: true, // 在微信小程序允许页面设置的样式来覆盖组件的内部样式
        styleIsolation: 'shared' // 在微信小程序，表示页面 wxss 样式将影响到自定义组件，自定义组件 wxss 中指定的样式也会影响页面和其他设置了 apply-shared 或 shared 的自定义组件
    }
    // #endif

    if (!com.props.customStyle) {
        com.props.customStyle = {
            type: Object,
            default: () => ({})
        }
    }

    if (!com.props.customClass) {
        com.props.customClass = {
            type: String,
            default: ''
        }
    }

    return com
}
