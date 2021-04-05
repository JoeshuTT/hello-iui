<template>
  <view class="container">
    <demo-block title="基础图标" padding>
      <view class="i-row demo-row">
        <view v-for="(item, index) in list" :key="index" class="i-col-6 demo-col">
          <i-icon-vue :name="item.value" :class="[item.class]" />
          <text class="demo-col-txt">{{ item.label }}</text>
        </view>
      </view>
    </demo-block>
    <demo-block title="图标图片" padding>
      <view class="i-row demo-row">
        <view class="i-col-6 demo-col">
          <i-icon-vue
            name="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-386415c0-10b5-4a03-a868-8fb41b9e886e/807e328f-f2d8-42e1-b8b8-099ea2f2a20e.png"
            size="50"
          />
        </view>
      </view>
    </demo-block>
    <demo-block title="图标颜色" padding>
      <view class="i-row demo-row">
        <view class="i-col-6 demo-col">
          <i-icon-vue name="fire-o" size="32rpx" color="#1989fa" />
        </view>
        <view class="i-col-6 demo-col">
          <i-icon-vue name="smile-o" size="32" color="#07c160" />
        </view>
      </view>
    </demo-block>
    <demo-block title="图标大小" padding>
      <view class="i-row demo-row">
        <view class="i-col-6 demo-col">
          <i-icon-vue name="circle" size="32rpx" color="#1989fa" />
        </view>
        <view class="i-col-6 demo-col">
          <i-icon-vue name="circle" size="32" color="#07c160" />
        </view>
      </view>
    </demo-block>
    <demo-block title="使用 Font class 方式，自定义图标" padding>
      <view class="i-row demo-row">
        <view v-for="(item, index) in list2" :key="index" class="i-col-6 demo-col">
          <i-icon-vue class-prefix="my-icon" :name="item.label" />
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
        {
          label: 'replay',
          value: 'replay',
          class: 'i-rotate',
        },
      ],
      list2: [
        {
          label: 'weichat',
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
  font-size: 32px;
  color: #323232;
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

.i-rotate {
  animation: rotate 1s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
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

.my-icon-back:before {
  content: '\e601';
}

.my-icon-calendar:before {
  content: '\e602';
}

.my-icon-camera:before {
  content: '\e603';
}

.my-icon-cart:before {
  content: '\e604';
}

.my-icon-cert:before {
  content: '\e605';
}

.my-icon-close:before {
  content: '\e606';
}

.my-icon-comment:before {
  content: '\e607';
}

.my-icon-correct:before {
  content: '\e608';
}

.my-icon-date:before {
  content: '\e609';
}

.my-icon-display:before {
  content: '\e60a';
}

.my-icon-down:before {
  content: '\e60b';
}

.my-icon-edit:before {
  content: '\e60c';
}

.my-icon-flag:before {
  content: '\e60d';
}

.my-icon-forward:before {
  content: '\e60e';
}

.my-icon-gear:before {
  content: '\e60f';
}

.my-icon-hide:before {
  content: '\e610';
}

.my-icon-home:before {
  content: '\e611';
}

.my-icon-image:before {
  content: '\e612';
}

.my-icon-info:before {
  content: '\e613';
}

.my-icon-laud:before {
  content: '\e614';
}

.my-icon-left:before {
  content: '\e615';
}

.my-icon-like:before {
  content: '\e616';
}

.my-icon-location:before {
  content: '\e617';
}

.my-icon-lock:before {
  content: '\e618';
}

.my-icon-mail:before {
  content: '\e619';
}

.my-icon-map:before {
  content: '\e61a';
}

.my-icon-menu:before {
  content: '\e61b';
}

.my-icon-minus:before {
  content: '\e61c';
}

.my-icon-mobile:before {
  content: '\e61d';
}

.my-icon-more:before {
  content: '\e61e';
}

.my-icon-my:before {
  content: '\e61f';
}

.my-icon-paper:before {
  content: '\e620';
}

.my-icon-pencil:before {
  content: '\e621';
}

.my-icon-phone:before {
  content: '\e622';
}

.my-icon-plus:before {
  content: '\e623';
}

.my-icon-qq:before {
  content: '\e624';
}

.my-icon-question:before {
  content: '\e625';
}

.my-icon-recovery:before {
  content: '\e626';
}

.my-icon-refresh:before {
  content: '\e627';
}

.my-icon-right:before {
  content: '\e628';
}

.my-icon-search:before {
  content: '\e629';
}

.my-icon-share:before {
  content: '\e62a';
}

.my-icon-star:before {
  content: '\e62b';
}

.my-icon-top:before {
  content: '\e62c';
}

.my-icon-trash:before {
  content: '\e62d';
}

.my-icon-unlock:before {
  content: '\e62e';
}

.my-icon-video:before {
  content: '\e62f';
}

.my-icon-weibo:before {
  content: '\e630';
}

.my-icon-weichat-circle:before {
  content: '\e631';
}

.my-icon-weichat:before {
  content: '\e632';
}
/* #endif */
</style>
