<template>
    <view class="container">
        <demo-block title="加载类型" padding>
            <i-loading class="demo-loading" />
            <i-loading class="demo-loading" type="spinner" />
        </demo-block>
        <demo-block title="自定义颜色" padding>
            <i-loading class="demo-loading" color="#1989fa" />
            <i-loading class="demo-loading" color="#1989fa" type="spinner" />
        </demo-block>
        <demo-block title="自定义大小" padding>
            <i-loading class="demo-loading" size="48" />
            <i-loading class="demo-loading" size="48rpx" type="spinner" />
        </demo-block>
        <demo-block title="加载文案" padding>
            <i-loading size="24px" tip="加载中..." />
        </demo-block>
        <demo-block title="垂直排列" padding>
            <i-loading size="24px" tip="加载中..." vertical />
        </demo-block>
    </view>
</template>

<script>
import pageMixin from '@/mixins/page'

export default {
    mixins: [pageMixin],
    data() {
        return {

        }
    },
    onLoad() {

    },
    methods: {
        onNavigator(path) {
            uni.navigateTo({
                url: path
            })
        }
    }
}
</script>

<style lang="scss">

	.demo-loading {
        margin-right: 40rpx;
    }
</style>
