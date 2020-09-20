<template>
    <view ref="iRow" class="i-row" :style="mergeStyle" @click="onClick">
        <slot />
    </view>
</template>

<script>
export default {
    name: 'IRow',
    props: {
        type: {
            type: String,
            default: 'flex'
        },
        gutter: {
            type: [Number, String],
            default: 0
        },
        customStyle: {
            type: Object,
            default: () => ({})
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
        @include flex-box('row');
        flex-wrap: wrap;
    }
</style>
