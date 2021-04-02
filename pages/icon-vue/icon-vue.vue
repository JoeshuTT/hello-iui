<template>
  <view class="container">
    <demo-block title="基础图标" padding>
      <view class="i-row demo-row">
        <view v-for="(item, index) in list" :key="index" class="i-col-6 demo-col">
          <i-icon size="32" color="#323233" :name="item.value" />
          <text class="demo-col-txt">{{ item.label }}</text>
        </view>
      </view>
    </demo-block>
    <demo-block title="图标图片" padding>
      <view class="i-row demo-row">
        <view class="i-col-6 demo-col">
          <i-icon name="https://b.yzcdn.cn/vant/icon-demo-1126.png" size="50" />
        </view>
      </view>
    </demo-block>
    <demo-block title="图标颜色" padding>
      <view class="i-row demo-row">
        <view class="i-col-6 demo-col">
          <i-icon name="fire-o" size="32rpx" color="#1989fa" />
        </view>
        <view class="i-col-6 demo-col">
          <i-icon name="smile-o" size="32" color="#07c160" />
        </view>
      </view>
    </demo-block>
    <demo-block title="图标大小" padding>
      <view class="i-row demo-row">
        <view class="i-col-6 demo-col">
          <i-icon name="circle" size="32rpx" color="#1989fa" />
        </view>
        <view class="i-col-6 demo-col">
          <i-icon name="circle" size="32" color="#07c160" />
        </view>
      </view>
    </demo-block>
    <demo-block title="使用 Unicode 方式，自定义图标" padding>
      <view class="i-row demo-row">
        <view v-for="(item, index) in list2" :key="index" class="i-col-6 demo-col">
          <i-icon font-family="myIcon" :name="item.value" size="32" color="#323233" />
          <text class="demo-col-txt">{{ item.label }}</text>
        </view>
      </view>
    </demo-block>
  </view>
</template>

<script>
// #ifdef APP-NVUE
const dom = weex.requireModule('dom')
dom.addRule('fontFace', {
  fontFamily: 'myIcon',
  src: "url('https://at.alicdn.com/t/font_720567_dnwdc9tepfd.ttf')",
})
// #endif
import pageMixin from '@/mixins/page'

export default {
  mixins: [pageMixin],
  data() {
    return {
      list: [
        {
          label: 'success',
          value: 'success',
        },
        {
          label: 'cross',
          value: 'cross',
        },

        {
          label: 'plus',
          value: 'plus',
        },
        {
          label: 'minus',
          value: 'minus',
        },
        {
          label: 'arrow',
          value: 'arrow',
        },
        {
          label: 'arrow-left',
          value: 'arrow-left',
        },
        {
          label: 'arrow-up',
          value: 'arrow-up',
        },
        {
          label: 'arrow-down',
          value: 'arrow-down',
        },
        {
          label: 'fail',
          value: 'fail',
        },
        {
          label: 'circle',
          value: 'circle',
        },
      ],
      list2: [
        {
          label: 'wechat',
          value: '\ue632',
        },
        {
          label: 'qq',
          value: '\ue624',
        },
        {
          label: 'weibo',
          value: '\ue630',
        },
        {
          label: 'share',
          value: '\ue62a',
        },
      ],
    }
  },
}
</script>

<style lang="scss">
.i-row {
  @include i-row();
}

.i-col-8 {
  @include i-col(8, 0, 690);
}

.i-col-6 {
  @include i-col(6, 0, 690);
}

.demo-row {
  background-color: #fff;
  border-radius: 4px;
}

.demo-col {
  padding: 15rpx 20rpx;
  align-items: center;
  justify-content: center;

  &-txt {
    font-size: 12px;
    line-height: 24px;
    color: #646566;
  }
}

/* #ifndef APP-NVUE */
/* 引入第三方或自定义的字体图标样式 */
@font-face {
  font-family: 'myIcon';
  src: url('https://at.alicdn.com/t/font_720567_dnwdc9tepfd.ttf') format('truetype');
}

.my-icon {
  font-family: 'myIcon';
}

/* #endif */
</style>
