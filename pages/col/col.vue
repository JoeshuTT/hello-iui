<template>
    <view class="container">
        <demo-block title="基础用法" padding>
            <i-row>
                <i-col custom-class="demo-col" class="demo-col" span="8"><text class="demo-col-text dark">span: 8</text></i-col>
                <i-col custom-class="demo-col" class="demo-col" span="8"><text class="demo-col-text light">span: 8</text></i-col>
                <i-col custom-class="demo-col" class="demo-col" span="8"><text class="demo-col-text dark">span: 8</text></i-col>
                <i-col custom-class="demo-col" class="demo-col" span="8"><text class="demo-col-text dark">span: 8</text></i-col>
                <i-col custom-class="demo-col" class="demo-col" span="8"><text class="demo-col-text light">span: 8</text></i-col>
                <i-col custom-class="demo-col" class="demo-col" span="8"><text class="demo-col-text dark">span: 8</text></i-col>
            </i-row>
        </demo-block>
        <demo-block title="设置列元素间距" padding>
            <i-row gutter="40">
                <i-col custom-class="demo-col" class="demo-col" span="8"><text class="demo-col-text dark">span: 8</text></i-col>
                <i-col custom-class="demo-col" class="demo-col" span="8"><text class="demo-col-text light">span: 8</text></i-col>
                <i-col custom-class="demo-col" class="demo-col" span="8"><text class="demo-col-text dark">span: 8</text></i-col>
            </i-row>
        </demo-block>
        <demo-block title="flex 布局" padding>
            <i-row justify="center">
                <i-col custom-class="demo-col" class="demo-col" span="6"><text class="demo-col-text dark">span: 6</text></i-col>
                <i-col custom-class="demo-col" class="demo-col" span="6"><text class="demo-col-text dark">span: 6</text></i-col>
                <i-col custom-class="demo-col" class="demo-col" span="6"><text class="demo-col-text dark">span: 6</text></i-col>
            </i-row>
            <i-row justify="end">
                <i-col custom-class="demo-col" class="demo-col" span="6"><text class="demo-col-text dark">span: 6</text></i-col>
                <i-col custom-class="demo-col" class="demo-col" span="6"><text class="demo-col-text dark">span: 6</text></i-col>
                <i-col custom-class="demo-col" class="demo-col" span="6"><text class="demo-col-text dark">span: 6</text></i-col>
            </i-row>
            <i-row justify="space-between">
                <i-col custom-class="demo-col" class="demo-col" span="6"><text class="demo-col-text dark">span: 6</text></i-col>
                <i-col custom-class="demo-col" class="demo-col" span="6"><text class="demo-col-text dark">span: 6</text></i-col>
                <i-col custom-class="demo-col" class="demo-col" span="6"><text class="demo-col-text dark">span: 6</text></i-col>
            </i-row>
            <i-row justify="space-around">
                <i-col custom-class="demo-col" class="demo-col" span="6"><text class="demo-col-text dark">span: 6</text></i-col>
                <i-col custom-class="demo-col" class="demo-col" span="6"><text class="demo-col-text dark">span: 6</text></i-col>
                <i-col custom-class="demo-col" class="demo-col" span="6"><text class="demo-col-text dark">span: 6</text></i-col>
            </i-row>
            <i-row align="center">
                <i-col custom-class="demo-col" class="demo-col" span="6"><text class="demo-col-text dark">span: 6</text></i-col>
                <i-col custom-class="demo-col" class="demo-col" span="6"><text class="demo-col-text dark">span: 6</text></i-col>
                <i-col custom-class="demo-col" class="demo-col" span="6"><text class="demo-col-text dark">span: 6</text></i-col>
            </i-row>
        </demo-block>
    </view>
</template>

<script>
import pageMixin from '@/mixins/page'

export default {
    mixins: [pageMixin],
    data() {
        return {

        }
    },
    onLoad() {

    },
    methods: {

    }
}
</script>

<style lang="scss">

    .demo-col {
        margin-bottom: 20rpx;
        &-text {
            /* #ifndef APP-NVUE */
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            /* #endif */
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
