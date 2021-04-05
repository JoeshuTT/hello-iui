<template>
  <view class="i-sku" :class="[customClass]"> Hi </view>
</template>

<script>
export default {
  // #ifdef MP
  // options: {
  //   styleIsolation: 'apply-shared',
  // },
  // #endif
  props: {
    customClass: {
      type: String,
      default: '',
    },
  },
  methods: {
    onWrapperClick(e) {
      console.log('onWrapperClick', e)
    },
    noop(e) {
      console.log('noop', e)
      // #ifdef APP-NVUE
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
