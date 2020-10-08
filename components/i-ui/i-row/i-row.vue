<template>
    <view ref="iRow" class="i-row" :class="[customClass, justify && `i-row--justify-${justify}`, align && `i-row--align-${align}`]" :style="[mergeStyle]" @click="onClick">
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
        },
        justify: {
            type: String,
            default: ''
        },
        align: {
            type: String,
            default: ''
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

    .i-row {
        position: relative;
        @include flex-box('row');
        flex-wrap: wrap;

        &--justify-center {
            justify-content: center;
        }

        &--justify-end {
            justify-content: flex-end;
        }

        &--justify-space-between {
            justify-content: space-between;
        }

        &--justify-space-around {
            justify-content: space-around;
        }

        &--align-center {
            align-items: center;
        }

        &--align-bottom {
            align-items: flex-end;
        }
    }

</style>
