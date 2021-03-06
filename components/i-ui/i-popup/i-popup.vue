<template>
  <view
    v-if="value"
    :class="['i-popup-wrapper', 'i-popup-wrapper--' + position]"
    :style="[wrapperStyle]"
    @touchmove.stop.prevent="noop"
  >
    <i-overlay :show="overlay" :custom-style="overlayStyle" @click="onOverlayClick" />
    <i-transition
      :class="['i-popup--' + position]"
      :show="true"
      :duration="duration"
      :name="aniName"
      :custom-style="mergeStyle"
    >
      <slot />
    </i-transition>
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
      default: true,
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
    const { windowWidth, windowHeight, windowTop = 0 } = getSystemInfoSync()
    console.log(getSystemInfoSync(), windowTop)
    return {
      positionMap: {
        center: {
          animate: 'fade',
          style: {
            position: 'relative',
          },
          wrapperStyle: {
            width: `${windowWidth}px`,
            height: `${windowHeight}px`,
          },
        },
        top: {
          animate: 'slide-down',
          style: {
            position: 'fixed',
            left: 0,
            right: 0,
            // #ifndef H5
            top: 0,
            // #endif
          },
        },
        bottom: {
          animate: 'slide-up',
          style: {
            position: 'fixed',
            left: 0,
            right: 0,
            // #ifndef H5
            bottom: 0,
            // #endif
          },
        },
        left: {
          animate: 'slide-left',
          style: {
            position: 'fixed',
            left: 0,
            top: `${windowTop}px`,
            bottom: 0,
          },
        },
        right: {
          animate: 'slide-right',
          style: {
            position: 'fixed',
            right: 0,
            top: `${windowTop}px`,
            bottom: 0,
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
      // #ifdef APP-NVUE
      e.stopPropagation()
      // #endif
    },
  },
}
</script>

<style lang="scss">
@import '../styles/index.scss';

.i-popup-wrapper {
  position: fixed;

  &--center {
    top: 0;
    left: 0;
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    align-items: center;
    justify-content: center;
  }
}

/* #ifdef H5 */
.i-popup {
  &--top {
    top: var(--window-top);
  }

  &--bottom {
    bottom: var(--window-bottom);
  }

  &--safe-bottom {
    @include safe-area-inset-bottom();
  }

  &--safe-top {
    @include safe-area-inset-top();
  }
}
/* #endif */
</style>
