<template>
  <view class="i-col" :class="['i-col--' + span, 'i-col-offset--' + offset]" :style="[mergeStyle]" @click="onClick">
    <slot />
  </view>
</template>

<script>
import { addUnit } from '../utils'

export default {
  name: 'IcolVue',
  inject: {
    gutter: {
      default: 0,
    },
  },
  props: {
    span: {
      type: [Number, String],
      default: 0,
    },
    offset: {
      type: [Number, String],
      default: 0,
    },
  },
  computed: {
    mergeStyle() {
      const { gutter, customStyle } = this
      const style = {}
      if (gutter) {
        const padding = addUnit(
          String(gutter).replace(/\d+/g, $1 => `${Number($1) / 2}`),
          'rpx',
        )
        style.paddingLeft = padding
        style.paddingRight = padding
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

.i-col {
  box-sizing: border-box;
  float: left;
  min-height: 1px;
}

@for $i from 1 through 24 {
  .i-col-offset--#{$i} {
    margin-left: 100 / 24 * $i * 1%;
  }

  .i-col--#{$i} {
    width: 100 / 24 * $i * 1%;
  }
}
</style>
