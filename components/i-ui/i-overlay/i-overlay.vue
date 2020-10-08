<template>
    <view v-if="inited" ref="iOverlay" class="i-overlay" :class="[customClass]" :style="[overlayStyle]" @click="onClick" @touchmove.stop.prevent="noop">
        <slot />
    </view>
</template>

<script>

import IComponent from '../mixins/component'
const nextTick = () => new Promise((resolve) => setTimeout(resolve, 1000 / 30))
// #ifdef APP-NVUE
const animation = uni.requireNativePlugin('animation')
// #endif

export default {
    name: 'IOverlay',
    mixins: [IComponent],
    props: {
        show: {
            type: Boolean,
            default: false
        },
        duration: {
            type: Number,
            default: 300
        }
    },
    data() {
        return {
            inited: false,
            display: false,
            aniStyle: {}
        }
    },
    computed: {
        overlayStyle() {
            const { aniStyle, customStyle } = this
            const style = {
                // #ifndef APP-NVUE
                transitionDuration: `${this.duration}ms`,
                display: `${this.display ? '' : 'none'}`
                // #endif
            }
            return Object.assign({}, style, aniStyle, customStyle)
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

            if (!this.show && !this.inited) {
                return
            }

            this.show && (this.inited = true)
            this.aniStyle = { opacity: bool ? 0 : 1 }

            // #ifndef APP-NVUE
            this.show && (this.display = true)

            Promise.resolve()
                .then(nextTick)
                .then(() => {
                    this.aniStyle = { opacity: bool ? 1 : 0 }
                    if (!this.show && this.display) {
                        setTimeout(() => {
                            this.display = false
                        }, duration)
                    }
                })
                .catch(() => {})
                // #endif

            // #ifdef APP-NVUE

            Promise.resolve()
                .then(nextTick)
                .then(() => {
                    animation.transition(this.$refs.iOverlay, {
                        styles: {
                            opacity: bool ? 1 : 0
                        },
                        duration,
                        timingFunction: 'ease',
                        needLayout: false,
                        delay: 0
                    }, () => {
                        // console.log('animation finished')

                        if (!this.show && this.inited) {
                            this.inited = false
                        }
                    })
                })
                .catch(() => {})
                // #endif
        }
    }
}
</script>

<style lang="scss">
	@import '../styles/index.scss';

	.i-overlay {
        @include flex-box();
		position: fixed;
		top: 0;
		left: 0;
		/* #ifndef APP-NVUE */
		width: 100%;
		height: 100%;
        z-index: $z-index;
        transition-property: opacity;
		transition-timing-function: ease;
		/* #endif */
		/* #ifdef APP-NVUE */
		width: 750rpx;
		bottom: 0;
		right: 0;
		/* #endif */
		background-color: $overlay-background-color;
	}

</style>
