<template>
    <view class="container">
        <demo-block title="基础用法">
            <i-button type="primary" text="显示遮罩层" @click="show = true" />
            <i-overlay :show="show" @click="onMaskToggle" />
        </demo-block>
        <demo-block title="嵌入内容">
            <i-button type="primary" text="嵌入内容" @click="show2 = true" />
            <i-overlay :show="show2" :custom-style="{alignItems: 'center', justifyContent: 'center'}" @click="onMaskToggle2">
                <view class="block">
                    <text class="blokc-txt">111</text>
                </view>
            </i-overlay>
        </demo-block>
    </view>
</template>

<script>
import pageMixin from '@/mixins/page'

export default {
    mixins: [pageMixin],
    data() {
        return {
            show: false,
            show2: false
        }
    },
    onLoad() {

    },
    methods: {
        onMaskToggle() {
            this.show = !this.show
        },
        onMaskToggle2() {
            this.show2 = !this.show2
        }
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
