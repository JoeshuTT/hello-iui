<template>
    <view class="container">
        <demo-block title="选择年月日">
            <i-datetime-picker
                v-model="value.date"
                type="year-month-day"
                @confirm="onConfirm"
                @cancel="onCancel"
                @change="onChange"
            />
        </demo-block>
        <demo-block title="选择年月">
            <i-datetime-picker
                v-model="value.yearMonth"
                type="year-month"
            />
        </demo-block>
<!--         <demo-block title="选择月日">
            <i-datetime-picker
                v-model="currentDate"
                type="month-day"
                @confirm="onConfirm"
                @cancel="onCancel"
                @change="onChange"
            />
        </demo-block> -->
       <demo-block title="选择时间">
            <i-datetime-picker
                v-model="value.time"
                type="time"
                @confirm="onConfirm"
                @cancel="onCancel"
                @change="onChange"
            />
        </demo-block>
         <demo-block title="选择完整时间">
            <i-datetime-picker
                v-model="value.datetime"
                type="datetime"
                @confirm="onConfirm"
                @cancel="onCancel"
                @change="onChange"
            />
        </demo-block>
       <demo-block title="选择年月日小时">
            <i-datetime-picker
                v-model="value.datehour"
                type="date-hour"
                @confirm="onConfirm"
                @cancel="onCancel"
                @change="onChange"
            />
        </demo-block>
       <demo-block title="选项过滤器">
            <i-datetime-picker
                v-model="value.optionFilter"
                title="选项过滤器"
                :filter="filter"
                type="time"
                @confirm="onConfirm"
                @cancel="onCancel"
                @change="onChange"
            />
        </demo-block>
       <demo-block title="自定义列排序">
            <i-datetime-picker
                v-model="value.datehour"
                type="date-hour"
                @confirm="onConfirm"
                @cancel="onCancel"
                @change="onChange"
            />
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

// import dayjs from 'dayjs'

export default {
    mixins: [pageMixin],
    data() {
        return {
            themeColor: config.themeColor,
            minDate: new Date(2020, 0, 1),
            maxDate: new Date(2025, 10, 1),
            value: {
                date: new Date(),
                time: '12:00',
                datetime: new Date(2020, 0, 1),
                datehour: new Date(2020, 0, 1),
                monthDay: new Date(2020, 0, 1),
                yearMonth: new Date(2020, 0, 1),
                optionFilter: '12:00',
                sortColumnsDate: new Date(2020, 0, 1)
            }
        }
    },
    onLoad() {

    },
    methods: {
        onConfirm(value) {
            console.log('onConfirm', value)
            uni.showToast({ icon: 'none', title: `onConfirm 当前值：${dayjs(value).format('YYYY-MM-DD HH:mm:ss')}` })
        },
        onCancel() {
            console.log('onCancel')
            uni.showToast({ icon: 'none', title: `onCancel` })
        },
        onChange(picker) {
            console.log('onChange', picker)
        },
        onChange2(picker, values) {
            console.log(picker, values)
            picker.setColumnValues(1, cities[values[0]])
        },
        formatter(type, value) {
            if (type === 'year') {
                return value + '年'
            }
            if (type === 'month') {
                return value + '月'
            }
            if (type === 'day') {
                return value + '日'
            }
            return value
        },
        filter(type, values) {
            console.log('filter', type)
            if (type === 'minute') {
                return values.filter((value) => value % 5 === 0)
            }

            return values
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
