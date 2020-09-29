<template>
    <canvas
        :id="canvasId"
        type="2d"
        class="f2-canvas"
        :canvas-id="canvasId"
        :style="[style]"
        @touchstart="touchStart"
        @touchmove="touchMove"
        @touchend="touchEnd"
        @touchcancel="touchEnd"
    />
</template>

<script>

const F2 = require('@antv/f2')
// const Tooltip = require('@antv/f2/lib/plugin/tooltip')
// F2.Chart.plugins.register(Tooltip) // 方式一：全局注册
// import wxF2 from './wx-f2'
// const wxF2 = require('./wx-f2')
console.log('F2', F2)
// console.log('wxF2', wxF2)
var chart = null
var canvasEl = null
var canvas = null

function wrapEvent(e) {
    if (!e) return
    if (!e.preventDefault) {
        e.preventDefault = function() {}
    }
    return e
}

export default {
    props: {
        canvasId: {
            type: String,
            default: 'f2-canvas'
        },
        width: {
            type: Number,
            default: 300
        },
        height: {
            type: Number,
            default: 150
        },
        opts: {
            type: Object,
            default: () => ({})
        },
        dataa: {
            type: Array,
            default: () => ([])
        }
    },
    computed: {
        style() {
            const { width, height } = this
            return {
                width: `${width}px`,
                height: `${height}px`
            }
        }
    },
    mounted() {
        console.log(this)
        this.init()
    },
    methods: {
        toJSON() {
            console.log(1)
        },
        init(callback) {
            const { dataa: data, canvasId } = this

            var ctx = wx.createCanvasContext(canvasId, this) // 获取小程序上下文
            // canvas = new wxF2.Renderer(ctx)
            console.log('ctx', ctx)
            console.log('canvas', canvas)
            const query = wx.createSelectorQuery().in(this)
            query.select('.f2-canvas')
                .fields({
                    node: true,
                    size: true
                })
                .exec(res => {
                    const { node, width, height } = res[0]
                    console.log('res[0]', res[0])

                    const pixelRatio = wx.getSystemInfoSync().pixelRatio

                    // #ifdef MP
                    const context = node.getContext('2d')
                    // console.log(uni.createCanvasContext(canvasId, this)._context)
                    // console.log(context)
                    // 高清设置
                    node.width = width * pixelRatio
                    node.height = height * pixelRatio
                    console.log('node', node)
                    // #endif

                    // const config = { context, width, height, pixelRatio }
                    // console.log(config)
                    // console.log('this.opts', this.opts)
                    // const chart = this.opts.onInit(F2, config)
                    // if (chart) {
                    //     chartIns = chart
                    //     )
                    // }

                    // canvasEl = chart.get('el')
                    // console.log(width, height, canvasId)
                    // #ifdef H5
                    console.dir(document.querySelector(`#${canvasId}>canvas`))
                    // #endif
                    console.log(width, height)
                    chart = new F2.Chart({
                        // #ifdef H5
                        el: document.querySelector(`#${canvasId}>canvas`),
                        // el: document.querySelector(`#${canvasId}>canvas`),
                        // #endif
                        // el: document.querySelector(`#${canvasId}>canvas`),
                        // #ifdef MP
                        context,
                        // el: canvas,
                        // #endif
                        width,
                        height,
                        pixelRatio
                    })
                    console.log('chart', chart)
                    const map = {
                        '芳华': '40%',
                        '妖猫传': '20%',
                        '机器之血': '18%',
                        '心理罪': '15%',
                        '寻梦环游记': '5%',
                        '其他': '2%'
                    }
                    chart.source(data, {
                        percent: {
                            formatter(val) {
                                return val * 100 + '%'
                            }
                        }
                    })
                    chart.legend({
                        position: 'right',
                        itemFormatter(val) {
                            return val + '  ' + map[val]
                        }
                    })

                    chart.tooltip(false)
                    chart.coord('polar', {
                        transposed: true,
                        radius: 0.85
                    })
                    chart.axis(false)
                    chart.interval()
                        .position('a*percent')
                        .color('name', ['#1890FF', '#13C2C2', '#2FC25B', '#FACC14', '#F04864', '#8543E0'])
                        .adjust('stack')
                        .style({
                            lineWidth: 1,
                            stroke: '#fff',
                            lineJoin: 'round',
                            lineCap: 'round'
                        })
                        .animate({
                            appear: {
                                duration: 1200,
                                easing: 'bounceOut'
                            }
                        })

                    chart.render()
                    // render

                    // // #ifdef MP
                    // canvasEl = canvas
                    // // #endif
                    // // #ifdef H5
                    // canvasEl = document.querySelector(`#${canvasId}>canvas`)
                    // console.dir(canvasEl)
                    // // #endif
                    // console.log('chart', chart)
                    // console.log('canvasEl', canvasEl)
                })
        },
        touchStart(e) {
            console.log('touchStart', e)
            if (!canvasEl) {
                return
            }
            canvasEl.dispatchEvent('touchstart', wrapEvent(e))
        },
        touchMove(e) {
            if (!canvasEl) {
                return
            }
            canvasEl.dispatchEvent('touchmove', wrapEvent(e))
        },
        touchEnd(e) {
            if (!canvasEl) {
                return
            }
            canvasEl.dispatchEvent('touchend', wrapEvent(e))
        }
    }
}
</script>

<style lang="scss">

</style>
