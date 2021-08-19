<template>
  <view
    v-if="inited"
    ref="iOverlay"
    class="i-overlay"
    :style="[mergeStyle]"
    @click="onClick"
    @touchmove.stop.prevent="noop"
  >
    <slot />
  </view>
</template>

<script>
const nextTick = () => new Promise(resolve => setTimeout(resolve, 1000 / 30))
// #ifdef APP-PLUS-NVUE
const animation = uni.requireNativePlugin('animation')
// #endif
import { OVERLAY_BACKGROUND_COLOR } from '../index'

export default {
  name: 'IOverlay',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    duration: {
      type: null,
      default: 300,
    },
    customStyle: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      inited: false,
      overlayStyle: {
        opacity: 0,
        backgroundColor: OVERLAY_BACKGROUND_COLOR,
        // #ifndef APP-PLUS-NVUE
        transitionDuration: `${this.duration}ms`,
        display: this.customStyle.display || 'block', // 起到v-show的效果，.vue页面可用
        // #endif
      },
    }
  },
  computed: {
    currentDisplay() {
      let display = 'block'
      // #ifdef APP-PLUS-NVUE
      display = 'flex'
      // #endif
      return this.customStyle.display || display
    },
    mergeStyle() {
      const { customStyle, overlayStyle } = this
      // #ifndef APP-PLUS-NVUE
      delete customStyle.display
      // #endif
      return Object.assign({}, overlayStyle, customStyle)
    },
  },
  watch: {
    show: {
      handler(value) {
        if (value) {
          this.enter()
        } else {
          this.leave()
        }
      },
      immediate: true,
    },
  },
  methods: {
    onClick() {
      this.$emit('click')
    },
    enter() {
      this.inited = true
      this.overlayStyle.opacity = 0

      // #ifndef APP-PLUS-NVUE
      this.overlayStyle.display = this.currentDisplay
      this.overlayStyle.transitionDuration = `${this.duration}ms`

      this.$nextTick()
        .then(nextTick)
        .then(() => {
          this.overlayStyle.opacity = 1
        })
        .catch(() => {})
      // #endif

      // #ifdef APP-PLUS-NVUE
      this.$nextTick()
        .then(nextTick)
        .then(() => {
          animation.transition(this.$refs.iOverlay, {
            styles: {
              opacity: 1,
            },
            duration: this.duration,
            timingFunction: 'ease',
            needLayout: false,
            delay: 0,
          })
        })
        .catch(() => {})
      // #endif
    },
    leave() {
      if (!this.inited) {
        return
      }

      this.overlayStyle.transitionDuration = `${this.duration}ms`

      // #ifndef APP-PLUS-NVUE
      this.overlayStyle.opacity = 0
      setTimeout(() => {
        this.overlayStyle.display = 'none'
      }, this.duration)
      // #endif

      // #ifdef APP-PLUS-NVUE
      animation.transition(
        this.$refs.iOverlay,
        {
          styles: {
            opacity: 0,
          },
          duration: this.duration,
          timingFunction: 'ease',
          needLayout: false,
          delay: 0,
        },
        () => {
          this.inited = false
        },
      )
      // #endif
    },
    noop(e) {
      // #ifdef APP-PLUS-NVUE
      e.stopPropagation()
      // #endif
    },
  },
}
</script>

<style lang="scss">
@import '../styles/index.scss';

.i-overlay {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  /* #ifndef APP-PLUS-NVUE */
  z-index: $z-index;
  transition-property: opacity;
  transition-timing-function: ease;
  /* #endif */
}
</style>
