<template>
  <i-popup v-model="show" position="bottom" :custom-style="mergeStyle">
    <view class="sku-container">
      <view class="sku-header"> header </view>
      <view class="sku-body"> body </view>
      <view class="sku-action"> action </view>
    </view>
    <view class="sku-close">
      <i-icon size="32" color="#323233" class="sku-close-icon" name="cross" />
    </view>
  </i-popup>
</template>

<script>
export default {
  // #ifdef MP-WEIXIN
  // options: {
  //   styleIsolation: 'apply-shared',
  // },
  // #endif
  props: {
    show: {
      type: Boolean,
      default: true,
    },
    customClass: {
      type: String,
      default: '',
    },
  },
  computed: {
    mergeStyle() {
      const { customStyle } = this

      const style = {
        // #ifdef H5
        height: '80vh',
        // #endif
        'background-color': '#fff',
        'z-index': 999,
      }

      return Object.assign({}, style, customStyle)
    },
  },
  methods: {
    onWrapperClick(e) {
      console.log('onWrapperClick', e)
    },
    noop(e) {
      console.log('noop', e)
      // #ifdef APP-PLUS-NVUE
      e.stopPropagation()
      // #endif
    },
  },
}
</script>

<style>
.i-sku {
  width: 100px;
  height: 100px;
  background-color: #ccc;
  /* opacity: 0; */
}
</style>
