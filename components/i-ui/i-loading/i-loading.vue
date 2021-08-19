<template>
  <view class="i-loading" :class="['i-loading--' + type, vertical && 'i-loading--vertical']">
    <!-- #ifndef APP-PLUS-NVUE -->
    <view v-if="!webviewHide" :class="['i-loading__spinner', 'i-loading__spinner--' + type]" :style="[mergeStyle]">
      <template v-if="type === 'spinner'">
        <view v-for="(item, index) in array12" :key="index" class="i-loading__dot" />
      </template>
    </view>
    <!-- #endif -->
    <!-- #ifdef APP-PLUS-NVUE -->
    <loading-indicator v-if="!webviewHide" :animating="true" class="i-loading-indicator" :style="[mergeStyle]" />
    <!-- #endif -->
    <text v-if="tip" class="i-loading__text" :class="[vertical && 'i-loading__text--vertical']">{{ tip }}</text>
  </view>
</template>

<script>
import { addUnit } from '../utils'

export default {
  name: 'ILoading',
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
    customStyle: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      webviewHide: false,
      array12: 12,
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
  // #ifdef APP-PLUS
  mounted() {
    var pages = getCurrentPages()
    var page = pages[pages.length - 1]
    var currentWebview = page.$getAppWebview()
    currentWebview.addEventListener('hide', () => {
      this.webviewHide = true
    })
    currentWebview.addEventListener('show', () => {
      this.webviewHide = false
    })
  },
  // #endif
}
</script>

<style lang="scss">
@import '../styles/index.scss';

.i-loading {
  @include flex-box('row');
  align-items: center;
  justify-content: center;
  // #ifndef APP-PLUS-NVUE
  color: $loading-spinner-color;
  // #endif
  &--vertical {
    flex-direction: column;
  }

  &-indicator {
    width: $loading-spinner-size;
    height: $loading-spinner-size;
    color: $loading-spinner-color;
  }

  &__text {
    margin-left: $padding-xs;
    color: $loading-text-color;
    font-size: $loading-text-font-size;
    line-height: $loading-text-line-height;

    &--vertical {
      margin: $padding-xs 0 0;
    }
  }
  // #ifndef APP-PLUS-NVUE
  &__spinner {
    position: relative;
    @include flex-box('row');
    width: $loading-spinner-size;
    height: $loading-spinner-size;
    max-width: 100%;
    max-height: 100%;
    animation: i-rotate $loading-spinner-animation-duration linear infinite;

    &--spinner {
      animation-timing-function: steps(12);
    }

    &--circular {
      border: 1px solid transparent;
      border-top-color: currentColor;
      border-radius: 50%;
    }
  }

  &__dot {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    &::before {
      display: block;
      width: 2px;
      height: 25%;
      margin: 0 auto;
      background-color: currentColor;
      border-radius: 40%;
      content: ' ';
    }
  }
  // #endif
}
// #ifndef APP-PLUS-NVUE
@for $i from 1 through 12 {
  .i-loading__dot:nth-of-type(#{$i}) {
    transform: rotate($i * 30deg);
    opacity: 1 - (0.75 / 12) * ($i - 1);
  }
}

@keyframes i-rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
// #endif
</style>
