<template>
    <view class="i-page">
        <template v-if="status === 'loading'">
            <i-transition :show="true" class="i-page__loading" :name="transitionName">
                <text class="i-page__loading-title">{{ pageLoadingTitle }}</text>
            </i-transition>
        </template>
        <template v-else-if="status === 'fail'">
            <i-transition class="i-page__fail" :show="true" :name="transitionName">
                <view class="i-page__fail-tip"><text class="i-page__fail-title">{{ offlineTitle }}</text></view>
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
            // const fullPath = page.$page.fullPath
            const route = page.route // todo: nuve页面调试
            // tabbar页面
            const query = page.options
            const url = Object.keys(query).map(key => key + '=' + decodeURIComponent(query[key])).join('&')
            // console.log(url)
            if (this.tabbarPaths.indexOf(route) > -1) {
                uni.reLaunch({
                    url: `/${route}?${url}`
                })
            } else {
                uni.redirectTo({
                    url: `/${route}?${url}`
                })
            }
        }
    }

}
</script>

<style lang="scss">
    @import '../styles/index.scss';

    /* #ifndef APP-NVUE */
    page {
        @include flex-box();
        min-height: 100%;
    }
    /* #endif */

    .i-page{
        /* #ifndef H5 || APP-NVUE */
        height: 100vh;
        /* #endif */
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
            &-tip {
                margin-bottom: 40rpx;
            }
            &-title {
                font-size: $page-title-size;
                color: $page-title-color;
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
