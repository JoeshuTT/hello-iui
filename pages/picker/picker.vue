<template>
    <view class="container">
        <!-- <i-button type="primary" @click="onTest('picker')">picker单列实例方法测试</i-button> -->
        <!-- <i-button type="primary" @click="onTest('picker2')">picker多列实例方法测试</i-button> -->
        <demo-block title="基础用法">
            <i-picker
                ref="picker"
                show-toolbar
                :columns="columns"
                @confirm="onConfirm"
                @cancel="onCancel"
                @change="onChange"
            />
        </demo-block>
        <demo-block title="默认选中项">
            <i-picker
                show-toolbar
                :columns="columns"
                :default-index="2"
                @change="onChange"
            />
        </demo-block>
        <demo-block title="数组项是对象类型">
            <i-picker
                show-toolbar
                :columns="selectList"
                value-key="label"
                @confirm="onConfirm"
                @cancel="onCancel"
                @change="onChange"
            />
        </demo-block>
        <demo-block title="多列选择">
            <i-picker
                ref="picker2"
                show-toolbar
                :columns="columns3"
                @change="onChange"
            />
        </demo-block>
        <demo-block title="级联选择">
            <i-picker
                show-toolbar
                title="标题"
                value-key="text"
                :columns="cascadeList"
                @change="onChange"
            />
        </demo-block>
        <demo-block title="禁用选项">
            <i-picker
                show-toolbar
                title="标题"
                value-key="text"
                :columns="columns4"
                @change="onChange"
            />
        </demo-block>
        <demo-block title="动态设置选项">
            <i-picker
                show-toolbar
                title="标题"
                value-key="text"
                :columns="columns2"
                @change="onChange2"
            />
        </demo-block>
        <demo-block title="加载状态">
            <i-picker
                loading
                show-toolbar
                title="标题"
                value-key="text"
                :columns="columns"
                @change="onChange"
            >
                <i-loading slot="loading" :color="themeColor" />
            </i-picker>
        </demo-block>
    </view>
</template>

<script>
import pageMixin from '@/mixins/page'
import config from '@/config/index.js'

var cities = {
    浙江: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
    福建: ['福州', '厦门', '莆田', '三明', '泉州']
}

export default {
    mixins: [pageMixin],
    data() {
        return {
            themeColor: config.themeColor,
            columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
            columns2: [
                {
                    values: Object.keys(cities),
                    className: 'column1'
                },
                {
                    values: cities['浙江'],
                    className: 'column2',
                    defaultIndex: 2
                }
            ],
            columns3: [
                // 第一列
                {
                    values: ['周一', '周二', '周三', '周四', '周五'],
                    defaultIndex: 2
                },
                // 第二列
                {
                    values: ['上午', '下午', '晚上'],
                    defaultIndex: 1
                }
            ],
            selectList: [
                { id: '1', label: '北京', value: '0111' },
                { id: '2', label: '天津', value: '02222' },
                { id: '3', label: '上海', value: '0333' }
            ],
            cascadeList: [
                {
                    text: '浙江',
                    children: [
                        {
                            text: '杭州',
                            children: [{ text: '西湖区' }, { text: '余杭区' }]
                        },
                        {
                            text: '温州',
                            children: [{ text: '鹿城区' }, { text: '瓯海区' }]
                        }
                    ]
                },
                {
                    text: '福建',
                    children: [
                        {
                            text: '福州',
                            children: [{ text: '鼓楼区' }, { text: '台江区' }]
                        },
                        {
                            text: '厦门',
                            children: [{ text: '思明区' }, { text: '海沧区' }]
                        }
                    ]
                }
            ],
            //
            columns4: [
                { text: '杭州', disabled: true },
                { text: '宁波' },
                { text: '温州' }
            ],
            // 加载状态
            loading: true
        }
    },
    onLoad() {

    },
    methods: {
        onConfirm(value, index) {
            uni.showToast({ icon: 'none', title: `onConfirm 当前值：${value}, 当前索引：${index}` })
        },
        onCancel(value, index) {
            uni.showToast({ icon: 'none', title: `onCancel 当前值：${value}, 当前索引：${index}` })
        },
        onChange(picker, value, index) {
            console.log(picker, value, index)
            uni.showToast({ icon: 'none', title: `onChange 当前值：${value}, 当前索引：${index}` })
        },
        onChange2(picker, values) {
            console.log(picker, values)
            picker.setColumnValues(1, cities[values[0]])
        },
        // 实例方法
        onTest(picker) {
            // console.log(this.$refs[picker].getValues())
            // console.log(this.$refs[picker].setValues(['福建', '嘉兴']))
            // console.log(this.$refs[picker].getColumnValue(1))
            // console.log(this.$refs[picker].setColumnValue(1, '宁波'))
            // console.log(this.$refs[picker].getColumnIndex(1))
            // console.log(this.$refs[picker].setColumnIndex(1, 1))
            // console.log(this.$refs[picker].getColumnValues(1))
            // console.log(this.$refs[picker].setColumnValues(1, ['温州', '嘉兴', '湖州']))
            // console.log(this.$refs[picker].getIndexes())
            // console.log(this.$refs[picker].setIndexes([1, 3]))
        }

    }
}
</script>

<style lang="scss">
	.mb20 {
		margin-bottom: 20rpx;
	}

    .block {
        width: 300rpx;
        height: 300rpx;
        background-color: #fff;
        &-txt {
            color: #666;
            font-size: 16px;
        }
    }
</style>
