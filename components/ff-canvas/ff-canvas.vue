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

import F2 from '@antv/f2'
var chart = null
var canvasEl = null

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
        data: {
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
        init(callback) {
            const { data, canvasId } = this
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
                    // console.log(document.querySelector(`#${canvasId}>canvas`))
                    // #endif
                    console.log(width, height)
                    chart = new F2.Chart({
                        // #ifdef H5
                        el: document.querySelector(`#${canvasId}>canvas`),
                        // #endif
                        // #ifdef MP
                        context,
                        // #endif
                        width,
                        height,
                        pixelRatio
                    })
                    const originDates = []
                    data.forEach(obj => {
                        if (obj.date >= '2018-05-01') {
                            originDates.push(obj.date)
                        }
                    })
                    function formatNumber(n) {
                        return String(Math.floor(n * 100) / 100).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    }
                    chart.source(data, {
                        date: {
                            type: 'timeCat',
                            tickCount: 5,
                            values: originDates,
                            mask: 'MM-DD'
                        },
                        steps: {
                            tickCount: 5
                        }
                    })

                    chart.axis('date', {
                        tickLine: {
                            length: 4,
                            stroke: '#cacaca'
                        },
                        label: {
                            fill: '#cacaca'
                        },
                        line: {
                            top: true
                        }
                    })
                    chart.axis('steps', {
                        position: 'right',
                        label(text) {
                            return {
                                text: formatNumber(text * 1),
                                fill: '#cacaca'
                            }
                        },
                        grid: {
                            stroke: '#d1d1d1'
                        }
                    })
                    chart.tooltip({
                        showItemMarker: false,
                        background: {
                            radius: 2,
                            padding: [3, 5]
                        },
                        onShow(ev) {
                            const items = ev.items
                            items[0].name = ''
                            items[0].value = items[0].value + ' 步'
                        }
                    })
                    chart.interval().position('date*steps').style({
                        radius: [2, 2, 0, 0]
                    })

                    // 定义进度条
                    chart.scrollBar({
                        mode: 'x',
                        xStyle: {
                            backgroundColor: '#e8e8e8',
                            fillerColor: '#808080',
                            offsetY: -2
                        }
                    })
                    chart.interaction('pan')
                    chart.render()

                    //
                    canvasEl = chart.get('el')
                    console.log('chart', chart)
                    console.log('canvasEl', canvasEl)
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
