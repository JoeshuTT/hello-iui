<template>
    <view class="container">
        <demo-block title="基础用法">
            <i-load-more status="loading" :content-text="loadingText" />
        </demo-block>
        <demo-block title="指定加载图标">
            <i-load-more icon-type="circular" status="loading" :content-text="loadingText" />
        </demo-block>
        <demo-block title="自定义颜色">
            <i-load-more color="#1989fa" status="loading" :content-text="loadingText" />
        </demo-block>
        <demo-block title="加载前">
            <i-load-more status="more" />
        </demo-block>
        <demo-block title="加载中">
            <i-load-more status="loading" />
        </demo-block>
        <demo-block title="加载完">
            <i-load-more status="noMore" />
        </demo-block>
    </view>
</template>

<script>
import pageMixin from '@/mixins/page'

export default {
    mixins: [pageMixin],
    data() {
        return {
            loadingText: { loading: '加载中...' }
        }
    },
    onLoad() {

    },
    methods: {

    }
}
</script>

<style lang="scss">
	.mb20 {
		margin-bottom: 20rpx;
	}
</style>
