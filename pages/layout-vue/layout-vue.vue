<template>
  <view class="container">
    <demo-block title="基础用法" padding>
      <i-row-vue :custom-style="{ 'margin-bottom': '20rpx' }">
        <i-col-vue span="8"><text class="demo-col-text dark">span: 8</text></i-col-vue>
        <i-col-vue span="8"><text class="demo-col-text dark">span: 8</text></i-col-vue>
        <i-col-vue span="8"><text class="demo-col-text dark">span: 8</text></i-col-vue>
      </i-row-vue>
      <i-row-vue :custom-style="{ 'margin-bottom': '20rpx' }">
        <i-col-vue span="4"><text class="demo-col-text dark">span: 4</text></i-col-vue>
        <i-col-vue span="10" offset="4"><text class="demo-col-text dark">offset: 4, span: 10</text></i-col-vue>
      </i-row-vue>
      <i-row-vue :custom-style="{ 'margin-bottom': '20rpx' }">
        <i-col-vue offset="12" span="12"><text class="demo-col-text dark">offset: 12, span: 12</text></i-col-vue>
      </i-row-vue>
    </demo-block>
    <demo-block title="设置列元素间距" padding>
      <i-row-vue gutter="40">
        <i-col-vue span="8"><text class="demo-col-text dark">span: 8</text></i-col-vue>
        <i-col-vue span="8"><text class="demo-col-text light">span: 8</text></i-col-vue>
        <i-col-vue span="8"><text class="demo-col-text dark">span: 8</text></i-col-vue>
      </i-row-vue>
    </demo-block>
  </view>
</template>

<script>
import pageMixin from '@/mixins/page'
export default {
  mixins: [pageMixin],
  data() {
    return {}
  },
  onLoad() {},
  methods: {},
}
</script>

<style lang="scss">
.demo-col {
  margin-bottom: 20rpx;

  &-text {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.dark,
.light {
  text-align: center;
  color: #fff;
  font-size: 14px;
  line-height: 30px;
}

.dark {
  background-color: #39a9ed;
}

.light {
  background-color: #66c6f2;
}
</style>
