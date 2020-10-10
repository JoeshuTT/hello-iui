<template>
    <view class="container">
        <demo-block title="文字省略" padding>
            <text class="ellipsis i-ellipsis">这是一段最多显示一行的文字，多余的内容会被省略。</text>
            <text class="ellipsis--2 i-ellipsis--2">这是一段最多显示两行的文字，多余的内容会被省略。这是一段最多显示两行的文字，多余的内容会被省略。</text>
            <text class="ellipsis--3 i-ellipsis--3">这是一段最多显示三行的文字，多余的内容会被省略。这是一段最多显示两行的文字，多余的内容会被省略。这是一段最多显示两行的文字，多余的内容会被省略。</text>
        </demo-block>
        <demo-block title="Flex 布局" padding>
            <view class="flex-box"> flex 盒子 </view>
        </demo-block>
        <demo-block title="layout 布局 - 基础用法" padding>
            <view class="demo-row">
                <view v-for="(v,i) in columns" :key="i" class="demo-col-8"> <text :class="[i % 3 === 1 ? 'light' : 'dark']">span: 8</text></view>
            </view>
        </demo-block>
        <demo-block title="layout 布局 - 设置列元素间距" padding>
            <view class="demo-row2">
                <view v-for="(v,i) in columns" :key="i" class="demo-col2--8"> <text :class="[i % 3 === 1 ? 'light' : 'dark']">span: 8</text></view>
            </view>
        </demo-block>
        <!-- #ifndef APP-NVUE -->
        <demo-block title="1px边框" padding>
            <view class="layout-box i-hairline--top"> 上边框 </view>
            <view class="layout-box i-hairline--bottom"> 下边框 </view>
            <view class="layout-box i-hairline--left"> 左边框 </view>
            <view class="layout-box i-hairline--right"> 右边框 </view>
            <view class="layout-box i-hairline--top-bottom"> 上下边框 </view>
            <view class="layout-box i-hairline--surround"> 全边框 </view>
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
            columns: 3
        }
    },
    onLoad() {

    },
    methods: {

    }
}
</script>

<style lang="scss">

    /* #ifndef APP-NVUE */
    @import '@/components/i-ui/styles/hairline.scss';
    @import '@/components/i-ui/styles/ellipsis.scss';
    /* #endif */

    .ellipsis {
        /* #ifndef APP-NVUE */
        display: block;
        /* #endif */
        margin-bottom: 40rpx;
        font-size: 16px;
        color: #333;
    }

    .ellipsis--2 {
        margin-bottom: 40rpx;
        font-size: 16px;
        color: #333;
    }

    .ellipsis--3 {
        margin-bottom: 40rpx;
        font-size: 16px;
        color: #333;
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

    /* Flex 布局 */
    .flex-box {
        @include flex-box();
    }

    /* layout 布局 - 基础用法 */
    .demo-row {
        @include i-row();
    }

    .demo-col-8 {
        @include i-col(8, 0, 690);
        margin-bottom: 20rpx;
    }

    /* layout 布局 - 设置列元素间距 */
    .demo-row2 {
        @include i-row(40);
    }

    .demo-col2--8 {
        @include i-col(8, 40, 690);
        margin-bottom: 20rpx;
    }

    /* #ifndef APP-NVUE */
    .layout-box {
        background-color: $ui-color;
        color: #fff;
        margin-bottom: 20rpx;
        &::after {
            top: 5px;
        }
    }

    /* #endif */
</style>
