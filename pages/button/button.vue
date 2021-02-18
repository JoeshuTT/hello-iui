<template>
  <view class="container">
    <demo-block title="按钮类型" padding>
      <i-button class="mb20" custom-class="mb20" type="default">默认按钮</i-button>
      <i-button class="mb20" custom-class="mb20" type="primary">主要按钮</i-button>
      <i-button class="mb20" custom-class="mb20" type="info"><text>信息按钮</text></i-button>
      <i-button class="mb20" custom-class="mb20" type="warning" text="警告按钮" />
      <i-button class="mb20" custom-class="mb20" type="danger" text="危险按钮" />
    </demo-block>
    <demo-block title="朴素按钮" padding>
      <i-button class="mb20" custom-class="mb20" type="default" plain>朴素按钮</i-button>
      <i-button class="mb20" custom-class="mb20" type="primary" plain>朴素按钮</i-button>
    </demo-block>
    <demo-block title="禁用状态" padding>
      <i-button class="mb20" custom-class="mb20" type="default" disabled>禁用状态</i-button>
      <i-button class="mb20" custom-class="mb20" type="primary" disabled>禁用状态</i-button>
    </demo-block>
    <demo-block title="加载状态" padding>
      <i-button class="mb20" custom-class="mb20" loading />
      <i-button class="mb20" custom-class="mb20" loading type="primary" loading-type="spinner" />
      <i-button class="mb20" custom-class="mb20" loading loading-type="spinner" type="primary">加载中...</i-button>
    </demo-block>
    <demo-block title="按钮形状" padding>
      <i-button class="mb20" custom-class="mb20" type="primary" square>方形按钮</i-button>
      <i-button class="mb20" custom-class="mb20" type="info" round>圆形按钮</i-button>
    </demo-block>
    <demo-block title="图标按钮" padding>
      <i-button class="mb20" custom-class="mb20" icon="success" />
      <i-button class="mb20" custom-class="mb20" icon="success" type="primary">按钮</i-button>
      <i-button class="mb20" custom-class="mb20" icon="/static/logo.png" type="info" />
    </demo-block>
    <demo-block title="自定义颜色" padding>
      <i-button class="mb20" custom-class="mb20" color="#7232dd">单色按钮</i-button>
      <i-button class="mb20" custom-class="mb20" color="#7232dd" plain>单色按钮</i-button>
      <i-button class="mb20" custom-class="mb20" color="linear-gradient(to right, #4bb0ff, #6149f6)"
        >渐变色按钮</i-button
      >
    </demo-block>
    <demo-block title="自定义样式" padding>
      <i-button
        class="mb20"
        custom-class="mb20"
        :custom-style="{ width: '100px', height: '100px', borderRadius: '20rpx' }"
        >单色按钮</i-button
      >
    </demo-block>
    <!-- #ifdef MP -->
    <demo-block title="开放能力" padding>
      <i-button open-type="getUserInfo" type="primary" class="mb20" custom-class="mb20" @getuserinfo="getUserInfo"
        >获取用户信息</i-button
      >
    </demo-block>
    <!-- #endif -->
  </view>
</template>

<script>
import pageMixin from '@/mixins/page'

export default {
  mixins: [pageMixin],
  data() {
    return {
      a: { backgroundColor: '#7232dd' },
    }
  },
  onLoad() {},
  methods: {
    getUserInfo(detail) {
      console.log(detail)
    },
  },
}
</script>

<style lang="scss">
.mb20 {
  margin-bottom: 20rpx;
}

.a {
  background-color: red;
}
</style>
