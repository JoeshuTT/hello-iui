<template>
    <view ref="iRow" class="i-row" :class="[customClass]" :style="[mergeStyle]" @click="onClick">
        <slot />
    </view>
</template>

<script>

import IComponent from '../mixins/component'

export default {
    name: 'IRow',
    mixins: [IComponent],
    props: {
        type: {
            type: String,
            default: 'flex'
        },
        gutter: {
            type: [Number, String],
            default: 0
        }
    },
    computed: {
        mergeStyle() {
            const { gutter, customStyle } = this
            let style = {}
            if (gutter) {
                const margin = `-${Number(gutter) / 2}rpx`
                style = {
                    marginLeft: margin,
                    marginRight: margin
                }
            }
            return Object.assign({}, style, customStyle)
        }
    },
    provide() {
        return {
            gutter: this.gutter
        }
    },
    methods: {
        onClick(event) {
            this.$emit('click', event)
        }
    }
}
</script>

<style lang="scss">
	@import '../styles/index.scss';

    /* #ifdef APP-PLUS-NVUE || H5 */
    .i-row {
        @include flex-box('row');
        flex-wrap: wrap;
    }
    /* #endif */

    /* #ifdef MP-WEIXIN */
    .i-row::after {
        content: "";
        display: table;
        clear: both;
    }
    /* #endif */
</style>
