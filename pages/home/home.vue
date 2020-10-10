<template>
    <view class="demo-home">
        <view class="demo-header">
            <image class="demo-header__logo" src="/static/logo.png" />
            <text class="demo-header__txt"> {{ title }} </text>
            <text class="demo-header__txt"> {{ subTitle }} </text>
        </view>
        <view v-for="(item, index) in list" :key="index" class="demo-nav">
            <text class="demo-nav__title">{{ item.name }}</text>
            <view class="demo-nav__group">
                <view v-for="(v, i) in item.children" :key="i" class="demo-nav__block" @click="onNavigator(v.path,v.name)">
                    <text class="demo-nav__block-text">{{ v.name }}</text>
                    <i-icon name="arrow" class="demo-nav__icon" />
                </view>
            </view>
        </view>
    </view>
</template>

<script>

import list from '@/iui.config.js'

export default {
    data() {
        return {
            title: '一个基于 uni-app 的UI组件库(兼容NVUE)',
            subTitle: '',
            list
        }
    },
    onLoad() {

    },
    methods: {
        onNavigator(path, name) {
            uni.navigateTo({
                url: `${path}?pageTitle=${encodeURIComponent(name)}`
            })
        }
    }
}
</script>

<style lang="scss">

    .demo-header {
        @include flex-box();
        align-items: center;
        &__logo {
            width: 100px;
            height: 100px;
            margin-bottom: 20px;
            border-radius: 10px;
        }
        &__txt {

        }
    }

    .demo-home {
        // box-sizing: border-box;
        // width: 100%;
        /* #ifndef APP-NVUE */
        min-height: 100vh;
        /* #endif */
        padding: 46px 20px 20px;
        background-color: #fff;

    }

    .demo-nav {

        &__title {
            @include flex-box('row');
            margin: 24px 0 8px 16px;
            color: rgba(69, 90, 100, 0.6);
            font-size: 14px;
        }

        &__group {

        }

        &__block {
            position: relative;
            @include flex-box('row');
            justify-content: space-between;
            align-items: center;
            margin: 0 0 12px;
            padding-left: 20px;
            padding-right: 16px;
            background-color: #f7f8fa;
            border-radius: 99px;
            transition: background-color 0.3s;
        }

        &__block-text {
            flex: 1;
            font-weight: 500;
            font-size: 14px;
            line-height: 40px;
        }

        &__block:active {
            background-color: #e4e8ee
        }

        &__icon {
            //
        }
    }
</style>
