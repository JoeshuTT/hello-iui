<template>
  <view class="i-popup-wrapper" :style="[wrapperStyle]" @touchmove.stop.prevent="noop">
    <!-- #ifdef APP-PLUS-NVUE -->
    <i-overlay :show="value" :custom-style="overlayStyle" class="i-popup-mask" @click="onOverlayClick">
      <i-transition
        :class="['i-popup--' + position]"
        :show="value"
        :duration="duration"
        :name="aniName"
        :custom-style="mergeStyle"
      >
        <slot />
      </i-transition>
    </i-overlay>
    <!-- #endif -->
    <!-- #ifndef APP-PLUS-NVUE -->
    <i-overlay :show="overlay && value" :custom-style="overlayStyle" @click="onOverlayClick"></i-overlay>
    <i-transition
      :class="['i-popup--' + position]"
      :show="value"
      :duration="duration"
      :name="aniName"
      :custom-style="mergeStyle"
    >
      <slot />
    </i-transition>
    <!-- #endif -->
  </view>
</template>

<script>
import IOverlay from '../i-overlay/i-overlay'
import iTransition from '../i-transition/i-transition'
import { getSystemInfoSync } from '../utils'

export default {
  name: 'IPopup',
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
      type: String,
      default: 'center',
      validator(value) {
        return ~['top', 'right', 'bottom', 'left', 'center'].indexOf(value)
      },
    },
    duration: {
      type: null,
      default: 300,
    },
    overlay: {
      type: Boolean,
      default: true, // 为了使用最少的 DOM来实现, nvue下不能使用该属性
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
    rootStyle: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    const { windowTop = 0, windowBottom = 0 } = getSystemInfoSync()

    return {
      positionMap: {
        center: {
          animate: 'fade',
          style: {
            // #ifndef APP-PLUS-NVUE
            position: 'fixed',
            left: '50%',
            top: '50%',
            transform: 'translate3d(-50%, -50%, 0)',
            // #endif
          },
        },
        top: {
          animate: 'slide-down',
          style: {
            position: 'fixed',
            left: 0,
            right: 0,
            top: `${windowTop}px`,
          },
        },
        bottom: {
          animate: 'slide-up',
          style: {
            position: 'fixed',
            left: 0,
            right: 0,
            bottom: `${windowBottom}px`,
          },
        },
        left: {
          animate: 'slide-left',
          style: {
            position: 'fixed',
            left: 0,
            top: `${windowTop}px`,
            bottom: `${windowBottom}px`,
          },
        },
        right: {
          animate: 'slide-right',
          style: {
            position: 'fixed',
            right: 0,
            top: `${windowTop}px`,
            bottom: `${windowBottom}px`,
          },
        },
      },
    }
  },
  computed: {
    currentPosition() {
      const { positionMap, position } = this
      return positionMap[position] || 'center'
    },
    aniName() {
      return this.currentPosition.animate || 'fade'
    },
    wrapperStyle() {
      const { rootStyle } = this

      return Object.assign({}, this.currentPosition.wrapperStyle, rootStyle)
    },
    mergeStyle() {
      const { customStyle } = this

      const positionStyle = {
        'background-color': '#fff',
        'z-index': 999,
        ...this.currentPosition.style,
      }

      return Object.assign({}, positionStyle, customStyle)
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
      // #ifdef APP-PLUS-NVUE
      e.stopPropagation()
      // #endif
    },
  },
}
</script>

<style lang="scss">
@import '../styles/index.scss';

// #ifdef H5
.i-popup-wrapper {
  position: fixed; // 相对于uni-page-wrapper 左上角
}
// #endif

// #ifdef APP-PLUS-NVUE
.i-popup-mask {
  align-items: center;
  justify-content: center;
}
// #endif
</style>
