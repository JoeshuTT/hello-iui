<template>
    <view class="container">
        <demo-block title="基础用法">
            <i-cell-group>
              <i-cell title="单元格" value="内容" />
              <i-cell title="单元格" value="内容" label="描述信息" :border="false" />
            </i-cell-group>
        </demo-block>
        <demo-block title="展示图标">
            <i-cell title="单元格" value="内容">
                <i-icon slot="icon" name="success" color="#323233" />
            </i-cell>
        </demo-block>
        <demo-block title="展示箭头">
            <i-cell title="单元格" is-link />
            <i-cell title="单元格" is-link value="内容" />
            <i-cell title="单元格" is-link value="内容" arrow-direction="down" />
        </demo-block>
        <demo-block title="分组标题">
            <i-cell-group title="分组1">
              <i-cell title="单元格" value="内容" />
            </i-cell-group>
            <i-cell-group title="分组2">
              <i-cell title="单元格" value="内容" />
            </i-cell-group>
        </demo-block>
        <demo-block title="下边框">
            <i-cell title="单元格" is-link />
        </demo-block>
        <demo-block title="使用插槽">
            <i-cell title="单元格" value="内容">
                <text slot="title" class="cell-title">单元格</text>
                <text slot="label" class="cell-desc">自定义label</text>
            </i-cell>
            <i-cell title="单元格">
              <i-icon slot="right-icon" name="fail" />
            </i-cell>
        </demo-block>
        <demo-block title="垂直居中">
            <i-cell center title="单元格" value="内容" label="描述信息" />
        </demo-block>
    </view>
</template>

<script>

import pageMixin from '@/mixins/page'

export default {
    mixins: [pageMixin],
    data() {
        return { }
    },
    onLoad() {

    },
    methods: {

    }
}
</script>

<style lang="scss">

    .cell-desc {
        margin-top: 4px;
        color: #4CD964;
        font-size: 14px;
    }

</style>
