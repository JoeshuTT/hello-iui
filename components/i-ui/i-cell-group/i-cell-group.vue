<template>
  <view :style="[customStyle]" :class="[customClass]">
    <view v-if="title" class="i-cell-group__title">
      <slot name="title"
        ><text class="i-cell-group__title__text">{{ title }}</text></slot
      >
    </view>
    <view class="i-cell-group" :class="[border ? 'i-cell-group--border' : '']">
      <slot />
    </view>
  </view>
</template>

<script>
import IComponent from '../mixins/component'

export default {
  name: 'ICellGroup',
  mixins: [IComponent],
  props: {
    title: {
      type: String,
      default: '',
    },
    border: {
      type: Boolean,
      default: true,
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

.i-cell-group {
  position: relative;
  background-color: $white;
  &__title {
    padding: $cell-group-title-padding;

    &__text {
      font-size: $cell-group-title-font-size;
      line-height: $cell-group-title-line-height;
      color: $cell-group-title-color;
    }
  }

  &--border {
    /* #ifndef APP-NVUE */
    &::after {
      @include hairline-bottom();
    }
    /* #endif */
    /* #ifdef APP-NVUE */
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-bottom-color: $cell-border-color;
    /* #endif */
  }
}
</style>
