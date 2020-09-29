<template>
    <view :class="['i-icon', customClass, classPrefix, classPrefix ? classPrefix + '-' + name : 'i-icon-block']">
        <template v-if="isImageName">
            <image class="i-icon-block_img" :style="[mergeStyle]" :src="name" mode="aspectFit" />
        </template>
        <template v-else>
            <text v-if="!classPrefix" class="i-icon" :style="[mergeStyle]">{{ icon[name] || name }}</text>
        </template>
    </view>
</template>

<script>

import IComponent from '../mixins/component'
import { addUnit } from '../utils'
import icon from './type'
// #ifdef APP-NVUE
const fontFamily = 'iuiIconFont'
// const url = '/static/iuiIconFont.ttf'
const url = 'https://at.alicdn.com/t/font_1949925_qisrzzyoqy8.ttf'
const dom = weex.requireModule('dom')
dom.addRule('fontFace', {
    'fontFamily': fontFamily,
    'src': "url('" + url + "')"
})
// #endif

export default {
    name: 'IIcon',
    mixins: [IComponent],
    props: {
        name: {
            required: true,
            type: String,
            default: ''
        },
        size: {
            type: [Number, String],
            default: '16px'
        },
        color: {
            type: String,
            default: '#999'
        },
        fontFamily: {
            type: String,
            default: 'iuiIconFont'
        },
        classPrefix: {
            type: String,
            default: ''
        },
        customStyle: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            icon
        }
    },
    computed: {
        mergeStyle() {
            const { fontFamily, color, size, customStyle } = this
            const style = {}

            if (this.name.indexOf('/') !== -1) {
                if (size) {
                    style.width = addUnit(size)
                    style.height = addUnit(size)
                } else {
                    console.error('image size is required')
                }
            } else {
                fontFamily && (style.fontFamily = fontFamily)
                size && (style.fontSize = addUnit(size))
                color && (style.color = color)
            }

            return Object.assign({}, style, customStyle)
        },
        isImageName() {
            return this.name.indexOf('/') !== -1
        }
    }
}
</script>

<style lang="scss">
	@import '../styles/index.scss';

    /* #ifndef APP-NVUE */
    @font-face {
        font-family: 'iuiIconFont';
        src: url($iconFontUrl) format('truetype');
    }

    .i-icon {
        line-height: inherit;
        font-weight: normal;
        -webkit-font-smoothing: antialiased;
    }
     /* #endif */

</style>
