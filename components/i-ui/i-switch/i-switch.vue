<template>
  <view class="i-switch" :class="[disabled && 'i-switch--disabled']" :style="[mergeStyle]" @click="onToggle">
    <view class="i-switch__node" :style="[dotStyle]" />
  </view>
</template>
<script>
import { splitUnit } from '../utils'
import { COLOR_PALETTE } from '../index'

export default {
  name: 'ISwitch',
  props: {
    value: {
      type: null,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    activeColor: {
      type: String,
      default: COLOR_PALETTE.blue,
    },
    inactiveColor: {
      type: String,
      default: COLOR_PALETTE['gray-5'],
    },
    activeValue: {
      type: null,
      default: true,
    },
    inactiveValue: {
      type: null,
      default: false,
    },
    size: {
      type: [Number, String],
      default: 60,
    },
    customStyle: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    calcSize() {
      return { ...splitUnit(this.size, 'rpx') }
    },
    mergeStyle() {
      const { activeColor, inactiveColor, customStyle } = this
      const { num: size, unit } = this.calcSize

      const style = {
        width: `${size * 2}${unit}`,
        height: `${size}${unit}`,
        borderRadius: `${size / 2}${unit}`,
        backgroundColor: this.value === this.activeValue ? activeColor : inactiveColor,
        borderColor: this.value === this.activeValue ? activeColor : inactiveColor,
      }

      return Object.assign({}, style, customStyle)
    },
    dotStyle() {
      const { num: size, unit } = this.calcSize
      const width = size - 4
      const style = {
        width: `${width}${unit}`,
        height: `${width}${unit}`,
        borderRadius: `${width / 2}${unit}`,
        marginLeft: '1px',
        transform: this.value === this.activeValue ? `translateX(${size}${unit})` : 'translateX(0)',
      }

      return Object.assign({}, style)
    },
  },
  methods: {
    onToggle() {
      const { activeValue, inactiveValue } = this
      if (!this.disabled && !this.loading) {
        const value = this.value === activeValue ? inactiveValue : activeValue

        this.$emit('input', value)
        this.$emit('change', value)
      }
    },
  },
}
</script>

<style lang="scss">
@import '../styles/index.scss';

.i-switch {
  @include flex-box('row');
  position: relative;
  align-items: center;
  transition: background-color $switch-transition-duration;

  &__node {
    transition: transform $switch-transition-duration ease-in-out;
    background-color: $switch-node-background-color;
  }

  &--disabled {
    opacity: $switch-disabled-opacity;
  }
}
</style>
