<template>
    <view class="container">
            <demo-block title="基础图标" padding>
                <i-row custom-class="demo-row" class="demo-row">
                    <i-col v-for="(item, index) in list" :key="index" :span="8" custom-class="demo-col" class="demo-col">
                        <i-icon class="demo-col-icon" :name="item.value" />
                        <text class="demo-col-txt">{{ item.label }}</text>
                    </i-col>
                </i-row>
            </demo-block>
            <demo-block title="图标图片" padding>
                <i-icon name="https://b.yzcdn.cn/vant/icon-demo-1126.png" size="20" />
            </demo-block>
            <demo-block title="图标颜色" padding>
                <i-icon name="success" color="#1989fa" />
                <i-icon name="arrow" color="#07c160" />
            </demo-block>
            <demo-block title="图标大小" padding>
                <i-icon name="success" size="50rpx" />
                <i-icon name="success" size="50px" />
            </demo-block>
            <demo-block title="Unicode方式单个适用" padding>
                <i-icon font-family="myIcon" :name="myIconWechat" />
            </demo-block>
            <demo-block title="使用 Unicode 方式，自定义图标" padding>
                <i-row custom-class="demo-row" class="demo-row">
                    <i-col v-for="(item, index) in list2" :key="index" :span="8" custom-class="demo-col" class="demo-col">
                        <i-icon class="demo-col-icon" font-family="myIcon" :name="item.value" size="20" />
                        <text class="demo-col-txt">{{ item.label }}</text>
                    </i-col>
                </i-row>
            </demo-block>
            <!-- #ifndef APP-NVUE -->
            <demo-block title="使用 Font Class 方式，自定义图标" padding>
                <i-row custom-class="demo-row" class="demo-row">
                    <i-col v-for="(item, index) in list2" :key="index" :span="8" custom-class="demo-col" class="demo-col">
                        <i-icon class="demo-col-icon" class-prefix="my-icon" :name="item.label" size="20" />
                        <text class="demo-col-txt">{{ item.label }}</text>
                    </i-col>
                </i-row>
            </demo-block>
            <!-- #endif -->
    </view>
</template>

<script>
// #ifdef APP-NVUE
const dom = weex.requireModule('dom')
dom.addRule('fontFace', {
    'fontFamily': 'myIcon',
    'src': "url('https://at.alicdn.com/t/font_720567_dnwdc9tepfd.ttf')"
})
// #endif
import pageMixin from '@/mixins/page'

export default {
    mixins: [pageMixin],
    data() {
        return {
            list: [
                {
                    label: 'success',
                    value: 'success'
                },
                {
                    label: 'plus',
                    value: 'plus'
                },
                {
                    label: 'cross',
                    value: 'cross'
                },
                {
                    label: 'fail',
                    value: 'fail'
                },
                {
                    label: 'arrow',
                    value: 'arrow'
                },
                {
                    label: 'arrow-left',
                    value: 'arrow-left'
                },
                {
                    label: 'arrow-up',
                    value: 'arrow-up'
                },
                {
                    label: 'arrow-down',
                    value: 'arrow-down'
                }
            ],
            list2: [
                {
                    label: 'wechat',
                    value: '\ue632'
                },
                {
                    label: 'qq',
                    value: '\ue624'
                },
                {
                    label: 'weibo',
                    value: '\ue630'
                },
                {
                    label: 'share',
                    value: '\ue62a'
                }
            ],
            myIconWechat: '\ue632'
        }
    },
    onLoad() {

    },
    methods: {

    }
}
</script>

<style lang="scss">

    .demo-row {
        background-color: #fff;
        border-radius: 4px;
    }

    .demo-col {
        padding: 20rpx 30rpx;
        align-items: center;
        justify-content: center;
        &-txt {
            font-size: 14px;
            line-height: 24px;
            color: #666;
        }
    }

    /* #ifndef APP-NVUE */
    /* 引入第三方或自定义的字体图标样式 */
    @font-face {
      font-family: 'myIcon';
      src: url('https://at.alicdn.com/t/font_720567_dnwdc9tepfd.ttf') format('truetype');
    }

    .my-icon {
        font-family: "myIcon";
    }

    .my-icon-wechat:before {
      content: "\e632";
    }

    .my-icon-qq:before {
      content: "\e624";
    }

    .my-icon-weibo:before {
      content: "\e630";
    }

    .my-icon-share:before {
      content: "\e62a";
    }

    /* #endif */
</style>
