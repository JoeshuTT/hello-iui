<template>
    <i-page :status="pageActivity">
        <view class="container">
            <i-cell center title="draggable - 拖拽排序" label="移植自sortablejs，适用于H5，App vue页面" is-link @click="onNavigator()" />
            <i-cell center title="f2-canvas - 移动可视化" label="移植自@antv/f2，适用于H5，App vue页面" is-link @click="onNavigator('/pages/charts/charts')" />
        </view>
    </i-page>
</template>

<script>

import pageMixin from '@/mixins/page'

export default {
    mixins: [pageMixin],
    data() {
        return {
            pageActivity: 'success'
        }
    },
    methods: {

    }
}
</script>

<style lang="scss">

    .main {
        margin-top: 300rpx;
        height: 300rpx;
        @include flex-box();
        justify-content: center;
        align-items: center;
        background-color: #fff;
    }
</style>
