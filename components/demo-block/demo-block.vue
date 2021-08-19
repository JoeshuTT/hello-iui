<template>
  <view class="demo-block" :class="[padding && 'demo-block--padding']">
    <text v-if="title" class="demo-block-title">{{ title }}</text>
    <view
      class="demo-block-body"
      :class="[row && 'demo-block-body-row', padding && 'demo-block-body-padding', card && 'demo-block-body-card']"
    >
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
    card: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss">
.demo-block {
  @include flex-box();

  &-title {
    height: 88rpx;
    padding: 25rpx 30rpx;
    color: rgba(69, 90, 100, 0.6);
    font-size: 14px;
  }

  &-body {
    &-row {
      @include flex-box('row');
    }

    &-padding {
      padding: 0 30rpx;
    }

    &-card {
      margin: 0 30rpx;
      overflow: hidden;
      border-radius: 8px;
      background-color: #fff;
    }
  }
}
</style>
