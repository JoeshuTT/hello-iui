<template>
  <view :class="[classPrefix, classPrefix + '-' + name]" :style="[mergeStyle]" @click="onClick">
    <image v-if="computed.isImage(name)" class="i-icon__image" :src="name" mode="aspectFit" />
  </view>
</template>
<!-- eslint-disable-next-line -->
<script module="computed" lang="wxs">
function isImage(name) {
  return name.indexOf('/') !== -1;
}

module.exports = {
  isImage: isImage,
}
</script>
<!-- #endif -->
<script>
import { addUnit } from '../utils'
import { COLOR_PALETTE, iconFontFamily } from '../index'

export default {
  name: 'IIconVue',
  props: {
    name: {
      required: true,
      type: String,
      default: '',
    },
    size: {
      type: [Number, String],
      default: '',
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
  computed: {
    mergeStyle() {
      const { color, size, customStyle } = this
      const style = {}

      if (~this.name.indexOf('/')) {
        if (size) {
          style.width = addUnit(size)
          style.height = addUnit(size)
        } else {
          console.error('image size is required')
        }
      } else {
        size && (style.fontSize = addUnit(size))
        color && (style.color = color)
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

.i-icon__image {
  width: 100%;
  height: 100%;
}

@font-face {
  font-family: iuiIconFont;
  src: url($iconFontUrl) format('truetype');
}

.i-icon {
  position: relative;
  font-family: iuiIconFont;
  line-height: inherit;
  font-weight: normal;
  font-size: inherit;
  text-rendering: auto;
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
