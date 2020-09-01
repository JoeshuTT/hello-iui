<template>
    <view class="i-nav-bar">
        <view class="i-nav-bar__content" :class="[fixed ? 'i-nav-bar--fixed' : '']">
            <view v-if="fixed" class="i-status-bar" :style="{height: statusBarHeight}" />
            <view class="i-nav-bar__left" @click="onBackClick">
                <template v-if="leftText || leftArrow">
                    <i-icon
                        v-if="leftArrow"
                        size="16px"
                        name="arrow-left"
                        color="#000"
                        class="i-nav-bar__arrow"
                    />
                    <text class="i-nav-bar__text">{{ leftText }}</text>
                </template>
                <slot v-else name="left" />
            </view>
            <view class="i-nav-bar__title">
                <slot name="title"><text class="i-nav-bar__title-text">{{ title }}</text></slot>
            </view>
            <view class="i-nav-bar__right">
                <slot name="right" />
            </view>
        </view>
        <view v-if="fixed" class="i-nav-bar-placeholder">
            <view class="i-status-bar" :style="{height: statusBarHeight}" />
            <view class="i-navbar-perch" />
        </view>
    </view>
</template>

<script>
import IIcon from '../i-icon/i-icon'
import { getSystemInfoSync } from '../utils'
export default {
    name: 'INavBar',
    components: {
        IIcon
    },
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
            statusBarHeight
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
	@import '../common/index.scss';

	$nav-bar-height: 44px;
	$nav-bar-background-color: #fff;

	.i-status-bar {
		/* #ifndef APP-NVUE */
		height: var(--status-bar-height);
		/* #endif */

	}

	.i-navbar-perch {
		height: $nav-bar-height;
	}

	.i-nav-bar__content {
		@include flex-box('row');
        align-items: center;
        justify-content: space-between;
		height: $nav-bar-height;
		padding: 0 30rpx;

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
		&__arrow {
			color: $nav-bar-icon-color;
		}
		&__left {
			@include flex-box('row');
            width: 75px;
		}

		&__text {
			font-size: $nav-bar-text-font-size;
            color: #000;
		}

		&__title {
			flex: 1;
			/* #ifndef APP-NVUE */
			max-width: 55%;
			/* #endif */
			&-text {
				text-align: center;
				font-weight: bold;
				font-size: $nav-bar-title-font-size;
				color: $nav-bar-title-text-color;
				@include ellipsis();
			}
		}

		&__right {
			@include flex-box('row');
			width: 75px;
			justify-content: flex-end;
		}
	}
</style>
