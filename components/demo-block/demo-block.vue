<template>
  <view class="demo-block" :class="[padding && 'demo-block--padding']">
    <text v-if="title" class="demo-block-title" :style="{ paddingLeft: padding ? '0' : '30rpx' }">{{ title }}</text>
    <view class="demo-block-body" :class="[row && 'demo-block-body--row']">
      <slot />
    </view>
  </view>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    padding: {
      type: Boolean,
      default: false,
    },
    row: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss">
.demo-block {
  @include flex-box();
  &--padding {
    padding: 0 30rpx 20rpx;
  }

  &-title {
    font-size: 14px;
    color: rgba(69, 90, 100, 0.6);
    padding: 30rpx 15rpx;
  }

  &-body {
    &--row {
      @include flex-box('row');
    }
  }
}
</style>
