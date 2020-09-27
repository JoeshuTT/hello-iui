<template>
    <view class="container">
        <i-row class="list" gutter="40">
            <i-col v-for="(item, index) in charts" :key="index" :span="8" @click="onClick(index)">
                <view class="list-item">
                    {{ item.value }}
                </view>
            </i-col>
        </i-row>
    </view>
</template>

<script>
export default {
    data() {
        return {
            charts: [
                { name: 'radial-bar', value: 'iwatch健康记录' },
                { name: 'line', value: '折线图' },
                { name: 'area', value: '区域图' },
                { name: 'column', value: '柱状图' },
                { name: 'bar', value: '条形图' },
                { name: 'dodge', value: '分组柱状图' },
                { name: 'stackBar', value: '层叠条形图' },
                { name: 'ring', value: '环图' },
                { name: 'pie', value: '饼图' },
                { name: 'rose', value: '玫瑰图' },
                { name: 'radar', value: '雷达图' },
                { name: 'gauge', value: '仪表盘' },
                { name: 'double-axis', value: '双 Y 轴' },
                { name: 'k', value: 'K 线图(异步获取数据)' },
                { name: 'stack-area', value: '层叠区域图' },
                { name: 'multiCharts', value: '多图表好性能' }
            ]
        }
    },
    methods: {
        onClick(index) {
            const { name } = this.charts[index]
            uni.navigateTo({
                url: `/pages/charts/${name}`
            })
        }
    }
}
</script>

<style lang="scss">

    .list-item {
        height: 100rpx;
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 20rpx;
    }
</style>
