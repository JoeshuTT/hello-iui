<template>
    <view class="i-page">
        <template v-if="status === 'loading'">
            <i-transition :show="true" class="i-page__loading" :name="transitionName">
                <text class="i-page__loading-title">{{ pageLoadingTitle }}</text>
            </i-transition>
        </template>
        <template v-else-if="status === 'fail'">
            <i-transition class="i-page__fail" :show="true" :name="transitionName">
                <text class="i-page__fail-title">{{ offlineTitle }}</text>
                <i-button class="i-page__fail-btn" type="info" plain :text="reloadTitle" @click="onReload" />
            </i-transition>
        </template>
        <template v-else>
            <slot />
        </template>
    </view>
</template>

<script>

import IButton from '../i-button/i-button'
import config from '../config'

export default {
    name: 'IPage',
    components: {
        IButton
    },
    props: {
        status: {
            type: String,
            default: 'success' // success, fail, loading
        },
        transition: {
            type: Boolean,
            default: false
        },
        transitionName: {
            type: String,
            default: 'fade'
        },
        customStyle: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        const { reloadTitle, pageLoadingTitle, offlineTitle, tabbarPaths } = config
        return {
            reloadTitle,
            pageLoadingTitle,
            offlineTitle,
            tabbarPaths
        }
    },
    methods: {
        onReload() {
            const pages = getCurrentPages()
            const page = pages[pages.length - 1]
            const fullPath = page.$page.fullPath
            const path = page.$page.path
            // tabbar页面
            if (this.tabbarPaths.indexOf(path) > -1) {
                uni.reLaunch({
                    url: fullPath
                })
            } else {
                uni.redirectTo({
                    url: fullPath
                })
            }
        }
    }

}
</script>

<style lang="scss">
    @import '../common/index.scss';

    /* #ifndef APP-NVUE */
    page {
        @include flex-box();
        min-height: 100%;
    }
    /* #endif */

    .i-page{
        @include flex-box();
        flex: 1;
        position: relative;
        background-color: $page-bg-color;

        &__fail {
            flex: 1;
            @include flex-box();
            justify-content: center;
            align-items: center;
            &-btn {
                width: 250rpx;
            }
            &-title {
                font-size: $page-title-size;
                color: $page-title-color;
                margin-bottom: 40rpx;
            }
        }

        &__loading{
            flex: 1;
            @include flex-box();
            justify-content: center;
            align-items: center;
            &-title {
                font-size: $page-loading-title-size;
                color: $page-title-color;
                margin-bottom: 40rpx;
            }
        }
    }

</style>
