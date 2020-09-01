<template>
    <view class="demo-block" :class="[padding && 'demo-block--padding']">
        <text v-if="title" class="demo-block__title" :style="{paddingLeft: padding ? '0' : '30rpx'}">{{ title }}</text>
        <view class="demo-block-body">
            <slot />
        </view>
    </view>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: ''
        },
        padding: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style lang="scss">

	.demo-block {
        @include flex-box();
		// padding: 0 30rpx;
        &--padding {
            padding: 0 30rpx;
        }
        &__title {
            font-size: 14px;
            color: rgba(69,90,100,.6);
            padding: 20px 30rpx 15px;
        }
	}

</style>
