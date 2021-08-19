<template>
  <view :style="[customStyle]">
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
export default {
  name: 'ICellGroup',
  props: {
    title: {
      type: String,
      default: '',
    },
    border: {
      type: Boolean,
      default: true,
    },
    customStyle: {
      type: Object,
      default: () => ({}),
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
    /* #ifndef APP-PLUS-NVUE */
    &::after {
      @include hairline-bottom();
    }
    /* #endif */
    /* #ifdef APP-PLUS-NVUE */
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-bottom-color: $cell-border-color;
    /* #endif */
  }
}
</style>
