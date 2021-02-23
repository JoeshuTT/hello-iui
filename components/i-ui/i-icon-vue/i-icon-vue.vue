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
<!-- eslint-disable-next-line -->
<script module="computed" lang="wxs" src="./index.wxs"></script>
<!-- #endif -->
<script>
import { addUnit } from '../utils'
import icon from './type'
import { COLOR_PALETTE, iconFontFamily, iconFontSrc } from '../common/config'

export default {
  name: 'IIcon',
  props: {
    size: {
      type: [Number, String],
      default: iconFontFamily,
    },
    color: {
      type: String,
      default: '',
    },
    classPrefix: {
      type: String,
      default: 'i-icon',
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
        style.fontFamily = fontFamily || iconFontFamily
        style.fontSize = size ? addUnit(size) : '16px'
        style.color = color || COLOR_PALETTE['gray-6']
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

@font-face {
  font-family: $iconFontFamily;
  src: url($iconFontUrl) format('truetype');
}

.i-icon {
  line-height: inherit;
  font-weight: normal;
  -webkit-font-smoothing: antialiased;
}
.i-icon,
.i-icon:before {
  display: inline-block;
}

.i-icon-replay:before {
  content: '\e667';
}

.i-icon-fire-o:before {
  content: '\e665';
}

.i-icon-smile-o:before {
  content: '\e666';
}

.i-icon-photo-fail:before {
  content: '\e664';
}

.i-icon-photo:before {
  content: '\e662';
}

.i-icon-photo-o:before {
  content: '\e663';
}

.i-icon-arrow:before {
  content: '\e640';
}

.i-icon-arrow-down:before {
  content: '\e641';
}

.i-icon-arrow-up:before {
  content: '\e642';
}

.i-icon-circle:before {
  content: '\e643';
}

.i-icon-minus:before {
  content: '\e644';
}

.i-icon-arrow-left:before {
  content: '\e645';
}

.i-icon-plus:before {
  content: '\e646';
}

.i-icon-success:before {
  content: '\e647';
}

.i-icon-cross:before {
  content: '\e648';
}

.i-icon-fail:before {
  content: '\e649';
}
</style>
