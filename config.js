export default [
    {
        name: '基础组件',
        children: [
            {
                name: 'Button 按钮',
                path: '/pages/button/button'
            },
            {
                name: 'Cell 单元格',
                path: '/pages/cell/cell'
            },
            {
                name: 'Icon 图标',
                path: '/pages/icon/icon'
            },
            {
                name: 'Image 图片',
                path: '/pages/image/image'
            },
            // #ifndef APP-NVUE
            {
                name: 'layout 布局',
                path: '/pages/layout/layout'
            },
            // #endif
            // #ifdef APP-NVUE
            {
                name: 'layout 布局（nvue 不推荐使用）',
                path: '/pages/layout/layout'
            },
            // #endif
            {
                name: 'popup 弹出层',
                path: '/pages/popup/popup'
            },
            {
                name: 'Style 内置样式',
                path: '/pages/style/style'
            },
            {
                name: 'Transition 过渡动画',
                path: '/pages/transition/transition'
            }
        ]
    },
    {
        name: '反馈组件',
        children: [
            {
                name: 'Loading 加载',
                path: '/pages/loading/loading'
            },
            {
                name: 'Overlay 遮罩层',
                path: '/pages/overlay/overlay'
            }
        ]
    },
    {
        name: '展示组件',
        children: [
            {
                name: 'loadMore 加载更多',
                path: '/pages/load-more/load-more'
            }
        ]
    },
    {
        name: '导航组件',
        children: [
            {
                name: 'NavBar 导航栏',
                path: '/pages/nav-bar/nav-bar'
            }
        ]
    }
]
