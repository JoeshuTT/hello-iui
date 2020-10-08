<template>
    <view class="container">
        <demo-block title="基础用法" padding>
            <i-image width="100px" height="100px" :src="src" />
        </demo-block>
        <demo-block title="图片显示淡入效果" padding>
            <i-image width="100" height="100" fade-show :src="src" />
        </demo-block>
        <demo-block title="填充模式" padding>
            <i-row gutter="40">
                <i-col v-for="(item,index) in modes" :key="index" custom-class="demo-col" :span="8">
                    <i-image width="100" height="100" :src="src" :mode="item" />
                    <text class="text">{{ item }}</text>
                </i-col>
            </i-row>
        </demo-block>
        <demo-block title="圆形图片" padding>
            <i-row gutter="40">
                <i-col v-for="(item,index) in modes" :key="index" custom-class="demo-col" :span="8">
                    <i-image width="100" height="100" round :src="src" :mode="item" />
                    <text class="text">{{ item }}</text>
                </i-col>
            </i-row>
        </demo-block>
        <demo-block title="加载中提示" padding>
            <i-image width="100" height="100" />
        </demo-block>
        <demo-block title="加载失败提示" padding>
            <i-image width="100" height="100" :src="x" />
        </demo-block>
    </view>
</template>

<script>
import pageMixin from '@/mixins/page'

export default {
    mixins: [pageMixin],
    data() {
        return {
            modes: [
                'scaleToFill',
                'aspectFit',
                'aspectFill',
                'center',
                'widthFix',
                'heightFix'
            ],
            src: 'https://img.yzcdn.cn/vant/cat.jpeg',
            x: '1'
        }
    },
    onLoad() {

    },
    methods: {

    }
}
</script>

<style lang="scss">

    .container {
        padding-bottom: 100rpx;
        background-color: #fff;
    }

    .text {
      color: #7d7e80;
      font-size: 14px;
      line-height: 24px;
      text-align: center;
    }

    .demo-col {
        // @include flex-box();
        // align-items: center;
    }
</style>
