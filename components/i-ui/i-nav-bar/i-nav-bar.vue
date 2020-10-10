<template>
    <view class="i-nav-bar__wrap">
        <view class="i-nav-bar" :class="[fixed ? 'i-nav-bar--fixed' : '']" :style="{paddingTop: fixed ? `${statusBarHeight}px` : '0px'}">
            <view class="i-nav-bar__content">
                <view class="i-nav-bar__left">
                    <view v-if="leftText || leftArrow" class="i-nav-bar__left-back" @click="onBackClick">
                        <i-icon v-if="leftArrow" name="arrow-left" :color="COLOR_PALETTE['gray-7']" class="i-nav-bar__arrow" />
                        <text class="i-nav-bar__text">{{ leftText }}</text>
                    </view>
                    <slot v-else name="left" />
                </view>
                <view class="i-nav-bar__title">
                    <slot name="title"><text class="i-nav-bar__title-text">{{ title }}</text></slot>
                </view>
                <view class="i-nav-bar__right">
                    <slot name="right" />
                </view>
            </view>
        </view>
        <view v-if="fixed" class="i-nav-bar-placeholder">
            <view class="i-status-bar" :style="{height: `${statusBarHeight}px`}" />
            <view class="i-navbar-perch" />
        </view>
    </view>
</template>

<script>
import IComponent from '../mixins/component'
import IIcon from '../i-icon/i-icon'
import { getSystemInfoSync } from '../utils'
import { COLOR_PALETTE } from '../common/config'

export default {
    name: 'INavBar',
    components: {
        IIcon
    },
    mixins: [IComponent],
    props: {
        title: {
            type: String,
            default: ''
        },
        leftText: {
            type: String,
            default: ''
        },
        leftArrow: {
            type: Boolean,
            default: true
        },
        fixed: {
            type: Boolean,
            default: false
        }
    },
    data() {
        const { statusBarHeight } = getSystemInfoSync()
        return {
            statusBarHeight,
            COLOR_PALETTE
        }
    },
    methods: {
        onBackClick() {
            this.$emit('back')
            uni.navigateBack({
                delta: 1
            })
        }
    }
}
</script>

<style lang="scss">
	@import '../styles/index.scss';

	.i-navbar-perch {
		height: $nav-bar-height;
	}

	.i-nav-bar__content {
		@include flex-box('row');
        align-items: center;
        justify-content: space-between;
		height: $nav-bar-height;
	}

	.i-nav-bar--fixed {
		position: fixed;
        width: 750rpx;
        top: 0;
        left: 0;
        z-index: $z-index;
	}

	.i-nav-bar {
		background-color: $nav-bar-background-color;

		&__left, &__right {
			@include flex-box('row');
            align-items: center;
            width: 75px;
            height: $nav-bar-height;
		}

		&__left {
            padding-left: $nav-bar-padding;
		}

		&__left-back {
            flex: 1;
			@include flex-box('row');
            align-items: center;
            height: $nav-bar-height;
		}

		&__text {
			font-size: $nav-bar-text-font-size;
            color: $nav-bar-text-color;
		}

		&__title {
			flex: 1;
            @include flex-box('row');
            justify-content: center;
            paddinf-right: 110px;
            /* #ifndef APP-NVUE */
            max-width: 45%;
            /* #endif */

			&-text {
				font-size: $nav-bar-title-font-size;
				font-weight: bold;
				color: $nav-bar-title-text-color;
				@include ellipsis();
			}
		}

		&__right {
			justify-content: flex-end;
			padding-right: $nav-bar-padding;
		}
	}
</style>
