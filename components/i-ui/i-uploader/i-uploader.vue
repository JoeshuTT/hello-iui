<template>
  <view class="i-uploader">
    <view v-for="(item, index) in fileList" :key="index" class="i-uploader__preview">
      <image class="i-uploader__preview-image" mode="scaleToFill" :src="item.url" />
      <view class="i-uploader__preview-delete">
        <text class="i-icon i-uploader__preview-delete-icon">{{ iconType['cross'] }}</text>
      </view>
      <!-- <view class="i-uploader__upload">
        <text class="i-icon i-icon-photograph">{{ iconType['photograph'] }}</text>
      </view> -->
    </view>
    <view class="i-uploader__preview" @click="startUpload">
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
import { getExtName } from '../utils'

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
    sizeType: {
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
    formatFile(res) {
      return res.tempFiles.map(item => {
        const file = {
          url: item.path,
          type: getExtName(item.path), // H5 返回的是blob对象，没有后缀名
          // #ifndef H5
          size: res.size,
          // #endif
        }

        return file
      })
    },
    getDetail(index) {
      return {
        name: this.name,
        index: index == null ? this.fileList.length : index,
      }
    },
    startUpload() {
      // const { multiple } = this
      uni.chooseImage({
        count: 6, //默认9
        // sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album'], //从相册选择
        success: res => {
          console.log(JSON.stringify(res))
          console.log(JSON.stringify(res.tempFiles))
          this.$emit('afterRead', Object.assign({ file: this.formatFile(res) }, this.getDetail()))
        },
      })
    },
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

.i-popup-wrapper {
  position: fixed;

  &--center {
    top: 0;
    left: 0;
    /* #ifndef APP-PLUS-NVUE */
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
