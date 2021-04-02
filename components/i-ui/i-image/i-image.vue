<template>
  <view class="i-image" :class="[round && 'i-image--round']">
    <!-- #ifndef APP-NVUE -->
    <!--图片加载器 start -->
    <image style="width: 0; height: 0; display: none" :src="src" @load="onImgLoad" @error="onImgError" />
    <!--图片加载器 end -->
    <image
      :src="url"
      class="i-image__img"
      :mode="mode"
      :lazy-load="lazyLoad"
      :show-menu-by-longpress="showMenuByLongpress"
      :style="[mergeStyle]"
      :class="[fadeShow && 'fade-out', fadeShow && loaded ? 'fade-in' : '']"
    />
    <view v-if="showLoading && loading" class="i-image__loading">
      <slot name="loading"><i-icon name="photo" size="24" color="#dcdee0" /></slot>
    </view>
    <view v-if="showError && error" class="i-image__error">
      <slot name="error"><i-icon name="photo-fail" size="24" color="#dcdee0" /></slot>
    </view>
    <!-- #endif -->
    <!-- #ifdef APP-NVUE -->
    <image
      :style="[mergeStyle]"
      :src="src"
      :lazy-load="lazyLoad"
      :mode="mode"
      :fade-show="fadeShow"
      class="i-image__img"
      @load="onImgLoad"
      @error="onImgError"
    />
    <!-- #endif -->
  </view>
</template>

<script>
import IIcon from '../i-icon/i-icon'
import { addUnit, isNumber } from '../utils'
var imagePlaceholder = ''
// #ifdef APP-NVUE
import { IMAGE } from '../index'
imagePlaceholder = IMAGE.placeHolder
// #endif

export default {
  name: 'IImage',
  components: {
    IIcon,
  },
  props: {
    src: {
      type: String,
      default: imagePlaceholder,
    },
    mode: {
      type: String,
      default: 'scaleToFill',
    },
    width: {
      required: true,
      type: [Number, String],
      default: '',
    },
    height: {
      required: true,
      type: [Number, String],
      default: '',
    },
    radius: {
      type: [Number, String],
      default: '',
    },
    preLoad: {
      type: Boolean,
      default: true,
    },
    lazyLoad: {
      type: Boolean,
      default: false,
    },
    showMenuByLongpress: {
      type: Boolean,
      default: false,
    },
    fadeShow: {
      type: Boolean,
      default: false,
    },
    showError: {
      type: Boolean,
      default: true,
    },
    showLoading: {
      type: Boolean,
      default: true,
    },
    round: {
      type: Boolean,
      default: false,
    },
    customStyle: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      url: '',
      loading: true,
      loaded: false,
      error: false,
    }
  },
  computed: {
    mergeStyle() {
      const { width, height, mode, radius, round, customStyle } = this
      const viewStyle = {}

      if (width && height) {
        viewStyle.width = addUnit(width, 'rpx')
        viewStyle.height = addUnit(height, 'rpx')
      } else {
        // #ifdef APP-NVUE
        // viewStyle = { width: '300px', height: '225px' }
        // #endif
      }

      // #ifdef APP-NVUE
      if (round) {
        if (isNumber(width)) {
          viewStyle.borderRadius = addUnit(width / 2, 'rpx')
        } else {
          viewStyle.borderRadius = addUnit(
            width.replace(/\d+/g, $1 => `${Number($1) / 2}`),
            'rpx',
          )
        }
      }
      // #endif

      if (radius) {
        viewStyle.borderRadius = addUnit(radius)
      }

      if (mode === 'aspectFit') {
        viewStyle.backgroundColor = 'rgba(0,0,0,0)'
      }

      return Object.assign({}, viewStyle, customStyle)
    },
  },
  methods: {
    onClick() {
      this.$emit('click')
    },
    onImgLoad(event) {
      this.loading = false
      this.url = this.src
      this.loaded = true
      this.$emit('load', event)
    },
    onImgError(event) {
      this.loading = false
      this.error = true
      // #ifdef APP-NVUE
      // eslint-disable-next-line vue/no-mutating-props
      this.src = imagePlaceholder
      // #endif
      this.$emit('error', event)
    },
  },
}
</script>

<style lang="scss">
@import '../styles/index.scss';

.i-image {
  position: relative;
  /* #ifndef APP-NVUE */
  overflow: hidden;

  &--round {
    border-radius: 50%;
  }
  /* #endif */
}

/* #ifndef APP-NVUE */
.i-image__img {
  position: relative;
  transition-property: opacity;
  transition-timing-function: ease;
  transition-duration: $image-transition-duration;
  background-color: $image-placeholder-background-color;
}

.i-image__img,
.i-image__loading,
.i-image__error {
  display: block;
  width: 100%;
  height: 100%;
}

.i-image__loading,
.i-image__error {
  background-color: $image-placeholder-background-color;
  color: $image-placeholder-text-color;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fade-out {
  opacity: 0;
}

.fade-in {
  opacity: 1;
}
/* #endif */
</style>
