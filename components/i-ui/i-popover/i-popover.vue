<template>
  <view class="i-popover-wrapper">
    <i-overlay :show="value" duration="150" :custom-style="maskStyle" @click="onOverlayClick"> </i-overlay>
    <!-- i-popover -->
    <i-transition :show="value" name="zoom-in" duration="150" :custom-style="mergeStyle">
      <view class="i-popover__arrow" :style="[arrowStyle]"></view>
      <view
        class="i-popover__content"
        :class="[theme === 'dark' ? 'i-popover__content--dark' : 'i-popover__content--light']"
      >
        <slot>
          <view class="i-popover__actions">
            <text
              v-for="(item, index) in actions"
              :key="index"
              :class="[
                'i-popover__actions-text',
                theme === 'dark' ? 'i-popover__actions-text-dark' : '',
                index === actions.length - 1 ? 'i-popover__actions-text--noborder' : '',
                item.disabled ? 'i-popover__actions--disabled' : '',
                item.className,
              ]"
              @click="onActionClick(index)"
              >{{ item.text }}</text
            >
          </view>
        </slot>
      </view>
    </i-transition>
  </view>
</template>
<script>
import IOverlay from '../i-overlay/i-overlay'
import iTransition from '../i-transition/i-transition'
import { getPageY, rpx2px, getSystemInfoSync } from '../utils'
import { OVERLAY_BACKGROUND_COLOR } from '../index'
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
    arrowPosition: {
      type: Object,
      default: () => ({
        pos: 'top',
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
    closeOnClickAction: {
      type: Boolean,
      default: true,
    },
    closeOnClickOutside: {
      type: Boolean,
      default: true,
    },
    overlayStyle: {
      type: Object,
      default: () => ({}),
    },
    actions: {
      type: Array,
      default: () => [],
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
    themeColor() {
      return this.theme === 'dark' ? '#4a4a4a' : '#fff'
    },
    mergeStyle() {
      const { customStyle } = this
      const viewStyle = {
        position: 'fixed',
        padding: '15rpx',
        zIndex: 999,
      }

      const { x = 0, y = 0 } = this.position

      x < 0 ? (viewStyle.right = `${rpx2px(-x)}px`) : (viewStyle.left = `${rpx2px(x)}px`)
      y < 0 ? (viewStyle.bottom = `${getPageY(-y)}px`) : (viewStyle.top = `${getPageY(y)}px`)

      return Object.assign({}, viewStyle, customStyle)
    },
    maskStyle() {
      const { overlayStyle, overlay } = this

      overlayStyle.backgroundColor = overlay ? OVERLAY_BACKGROUND_COLOR : 'rgba(0,0,0,0)'

      return Object.assign({}, overlayStyle)
    },
    contentStyle() {
      const { x = 0, y = 0 } = this.position
      const style = {}
      x < 0 ? (style.right = `${-x}px`) : (style.left = `${x}px`)
      y < 0 ? (style.bottom = `${-y}px`) : (style.top = `${y}px`)
      style.opacity = this.hasAnimation || !this.showIn ? '0' : '1'
      style.transform = this.hasAnimation || !this.showIn ? this.contentTransform : 'scale(1)'
      style.transformOrigin = this.transformOrigin
      return style
    },
    arrowStyle() {
      const { x = 0, y = 0, pos = 'top' } = this.arrowPosition
      const style = {
        backgroundColor: this.themeColor,
        transform: 'scaleY(0.8) rotate(45deg)',
      }

      switch (pos) {
        case 'top':
          style.top = '6rpx'
          x < 0 ? (style.right = `${-x}rpx`) : (style.left = `${x}rpx`)
          break
        case 'bottom':
          style.bottom = '6rpx'
          x < 0 ? (style.right = `${-x}rpx`) : (style.left = `${x}rpx`)
          break
        case 'left':
          style.left = '6rpx'
          y < 0 ? (style.bottom = `${-y}rpx`) : (style.top = `${y}rpx`)
          break
        case 'right':
          style.right = '6rpx'
          y < 0 ? (style.bottom = `${-y}rpx`) : (style.top = `${y}rpx`)
          break
        default:
          break
      }

      return style
    },
  },
  methods: {
    onOverlayClick() {
      this.$emit('clickOverlay')
      if (this.closeOnClickOutside) {
        this.$emit('input', false)
        this.$emit('close')
      }
    },
    onActionClick() {
      if (this.closeOnClickAction) {
        this.$emit('input', false)
        this.$emit('close')
      }
      this.$emit('select', {})
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

.i-popover {
  &__content {
    border-radius: 8px;
    background-color: $white;
    // #ifndef APP-PLUS-NVUE
    box-shadow: 0 2px 12px rgba(50, 50, 50, 0.12);
    // #endif

    &--dark {
      background-color: #4a4a4a;
    }
  }

  &__arrow {
    position: absolute;
    border-radius: 4px;
    width: 30rpx;
    height: 30rpx;
    z-index: 10;
  }

  &__actions {
    @include flex-box();
    width: 240rpx;
    padding: 0 30rpx;

    &-text {
      height: 88rpx;
      font-size: $font-size-md;
      color: $gray-8;
      line-height: 88rpx;
      text-align: center;
      border-bottom-width: 1px;
      border-bottom-style: solid;
      border-bottom-color: $border-color;

      &--noborder {
        border-bottom-color: transparent;
      }

      &-dark {
        height: 88rpx;
        font-size: $font-size-md;
        color: $white;
        line-height: 88rpx;
        text-align: center;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom-color: $gray-7;

        &--noborder {
          border-bottom-color: transparent;
        }
      }
    }

    &--disabled {
      color: $gray-5;
      // #ifdef H5
      cursor: not-allowed;
      // #endif
    }
  }
}
</style>
