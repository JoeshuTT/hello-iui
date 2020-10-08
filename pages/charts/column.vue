<template>
    <view class="container">
        <ff-canvas canvas-id="canvas-column" :dataa="data" />
    </view>
</template>

<script>
import pageMixin from '@/mixins/page'
// import FfCanvas from '@/components/ff-canvas/ff-canvas'

const chart = null

function initChart(canvas, width, height, F2) {
    const data = [
        { year: '1951 年', sales: 38 },
        { year: '1952 年', sales: 52 },
        { year: '1956 年', sales: 61 },
        { year: '1957 年', sales: 145 },
        { year: '1958 年', sales: 48 },
        { year: '1959 年', sales: 38 },
        { year: '1960 年', sales: 38 },
        { year: '1962 年', sales: 38 }
    ]

    return chart
}

export default {
    // components: {
    //     FfCanvas
    // },
    mixins: [pageMixin],
    data() {
        console.log('initChart', initChart)
        return {
            data: [
                { year: '1951 年', sales: 38 },
                { year: '1952 年', sales: 52 },
                { year: '1956 年', sales: 61 },
                { year: '1957 年', sales: 145 },
                { year: '1958 年', sales: 48 },
                { year: '1959 年', sales: 38 },
                { year: '1960 年', sales: 38 },
                { year: '1962 年', sales: 38 }
            ],
            options: {}
        }
    },
    onLoad() {
        this.options = [
            { year: '1951 年', sales: 38 },
            { year: '1952 年', sales: 52 },
            { year: '1956 年', sales: 61 },
            { year: '1957 年', sales: 145 },
            { year: '1958 年', sales: 48 },
            { year: '1959 年', sales: 38 },
            { year: '1960 年', sales: 38 },
            { year: '1962 年', sales: 38 }
        ]
    },
    methods: {

    }
}
</script>

<style lang="scss">
	.mb20 {
		margin-bottom: 20rpx;
	}

    .block {
        width: 300rpx;
        height: 300rpx;
        background-color: #fff;
        &-txt {
            color: #666;
            font-size: 16px;
        }
    }
</style>
