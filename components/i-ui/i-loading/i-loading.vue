<template>
  <view class="i-loading" :class="[customClass, 'i-loading--' + type, vertical && 'i-loading--vertical']">
    <!-- #ifndef APP-NVUE -->
    <view v-if="!webviewHide" class="i-loading__spinner" :class="'i-loading__spinner--' + type" :style="[mergeStyle]">
      <template v-if="type === 'circular'" />
      <template v-else>
        <view v-for="(v, i) in 12" :key="i" class="i-loading__dot" />
      </template>
    </view>
    <!-- #endif -->
    <!-- #ifdef APP-NVUE -->
    <loading-indicator v-if="!webviewHide" class="i-loading-indicator" :animating="true" :style="[mergeStyle]" />
    <!-- #endif -->
    <text v-if="tip" :class="[vertical ? 'i-loading--vertical__text' : 'i-loading__text']" :style="[textStyle]">{{
      tip
    }}</text>
  </view>
</template>

<script>
import IComponent from '../mixins/component'
import { addUnit } from '../utils'

export default {
  name: 'ILoading',
  mixins: [IComponent],
  props: {
    type: {
      type: String,
      default: 'circular',
    },
    color: {
      type: String,
      default: '',
    },
    size: {
      type: [Number, String],
      default: '',
    },
    vertical: {
      type: Boolean,
      default: false,
    },
    tip: {
      type: String,
      default: '',
    },
    textStyle: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      show: true,
      webviewHide: false,
    }
  },
  computed: {
    mergeStyle() {
      const { color, size, customStyle } = this
      const viewStyle = {}
      color && (viewStyle.color = color)
      size && (viewStyle.width = addUnit(size, 'rpx'))
      size && (viewStyle.height = addUnit(size, 'rpx'))

      return Object.assign({}, viewStyle, customStyle)
    },
  },
  mounted() {
    // #ifdef APP-PLUS
    if (this.show) {
      var pages = getCurrentPages()
      var page = pages[pages.length - 1]
      var currentWebview = page.$getAppWebview()
      currentWebview.addEventListener('hide', () => {
        this.webviewHide = true
      })
      currentWebview.addEventListener('show', () => {
        this.webviewHide = false
      })
    }
    // #endif
  },
  methods: {
    onClick(event) {
      this.$emit('click', event)
    },
  },
}
</script>

<style lang="scss">
@import '../styles/index.scss';

.i-loading {
  position: relative;
  @include flex-box('row');
  align-items: center;
  &--vertical {
    flex-direction: column;
    justify-content: center;
    &__text {
      margin-top: 8px;
      color: $loading-text-color;
      font-size: $loading-text-font-size;
    }
  }

  &__text {
    margin-left: 8px;
    color: $loading-text-color;
    font-size: $loading-text-font-size;
  }
}

/* #ifndef APP-NVUE */
.i-loading {
  color: $loading-spinner-color;
  font-size: 0;
  vertical-align: middle;

  &__spinner {
    position: relative;
    display: inline-block;
    width: $loading-spinner-size;
    max-width: 100%;
    height: $loading-spinner-size;
    max-height: 100%;
    vertical-align: middle;
    animation: i-rotate $loading-spinner-animation-duration linear infinite;

    &--spinner {
      animation-timing-function: steps(12);
    }

    &--circular {
      border: 1px solid transparent;
      border-top-color: initial;
      border-radius: 100%;
    }
  }

  &__dot {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    &::before {
      content: '';
      display: block;
      width: 2px;
      height: 25%;
      margin: 0 auto;
      background-color: currentColor;
      border-radius: 40%;
    }
  }
}

@for $i from 1 through 12 {
  .i-loading__dot:nth-of-type(#{$i}) {
    transform: rotate($i * 30deg);
    opacity: 1 - (0.75 / 12) * ($i - 1);
  }
}

/* #endif */

/* #ifdef APP-NVUE */
.i-loading-indicator {
  width: $loading-spinner-size;
  height: $loading-spinner-size;
  color: $loading-spinner-color;
}
/* #endif */
</style>
