<template>
  <view class="i-row" :style="[mergeStyle]" @click="onClick">
    <slot />
  </view>
</template>

<script>
import { addUnit } from '../utils'

export default {
  name: 'IRowVue',
  props: {
    gutter: {
      type: [Number, String],
      default: 0,
    },
    customStyle: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    mergeStyle() {
      const { gutter, customStyle } = this
      let style = {}
      if (gutter) {
        const margin = addUnit(
          String(gutter).replace(/\d+/g, $1 => `${Number($1) / 2}`),
          'rpx',
        )

        style = {
          marginLeft: '-' + margin,
          marginRight: '-' + margin,
        }
      }

      return Object.assign({}, style, customStyle)
    },
  },
  provide() {
    return {
      gutter: this.gutter,
    }
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

.i-row {
  position: relative;
  box-sizing: border-box;

  &::after {
    display: table;
    content: '';
    clear: both;
  }
}
</style>
