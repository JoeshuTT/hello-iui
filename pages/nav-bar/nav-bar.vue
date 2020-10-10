<template>
    <view class="page">
        <i-nav-bar
          fixed
          :title="pageTitle"
          left-text="返回"
        />
       <view class="container">
           <demo-block title="基础用法">
               <i-nav-bar
                   left-text="返回"
                   title="标题"
               />
           </demo-block>
           <demo-block title="使用插槽">
               <i-nav-bar title="标题" left-text="返回" left-arrow>
                <template slot="right">
                   <i-icon name="plus" size="18" @click="onClickRight" />
                 </template>
               </i-nav-bar>
           </demo-block>
       </view>
    </view>

</template>

<script>
import pageMixin from '@/mixins/page'

export default {
    mixins: [pageMixin],
    data() {
        return {

        }
    },
    onLoad() {

    },
    methods: {
        onClickLeft() {
            uni.showToast({ icon: 'none', title: '返回' })
        },
        onClickRight() {
            uni.showToast({ icon: 'none', title: '按钮' })
        }
    }
}
</script>

<style lang="scss">
	.mb20 {
		margin-bottom: 20rpx;
	}
</style>
