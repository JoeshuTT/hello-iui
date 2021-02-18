<template>
  <view class="i-page">
    <template v-if="status === 'success'">
      <slot />
    </template>
    <view v-else-if="status === 'loading'" class="i-page__loading">
      <text class="i-page__loading-title">{{ loadingTitle }}</text>
    </view>
    <view v-else class="i-page__fail">
      <text class="i-page__fail-title">{{ offlineTitle }}</text>
      <i-button
        class="i-page__fail-btn"
        custom-class="i-page__fail-btn"
        :custom-style="{ width: '250rpx' }"
        type="info"
        plain
        :text="reloadTitle"
        @click="onReload"
      />
    </view>
  </view>
</template>

<script>
import IComponent from '../mixins/component'
import IButton from '../i-button/i-button'
import { PAGE } from '../common/config'

export default {
  name: 'IPage',
  components: {
    IButton,
  },
  mixins: [IComponent],
  props: {
    status: {
      type: String,
      default: 'success', // success, fail, loading
    },
  },
  data() {
    const { reloadTitle, loadingTitle, offlineTitle, tabbarPaths } = PAGE
    return {
      reloadTitle,
      loadingTitle,
      offlineTitle,
      tabbarPaths,
    }
  },
  methods: {
    onReload() {
      const pages = getCurrentPages()
      const page = pages[pages.length - 1]
      const route = page.route
      // tabbar页面
      const query = page.options
      const params = Object.keys(query)
        .map(key => key + '=' + decodeURIComponent(query[key]))
        .join('&')

      if (this.tabbarPaths.indexOf(route) > -1) {
        uni.reLaunch({
          url: `/${route}?${params}`,
        })
      } else {
        uni.redirectTo({
          url: `/${route}?${params}`,
        })
      }
    },
  },
}
</script>

<style lang="scss">
@import '../styles/index.scss';

/* #ifdef H5 */
uni-page-body {
  @include flex-box();
  min-height: 100%;
}
/* #endif */

/* #ifndef APP-NVUE */
page {
  @include flex-box();
  min-height: 100%;
}
/* #endif */

.i-page {
  position: relative;
  @include flex-box();
  /* #ifndef APP-NVUE */
  flex: 1;
  /* #endif */
  /* #ifndef H5 || APP-NVUE */
  min-height: 100vh;
  /* #endif */

  background-color: $page-bg-color;

  &__fail {
    /* #ifdef APP-NVUE */
    padding-top: 325rpx;
    /* #endif */
    flex: 1;
    @include flex-box();
    justify-content: center;
    align-items: center;

    &-btn {
      width: 250rpx;
    }

    &-title {
      margin-bottom: 40rpx;
      font-size: $page-title-size;
      color: $page-title-color;
    }
  }

  &__loading {
    /* #ifdef APP-NVUE */
    padding-top: 325rpx;
    /* #endif */
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
