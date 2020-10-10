<template>
    <view class="container">
        <demo-block title="基础用法" padding>
            <i-cell title="展示弹出层" is-link @click="onCellClick('center')" />
        </demo-block>
        <demo-block title="弹出位置" padding>
            <i-cell title="顶部弹出" is-link @click="onCellClick('top')" />
            <i-cell title="底部弹出" is-link @click="onCellClick('bottom')" />
            <i-cell title="左侧弹出" is-link @click="onCellClick('left')" />
            <i-cell title="右侧弹出" is-link @click="onCellClick('right')" />
        </demo-block>
      <i-popup v-model="show_center">
            <view style="padding:20px 40px;">内容</view>
        </i-popup>
       <i-popup v-model="show_top" position="top" :custom-style="{height: '200rpx'}">
            <view style="padding:20px 40px;">内容</view>
        </i-popup>
        <i-popup v-model="show_bottom" position="bottom" :custom-style="{height: '200rpx'}">
            <view style="padding:20px 40px;">内容</view>
        </i-popup>
        <i-popup v-model="show_left" position="left" :custom-style="{width: '200rpx'}">
            <view style="padding:20px 40px;">内容</view>
        </i-popup>
        <i-popup v-model="show_right" position="right" :custom-style="{width: '200rpx'}">
            <view style="padding:20px 40px;">内容</view>
        </i-popup>
    </view>
</template>

<script>
import pageMixin from '@/mixins/page'

export default {
    mixins: [pageMixin],
    data() {
        return {
            show_center: false,
            show_top: false,
            show_bottom: false,
            show_left: false,
            show_right: false
        }
    },
    onLoad() {

    },
    methods: {
        onCellClick(type) {
            this[`show_${type}`] = true
        }
    }
}
</script>

<style lang="scss">
	.mb20 {
		margin-bottom: 20rpx;
	}
</style>
