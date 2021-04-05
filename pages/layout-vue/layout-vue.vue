<template>
  <view class="container">
    <demo-block title="基础用法" padding>
      <i-row-vue class="mb20">
        <i-col-vue span="8" class="demo-col dark">span: 8</i-col-vue>
        <i-col-vue span="8" class="demo-col light">span: 8</i-col-vue>
        <i-col-vue span="8" class="demo-col dark">span: 8</i-col-vue>
      </i-row-vue>
      <i-row-vue class="mb20">
        <i-col-vue span="4" class="demo-col dark">span: 4</i-col-vue>
        <i-col-vue span="10" offset="4" class="demo-col dark">offset: 4, span: 10</i-col-vue>
      </i-row-vue>
      <i-row-vue class="mb20">
        <i-col-vue offset="12" span="12" class="demo-col dark">offset: 12, span: 12</i-col-vue>
      </i-row-vue>
    </demo-block>
    <demo-block title="设置列元素间距" padding>
      <i-row-vue gutter="40">
        <i-col-vue span="8" class="demo-col dark">span: 8</i-col-vue>
        <i-col-vue span="8" class="demo-col light">span: 8</i-col-vue>
        <i-col-vue span="8" class="demo-col dark">span: 8</i-col-vue>
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
.mb20 {
  margin-bottom: 20rpx;
}
.demo-col {
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
