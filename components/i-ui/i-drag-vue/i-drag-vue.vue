<template>
  <view class="i-icon" @click="onClick">
    <template v-if="isImage">
      <image class="i-icon-block_img" :style="[mergeStyle]" :src="name" mode="aspectFit" />
    </template>
    <template v-else>
      <text class="i-icon" :style="[mergeStyle]">{{ icon[name] || name }}</text>
    </template>
  </view>
</template>

<script>
import { addUnit } from '../utils'
import icon from './type'
import { COLOR_PALETTE, iconFontFamily, iconFontSrc } from '../index'
// #ifdef APP-PLUS-NVUE
const dom = weex.requireModule('dom')
dom.addRule('fontFace', {
  fontFamily: iconFontFamily,
  src: "url('" + iconFontSrc + "')",
})
// #endif

export default {
  name: 'IIcon',
  props: {
    name: {
      required: true,
      type: String,
      default: '',
    },
    size: {
      type: [Number, String],
      default: '16px',
    },
    color: {
      type: String,
      default: COLOR_PALETTE['gray-6'],
    },
    fontFamily: {
      type: String,
      default: iconFontFamily,
    },
    customStyle: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      icon,
    }
  },
  computed: {
    isImage() {
      return ~this.name.indexOf('/')
    },
    mergeStyle() {
      const { fontFamily, color, size, customStyle } = this
      const style = {}

      if (this.isImage) {
        if (size) {
          style.width = addUnit(size)
          style.height = addUnit(size)
        } else {
          console.error('image size is required')
        }
      } else {
        style.fontFamily = fontFamily
        style.fontSize = size ? addUnit(size) : '16px'
        style.color = color
      }

      return Object.assign({}, style, customStyle)
    },
  },
  methods: {
    onClick() {
      this.$emit('click')
    },
  },
}
</script>

<style lang="scss">
@import '../styles/index.scss';
</style>
