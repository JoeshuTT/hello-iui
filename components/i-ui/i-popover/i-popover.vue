<template>
  <i-overlay class="i-popover" :show="value" duration="150" :custom-style="wrapperStyle" @click="onOverlayClick">
    <view class="i-popover-inner" :style="mergeStyle" elevation="5px">
      <view class="i-popover__arrow" :style="[arrowStyle]"></view>
      <i-transition :show="true" name="zoom-in" duration="150">
        <slot />
      </i-transition>
    </view>
  </i-overlay>
</template>
<script>
import IOverlay from '../i-overlay/i-overlay'
import iTransition from '../i-transition/i-transition'

export default {
  name: 'IPopover',
  components: {
    IOverlay,
    iTransition,
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    position: {
      type: Object,
      default: () => ({
        x: 0,
        y: 0,
      }),
    },
    theme: {
      type: String,
      default: 'light',
    },
    overlay: {
      type: Boolean,
      default: false,
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: true,
    },
    overlayStyle: {
      type: Object,
      default: () => ({}),
    },
    customStyle: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      currentValue: 0,
    }
  },
  computed: {
    mergeStyle() {
      const { theme, customStyle } = this
      const bgColor = theme === 'dark' ? '#4a4a4a' : '#fff'
      const viewStyle = {
        position: 'fixed',
        'background-color': bgColor,
        'border-radius': '8px',
        'z-index': 999,
        'box-shadow': '0 2px 12px rgba(50, 50, 50, .12)',
      }

      const { x = 0, y = 0 } = this.position
      x < 0 ? (viewStyle.right = `${-x}rpx`) : (viewStyle.left = `${x}rpx`)
      y < 0 ? (viewStyle.bottom = `${-y}rpx`) : (viewStyle.top = `${y}rpx`)

      return Object.assign({}, viewStyle, customStyle)
    },
    wrapperStyle() {
      const { overlayStyle, overlay } = this
      if (!overlay) {
        overlayStyle.backgroundColor = 'rgba(0,0, 0,0)'
      }
      return Object.assign({}, overlayStyle)
    },
    arrowStyle() {
      const { x = 0, y = 0 } = this.position
      const style = {
        'border-bottom-color': '#fff',
        top: `${y}rpx`,
      }
      return style
    },
  },
  methods: {
    onOverlayClick() {
      this.$emit('clickOverlay')
      if (this.closeOnClickOverlay) {
        this.$emit('input', false)
        this.$emit('close')
      }
    },
    noop(e) {
      // #ifdef APP-NVUE
      e.stopPropagation()
      // #endif
    },
  },
}
</script>

<style lang="scss">
@import '../styles/index.scss';

.i-popover {
  &-wrapper {
    position: fixed;
  }

  &__arrow {
    position: absolute;
    width: 0;
    height: 0;
    border-color: transparent;
    border-style: solid;
    border-width: 6px;
  }
}
</style>
