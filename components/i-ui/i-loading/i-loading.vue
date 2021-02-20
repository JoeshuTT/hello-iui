<template>
  <view class="i-loading" :class="['i-loading--' + type, vertical && 'i-loading--vertical']">
    <!-- #ifdef H5 -->
    <svg
      width="24"
      height="24"
      viewBox="25 25 50 50"
      :style="{ width: 20 + 'px', height: 20 + 'px' }"
      class="uni-load-more__img uni-load-more__img--android-H5"
    >
      <circle cx="50" cy="50" r="20" fill="none" :style="{ color: '#000' }" :stroke-width="3"></circle>
    </svg>
    <!-- #endif -->
    <!-- #ifndef APP-NVUE -->
    <!-- <view v-if="!webviewHide" class="i-loading__spinner" :class="'i-loading__spinner--' + type" :style="[mergeStyle]">
      <template v-if="type === 'circular'" />
      <template v-else>
        <view v-for="(v, i) in 12" :key="i" class="i-loading__dot" />
      </template>
    </view> -->
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
.uni-load-more {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: row;
  height: 40px;
  align-items: center;
  justify-content: center;
}

.uni-load-more__text {
  font-size: 15px;
}

.uni-load-more__img {
  width: 24px;
  height: 24px;
  margin-right: 8px;
}

.uni-load-more__img--nvue {
  color: #666666;
}

.uni-load-more__img--android,
.uni-load-more__img--ios {
  width: 24px;
  height: 24px;
  transform: rotate(0deg);
}

/* #ifndef APP-NVUE */
.uni-load-more__img--android {
  animation: loading-ios 1s 0s linear infinite;
}

@keyframes loading-android {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.uni-load-more__img--ios-H5 {
  position: relative;
  animation: loading-ios-H5 1s 0s step-end infinite;
}

.uni-load-more__img--ios-H5 > image {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}

@keyframes loading-ios-H5 {
  0% {
    transform: rotate(0deg);
  }

  8% {
    transform: rotate(30deg);
  }

  16% {
    transform: rotate(60deg);
  }

  24% {
    transform: rotate(90deg);
  }

  32% {
    transform: rotate(120deg);
  }

  40% {
    transform: rotate(150deg);
  }

  48% {
    transform: rotate(180deg);
  }

  56% {
    transform: rotate(210deg);
  }

  64% {
    transform: rotate(240deg);
  }

  73% {
    transform: rotate(270deg);
  }

  82% {
    transform: rotate(300deg);
  }

  91% {
    transform: rotate(330deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

/* #endif */
/* #ifdef H5 */
.uni-load-more__img--android-H5 {
  animation: loading-android-H5-rotate 2s linear infinite;
  transform-origin: center center;
}

.uni-load-more__img--android-H5 > circle {
  display: inline-block;
  animation: loading-android-H5-dash 1.5s ease-in-out infinite;
  stroke: currentColor;
  stroke-linecap: round;
}

@keyframes loading-android-H5-rotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes loading-android-H5-dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -40;
  }

  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -120;
  }
}

/* #endif */
/* #ifndef APP-NVUE || H5 */
.uni-load-more__img--android-MP {
  position: relative;
  width: 24px;
  height: 24px;
  transform: rotate(0deg);
  animation: loading-ios 1s 0s ease infinite;
}

.uni-load-more__img--android-MP > view {
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: solid 2px transparent;
  border-top: solid 2px #777777;
  transform-origin: center;
}

.uni-load-more__img--android-MP > view:nth-child(1) {
  animation: loading-android-MP-1 1s 0s linear infinite;
}

.uni-load-more__img--android-MP > view:nth-child(2) {
  animation: loading-android-MP-2 1s 0s linear infinite;
}

.uni-load-more__img--android-MP > view:nth-child(3) {
  animation: loading-android-MP-3 1s 0s linear infinite;
}

@keyframes loading-android {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes loading-android-MP-1 {
  0% {
    transform: rotate(0deg);
  }

  50% {
    transform: rotate(90deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes loading-android-MP-2 {
  0% {
    transform: rotate(0deg);
  }

  50% {
    transform: rotate(180deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes loading-android-MP-3 {
  0% {
    transform: rotate(0deg);
  }

  50% {
    transform: rotate(270deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

/* #endif */
</style>
