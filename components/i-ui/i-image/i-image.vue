<template>
    <!-- #ifndef APP-NVUE -->
    <view class="i-image" :style="[mergeStyle]">
        <!--图片加载器 start -->
        <image style="width: 0;height: 0;display: none;" :src="src" @load="onImgLoad" @error="onImgError" />
        <!--图片加载器 end -->
        <image :src="url" class="i-image__img" :mode="mode" :style="[mergeStyle]" :class="[fadeShow && 'fade-out', fadeShow && loaded ? 'fade-in' : '']" />
        <view v-if="showLoading && loading" class="i-image__loading">
            <slot name="loading"><i-icon name="photo-o" size="24" /></slot>
        </view>
        <view v-if="showError && error" class="i-image__error">
            <slot name="loading"><i-icon name="warning-o" size="24" /></slot>
        </view>
    </view>
    <!-- #endif -->
    <!-- #ifdef APP-NVUE -->
    <!-- eslint-disable-next-line -->
    <image :style="[style]" :src="src" :mode="mode" class="i-image__img" @load="onImgLoad" @error="onImgError" />
    <!-- #endif -->
</template>

<script>

import IIcon from '../i-icon/i-icon'
import { addUnit } from '../utils'
var imagePlaceholder = ''
// #ifdef APP-NVUE
import config from '../config'
imagePlaceholder = config.imagePlaceholder
// #endif

export default {
    name: 'IImage',
    components: {
        IIcon
    },
    props: {
        src: {
            type: String,
            default: imagePlaceholder
        },
        mode: {
            type: String,
            default: 'scaleToFill'
        },
        width: {
            type: [Number, String],
            default: ''
        },
        height: {
            type: [Number, String],
            default: ''
        },
        preLoad: {
            type: Boolean,
            default: true
        },
        showError: {
            type: Boolean,
            default: true
        },
        showLoading: {
            type: Boolean,
            default: true
        },
        fadeShow: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            url: '',
            loading: true,
            loaded: false,
            error: false
        }
    },
    computed: {
        mergeStyle() {
            const { width, height, mode } = this
            let viewStyle = {}
            if (width && height) {
                viewStyle = { width: addUnit(width, 'rpx'), height: addUnit(height, 'rpx') }
            } else {
                // #ifdef APP-NVUE
                // viewStyle = { width: '300px', height: '225px' }
                // #endif
            }
            if (mode === 'aspectFit') {
                viewStyle.backgroundColor = 'rgba(0,0,0,0)'
            }
            return viewStyle
        }
    },
    methods: {
        onClick(event) {
            this.$emit('click', event)
        },
        onImgLoad(event) {
            this.loading = false
            this.url = this.src
            this.loaded = true
            this.$emit('load', event)
        },
        onImgError(event) {
            this.loading = false
            this.error = true
            // #ifdef APP-NVUE
            this.src = imagePlaceholder
            // #endif
            this.$emit('error', event)
        }

    }

}
</script>

<style lang="scss">
	@import '../styles/index.scss';

    .i-image {
        position: relative;
    }

    .i-image__img {
        position: relative;
        transition-property: opacity;
        transition-timing-function: ease;
        transition-duration: $image-transition-duration;
        background-color: $image-placeholder-background-color;
    }

    /* #ifndef APP-NVUE */
    .i-image__img, .i-image__loading, .i-image__error {
        display: block;
        width: 100%;
        height: 100%;
    }

    .i-image__loading, .i-image__error {
        background-color: $image-placeholder-background-color;
        color: $image-placeholder-text-color;
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .fade-out {
        opacity: 0;
    }

    .fade-in {
        opacity: 1;
    }
    /* #endif */
</style>
