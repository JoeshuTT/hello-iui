<template>
    <i-page :status="pageActivity">
        <view class="container">
            <view class="main">页面主体</view>
            <view class="main">页面主体</view>
            <view class="main">页面主体</view>
        </view>
    </i-page>
</template>

<script>

import pageMixin from '@/mixins/page'

export default {
    mixins: [pageMixin],
    data() {
        return {
            pageActivity: 'loading',
            statusList: ['success', 'fail', 'loading'],
            statusIndex: 0,
            show: true
        }
    },
    onLoad() {
        // 模拟页面加载。。。
        setTimeout(() => {
            this.pageActivity = 'success'
        }, 3000)
    },
    onNavigationBarButtonTap(e) {
        console.log(e)

        this.statusIndex += 1
        if (this.statusIndex > this.statusList.length) {
            this.statusIndex = 0
        }
        this.pageActivity = this.statusList[this.statusIndex]
    },
    methods: {

    }
}
</script>

<style lang="scss">

    .main {
        @include flex-box();
        justify-content: center;
        align-items: center;
        height: 300rpx;
        margin-top: 300rpx;
        background-color: #fff;
    }
</style>
