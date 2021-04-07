<template>
  <view class="i-uploader">
    <view v-for="(item, index) in fileList" :key="index" class="i-uploader__preview">
      <image class="i-uploader__preview-image" mode="scaleToFill" :src="item.url" />
      <!-- <view class="i-uploader__upload">
        <text class="i-icon i-icon-photograph">{{ iconType['photograph'] }}</text>
      </view> -->
    </view>
    <view class="i-uploader__preview">
      <view class="i-uploader__upload">
        <slot>
          <text class="i-icon i-uploader__upload-icon">{{ iconType['photograph'] }}</text>
          <text v-if="uploadText" class="i-icon i-uploader__upload-text">{{ uploadText }}</text>
        </slot>
      </view>
    </view>
  </view>
</template>

<script>
import iconType from '../i-icon/type'

export default {
  name: 'IUploader',
  props: {
    fileList: {
      type: Array,
      default: () => [],
    },
    name: {
      type: String,
      default: '',
    },
    previewImage: {
      type: Boolean,
      default: true,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    deletable: {
      type: Boolean,
      default: true,
    },
    maxSize: {
      type: Number,
      default: 0,
    },
    maxCount: {
      type: Number,
      default: 0,
    },
    imageFit: {
      type: String,
      default: 'scaleToFill',
    },
    uploadText: {
      type: String,
      default: '选择图片',
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
    return {
      iconType,
    }
  },
  computed: {
    wrapperStyle() {
      const { rootStyle } = this

      return Object.assign({}, this.currentPosition.wrapperStyle, rootStyle)
    },
    mergeStyle() {
      const { customStyle } = this

      const positionStyle = {
        'transition-timing-function': 'ease',
        'background-color': '#fff',
        'z-index': 999,
        ...this.currentPosition.style,
      }

      return Object.assign({}, positionStyle, customStyle)
    },
    aniName() {
      return this.currentPosition.animate || 'fade'
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

.i-uploader {
  @include flex-box('row');

  &__preview {
    margin-right: 8px;
    margin-bottom: 8px;
    &-image {
      width: $uploader-size;
      height: $uploader-size;
    }
  }

  &__upload {
    position: relative;
    @include flex-box();
    align-items: center;
    justify-content: center;
    width: $uploader-size;
    height: $uploader-size;
    background-color: $uploader-upload-background-color;

    &-icon {
      font-size: $uploader-icon-size;
      color: $uploader-icon-color;
    }

    &-text {
      margin-top: 8rpx;
      font-size: $uploader-text-font-size;
      color: $uploader-text-color;
    }
  }
}
</style>
