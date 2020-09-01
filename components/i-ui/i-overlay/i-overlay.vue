<template>
    <view v-if="inited" ref="iOverlay" class="i-overlay" :style="overlayStyle" @click="onClick" @touchmove.stop.prevent="noop">
        <slot />
    </view>
</template>

<script>
const nextTick = () => new Promise((resolve) => setTimeout(resolve, 1000 / 30))
// #ifdef APP-NVUE
const animation = uni.requireNativePlugin('animation')
// #endif

export default {
    name: 'IOverlay',
    props: {
        show: {
            type: Boolean,
            default: false
        },
        duration: {
            type: Number,
            default: 300
        },
        customStyle: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            inited: false,
            viewStyle: { opacity: this.show ? 0 : 1 }
        }
    },
    computed: {
        overlayStyle() {
            const { viewStyle, customStyle } = this
            const style = {
                transitionDuration: `${this.duration}ms`,
                ...viewStyle,
                ...customStyle
            }
            return style
        }
    },
    watch: {
        show: {
            handler(value, old) {
                if (value === old) {
                    return
                }
                this.appearOverlay(value)
            },
            immediate: true
        }
    },
    methods: {
        onClick() {
            this.$emit('click')
        },
        appearOverlay(bool) {
            const { duration } = this
            // #ifndef APP-NVUE
            this.show && (this.inited = true)
            // this.viewStyle = { opacity: bool ? 0 : 1 }
            Promise.resolve()
                .then(nextTick)
                .then(() => {
                    this.viewStyle = { opacity: bool ? 1 : 0 }
                    !this.show && setTimeout(() => {
                        this.inited = false
                    }, duration)
                })
                .catch(() => {})
            // #endif
            // #ifdef APP-NVUE
            this.show && (this.inited = true)
            // this.viewStyle = { opacity: bool ? 0 : 1 }
            const overlayEl = this.$refs.iOverlay

            Promise.resolve()
                .then(nextTick)
                .then(() => {
                    animation.transition(overlayEl, {
                        styles: {
                            opacity: bool ? 1 : 0
                        },
                        duration,
                        timingFunction: 'ease',
                        needLayout: false,
                        delay: 0
                    }, () => {
                        // console.log('animation finished')
                    })
                })
                .catch(() => {})
            // #endif
        },
        noop() {}
    }
}
</script>

<style lang="scss">
	@import '../common/index.scss';

	.i-overlay {
        @include flex-box();
		position: fixed;
		top: 0;
		left: 0;
		/* #ifndef APP-NVUE */
        transition-property: opacity;
		transition-timing-function: ease;
		width: 100%;
		height: 100%;
        z-index: $z-index;
		/* #endif */
		/* #ifdef APP-NVUE */
		width: 750rpx;
		bottom: 0;
		right: 0;
		/* #endif */
		background-color: $overlay-background-color;
	}
</style>
