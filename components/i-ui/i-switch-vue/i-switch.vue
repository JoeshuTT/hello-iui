<template>
  <view
    class="i-switch"
    :class="[checked === activeValue ? 'i-switch--on' : '', disabled && 'i-switch--disabled']"
    :style="{ backgroundColor: activeColor ? bgColor : '' }"
    @click="onClick"
  >
    <view class="i-switch__node" :class="[checked === activeValue ? 'i-switch__node--on' : '']" />
  </view>
</template>

<script>
export default {
  name: 'ISwitch',
  model: {
    prop: 'checked',
    event: 'input',
  },
  props: {
    checked: {
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
      default: '',
    },
    inactiveColor: {
      type: String,
      default: '',
    },
    activeValue: {
      type: null,
      default: true,
    },
    inactiveValue: {
      type: null,
      default: false,
    },
    customStyle: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      bgColor: '',
    }
  },
  created() {
    if (this.activeColor) {
      this.bgColor = this.checked === this.activeValue ? this.activeColor : this.inactiveColor
    }
  },
  methods: {
    onClick() {
      const { activeValue, inactiveValue } = this
      if (!this.disabled && !this.loading) {
        const checked = this.checked === activeValue
        const value = checked ? inactiveValue : activeValue

        if (this.activeColor) {
          this.bgColor = value ? this.activeColor : this.inactiveColor
        }
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
  /* #ifndef APP-NVUE */
  box-sizing: border-box;
  /* #endif */
  position: relative;
  width: $switch-width;
  height: $switch-height;
  border-width: 1px;
  border-style: solid;
  border-color: $switch-border-color;
  border-radius: $switch-node-size;
  background-color: $switch-background-color;
  transition: background-color $switch-transition-duration;

  &--on {
    background-color: $switch-on-background-color;
  }

  &__node {
    /* #ifndef APP-NVUE */
    box-sizing: border-box;
    /* #endif */
    &--on {
      transform: translateX($switch-node-size);
    }

    position: absolute;
    top: 0;
    left: 0;
    transform: translateX(0);
    /* #ifndef APP-NVUE */
    z-index: $switch-node-z-index;
    /* #endif */
    width: $switch-node-size;
    height: $switch-node-size;
    background-color: $switch-node-background-color;
    border-radius: $switch-node-size;
    box-shadow: $switch-node-box-shadow;
    /* #ifndef APP-NVUE */
    /* #endif */
    /* #ifdef APP-NVUE */
    // border-width: 1px;
    // border-style: solid;
    // border-color: #dfdfdf;
    /* #endif */
    transition: transform $switch-transition-duration ease-in-out;
  }

  &--disabled {
    opacity: $switch-disabled-opacity;
  }
}
</style>
