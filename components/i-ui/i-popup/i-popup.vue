<template>
    <view class="i-popup-wrapper" @touchmove.stop.prevent="noop">
        <!-- #ifdef APP-NVUE -->
        <!-- <i-overlay :show="overlay && value" :custom-style="overlayStyle" @click="onOverlayClick" /> -->
        <!-- nvue 平台降级处理，遮罩无动画 -->
        <view v-if="overlay && value" class="i-overlay" :style="[overlayStyle]" @click="onOverlayClick" />
        <!-- #endif -->
        <!-- #ifndef APP-NVUE -->
        <i-overlay :show="overlay && value" :custom-style="overlayStyle" @click="onOverlayClick" />
        <!-- #endif -->
        <template v-if="position === 'center'">
            <view v-if="inited" ref="ani" class="i-popup" :class="[customClass, 'i-popup--' + position, classes]" :style="[mergeStyle]" @click="onOverlayClick">
                <view class="i-popup__content" :style="[customStyle]" @click.stop="noop"><slot /></view>
            </view>
        </template>
        <template v-else>
            <view v-if="inited" ref="ani" class="i-popup" :class="[customClass, 'i-popup--' + position, classes]" :style="[mergeStyle]">
                <slot />
            </view>
        </template>
    </view>
</template>

<script>

import IComponent from '../mixins/component'
import IOverlay from '../i-overlay/i-overlay'
import transition from '../mixins/transition'

export default {
    name: 'IPopup',
    components: {
        IOverlay
    },
    mixins: [IComponent, transition],
    // model: {
    //     prop: 'show',
    //     event: 'input'
    // },
    props: {
        value: {
            type: Boolean,
            default: false // 小程序端使用 model 定制 prop 和 event无效，只好在 popup 中使用 value 代替 show
        },
        overlay: {
            type: Boolean,
            default: true
        },
        position: {
            type: String,
            default: 'center' // top, bottom, left, right, center
        },
        duration: {
            type: null,
            default: 300
        },
        overlayStyle: {
            type: Object,
            default: () => ({})
        },
        closeOnClickOverlay: {
            type: Boolean,
            default: true
        }

    },
    data() {
        return {
            name: 'center',
            overlayShow: false
        }
    },
    watch: {
        value: {
            handler(value, old) {
                if (value === old) {
                    return
                }

                // #ifndef APP-NVUE
                value ? this.enter() : this.leave()
                // #endif
                // #ifdef APP-NVUE
                value ? this.enter2() : this.leave2()
                // #endif
            },
            immediate: true
        }
    },
    created() {
        this.setAniName()
    },
    methods: {
        onOverlayClick() {
            this.$emit('click-overlay')
            if (this.closeOnClickOverlay) {
                this.$emit('close', false)
                this.$emit('input', false)
            }
        },
        setAniName() {
            const { position } = this
            // #ifdef APP-NVUE
            const aniMap = {
                'center': 'fade',
                'top': 'slide-down',
                'bottom': 'slide-up',
                'left': 'slide-left',
                'right': 'slide-right'
            }
            this.name = aniMap[position]
            // #endif
            // #ifndef APP-NVUE
            this.name = position
            // #endif
        },
        // 完成过渡后触发
        onTransitionEnd() {
            if (this.transitionEnded) {
                return
            }
            this.transitionEnded = true
            this.$emit(`after-${this.status}`)
            const { value, display } = this
            if (!value && display) {
                this.display = false
                // #ifdef APP-NVUE
                this.inited = false
                // #endif
            }
        },
        noop() { }
    }
}
</script>

<style lang="scss">
	@import '../styles/index.scss';

	.i-popup {
		@include flex-box();
		position: fixed;
		transition-timing-function: ease;
		/* #ifndef APP-NVUE */
		z-index: $z-index;
		/* #endif */
		&__content {
			background-color: $popup-background-color;
		}

		&--center {
			top: 0;
			left: 0;
			bottom: 0;
			width: 750rpx;
			@include flex-box();
			align-items: center;
			justify-content: center;
		}

		&--top {
			background-color: $popup-background-color;
			top: 0;
			left: 0;
			width: 750rpx;
		}

		&--bottom {
			background-color: $popup-background-color;
			bottom: 0;
			left: 0;
			width: 750rpx;
		}

		&--left {
			background-color: $popup-background-color;
			top: 0;
			left: 0;
			/* #ifndef APP-NVUE */
			height: 100%;
			/* #endif */
			/* #ifdef APP-NVUE */
			bottom: 0;
			/* #endif */
		}

		&--right {
			background-color: $popup-background-color;
			top: 0;
			right: 0;
			/* #ifndef APP-NVUE */
			height: 100%;
			/* #endif */
			/* #ifdef APP-NVUE */
			bottom: 0;
			/* #endif */
		}
	}

	/* #ifndef APP-NVUE */

	.i-center-enter-active,
	.i-center-leave-active {
		transition-property: opacity;
	}

	.i-center-enter,
	.i-center-leave-to {
		opacity: 0
	}

	.i-bottom-enter-active,
	.i-bottom-leave-active,
	.i-left-enter-active,
	.i-left-leave-active,
	.i-right-enter-active,
	.i-right-leave-active,
	.i-top-enter-active,
	.i-top-leave-active {
		transition-property: transform;
	}

	.i-top-enter,
	.i-top-leave-to {
		transform: translate3d(0, -100%, 0);
	}

	.i-bottom-enter,
	.i-bottom-leave-to {
		transform: translate3d(0, 100%, 0);
	}

	.i-left-enter,
	.i-left-leave-to {
		transform: translate3d(-100%, 0, 0);
	}

	.i-right-enter,
	.i-right-leave-to {
		transform: translate3d(100%, 0, 0);
	}

	/* #endif */

	.i-overlay {
		position: fixed;
		top: 0;
		left: 0;
		/* #ifndef APP-NVUE */
		width: 100%;
		height: 100%;
		z-index: $z-index;
		/* #endif */
		/* #ifdef APP-NVUE */
		width: 750rpx;
		bottom: 0;
		right: 0;
		// height: 724px;
		/* #endif */
		background-color: $overlay-background-color;
	}
</style>
