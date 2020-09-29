
export default {
    // #ifdef MP
    options: {
        virtualHost: true // 在微信小程序中将组件节点渲染为虚拟节点，更加接近Vue组件的表现
    },
    // #endif
    props: {
        customStyle: {
            type: Object,
            default: () => ({})
        },
        customClass: {
            type: String,
            default: ''
        }
    },
    methods: {
        noop() {}
    }
}
