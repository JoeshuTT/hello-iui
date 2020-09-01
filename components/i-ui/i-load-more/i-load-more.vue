<template>
    <view class="i-load-more" @click="onClick">
        <i-loading v-if="status === 'loading'" :type="iconType" :size="iconSize" :color="color" class="i-load-more__loading" />
        <text class="i-load-more__text" :style="{color: color}">{{ statusTypeMap[status] }}</text>
    </view>
</template>

<script>
import ILoading from '../i-loading/i-loading'

export default {
    name: 'ILoadMore',
    components: {
        ILoading
    },
    props: {
        status: {
            type: String,
            default: 'more' // more, loading, noMore
        },
        contentText: {
            type: Object,
            default: () => ({})
        },
        iconSize: {
            type: [Number, String],
            default: '48rpx'
        },
        iconType: {
            type: String,
            default: 'spinner'
        },
        color: {
            type: String,
            default: ''
        }
    },
    data() {
        const statusTypeMap = {
            more: '上拉显示更多',
            loading: '正在加载...',
            noMore: '没有更多数据了'
        }
        return {
            statusTypeMap: Object.assign({}, statusTypeMap, this.contentText)
        }
    },
    methods: {
        onClick() {
            this.$emit('click', { status: this.status })
        }
    }
}
</script>

<style lang="scss">
	@import '../common/index.scss';

	.i-load-more {
		@include flex-box('row');
		align-items: center;
		justify-content: center;
		height: $load-more-height;
		&__text {
			font-size: $load-more-text-font-size;
			color: $load-more-text-color;
		}
		&__loading{
			margin-right: 5px;
		}
	}
</style>
