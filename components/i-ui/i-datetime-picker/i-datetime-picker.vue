<template>
  <i-picker
    ref="picker"
    class="i-datetime-picker"
    :active-class="activeClass"
    :toolbar-class="toolbarClass"
    :column-class="columnClass"
    :title="title"
    :columns="columns"
    :item-height="itemHeight"
    :show-toolbar="showToolbar"
    :visible-item-count="visibleItemCount"
    :confirm-button-text="confirmButtonText"
    :cancel-button-text="cancelButtonText"
    @change="onChange"
    @confirm="onConfirm"
    @cancel="onCancel"
  />
</template>

<script>
import IComponent from '../mixins/component'
import Emitter from '../mixins/emitter'
import { pickerProps } from '../i-picker/shared'
import IPicker from '../i-picker/i-picker'
import { range, padZero } from '../utils/format'
import { getMonthEndDay, times, isValidDate, getTrueValue } from './utils'

const currentYear = new Date().getFullYear()
const defaultFormatter = (type, value) => value // 选项格式化函数

export default {
  name: 'IDatetimePicker',
  components: {
    IPicker,
  },
  mixins: [IComponent, Emitter],
  props: {
    ...pickerProps,
    type: {
      type: String,
      default: 'datetime', // date, time, year-month, month-day, datehour
    },
    value: null,
    filter: Function,
    showToolbar: {
      type: Boolean,
      default: true,
    },
    formatter: {
      type: Function,
      default: defaultFormatter,
    },
    columnsOrder: Array,
    minDate: {
      type: Number,
      default: new Date(currentYear - 10, 0, 1).getTime(),
      observer: 'updateValue',
    },
    maxDate: {
      type: Number,
      default: new Date(currentYear + 10, 11, 31).getTime(),
      observer: 'updateValue',
    },
    minHour: {
      type: Number,
      default: 0,
      observer: 'updateValue',
    },
    maxHour: {
      type: Number,
      default: 23,
      observer: 'updateValue',
    },
    minMinute: {
      type: Number,
      default: 0,
      observer: 'updateValue',
    },
    maxMinute: {
      type: Number,
      default: 59,
      observer: 'updateValue',
    },
  },
  data() {
    return {
      innerValue: Date.now(),
      columns: [],
    }
  },
  watch: {
    filter: 'updateValue',
    minDate: 'updateValue',
    maxDate: 'updateValue',
    minHour: 'updateValue',
    maxHour: 'updateValue',
    minMinute: 'updateValue',
    maxMinute: 'updateValue',
  },
  created() {
    console.log('created', this.filter, this.formatter)
    // 立即调用
    const innerValue = this.correctValue(this.value)
    console.log(innerValue)
    this.updateColumnValue(innerValue).then(() => {
      this.$emit('input', innerValue)
    })
  },
  methods: {
    updateValue() {
      const { value, innerValue } = this
      const val = this.correctValue(value)

      const isEqual = val === innerValue
      if (!isEqual) {
        this.updateColumnValue(val).then(() => {
          this.$emit('input', val)
        })
      } else {
        this.updateColumns()
      }
    },
    // @exposed-api
    getPicker() {
      // 务必在组件渲染完成后调用
      return this.$refs.picker
    },

    updateColumns() {
      const { formatter } = this
      const results = this.getOriginColumns().map(column => ({
        values: column.values.map(value => formatter(column.type, value)),
      }))

      this.columns = results
      return this.$nextTick()
    },
    getOriginColumns() {
      const { filter } = this
      const results = this.getRanges().map(({ type, range }) => {
        let values = times(range[1] - range[0] + 1, index => {
          let value = range[0] + index
          value = type === 'year' ? `${value}` : padZero(value)
          return value
        })

        if (filter) {
          values = filter(type, values)
        }
        return { type, values }
      })
      return results
    },
    getRanges() {
      const { type, innerValue } = this
      if (type === 'time') {
        return [
          {
            type: 'hour',
            range: [this.minHour, this.maxHour],
          },
          {
            type: 'minute',
            range: [this.minMinute, this.maxMinute],
          },
        ]
      }
      const { minYear, minMonth, minDate, minHour, minMinute } = this.getBoundary('min', innerValue)
      const { maxYear, maxMonth, maxDate, maxHour, maxMinute } = this.getBoundary('max', innerValue)
      const result = [
        {
          type: 'year',
          range: [minYear, maxYear],
        },
        {
          type: 'month',
          range: [minMonth, maxMonth],
        },
        {
          type: 'day',
          range: [minDate, maxDate],
        },
        {
          type: 'hour',
          range: [minHour, maxHour],
        },
        {
          type: 'minute',
          range: [minMinute, maxMinute],
        },
      ]
      console.log(result)
      if (type === 'date') result.splice(3, 2)
      if (type === 'year-month') result.splice(2, 3)
      // if (type === 'month-day') result.splice(3, 2)
      // if (type === 'month-day') result.splice(0, 1)

      return result
    },
    getBoundary(type, innerValue) {
      const value = new Date(innerValue)
      const boundary = new Date(this[`${type}Date`])
      const year = boundary.getFullYear()
      let month = 1
      let date = 1
      let hour = 0
      let minute = 0
      if (type === 'max') {
        month = 12
        date = getMonthEndDay(value.getFullYear(), value.getMonth() + 1)
        hour = 23
        minute = 59
      }
      if (value.getFullYear() === year) {
        month = boundary.getMonth() + 1
        if (value.getMonth() + 1 === month) {
          date = boundary.getDate()
          if (value.getDate() === date) {
            hour = boundary.getHours()
            if (value.getHours() === hour) {
              minute = boundary.getMinutes()
            }
          }
        }
      }
      return {
        [`${type}Year`]: year,
        [`${type}Month`]: month,
        [`${type}Date`]: date,
        [`${type}Hour`]: hour,
        [`${type}Minute`]: minute,
      }
    },
    correctValue(value) {
      const { type, minDate, maxDate, minHour, maxHour, minMinute, maxMinute } = this
      // validate value
      const isDateType = type !== 'time'
      if (isDateType && !isValidDate(value)) {
        value = minDate
      } else if (!isDateType && !value) {
        value = `${padZero(minHour)}:00`
      }

      // time type
      if (!isDateType) {
        let [hour, minute] = value.split(':')
        hour = padZero(range(hour, minHour, maxHour))
        minute = padZero(range(minute, minMinute, maxMinute))

        return `${hour}:${minute}`
      }

      // date type
      value = Math.max(value, minDate)
      value = Math.min(value, maxDate)

      return value
    },
    onConfirm() {
      this.$emit('confirm', this.innerValue)
    },

    onCancel() {
      this.$emit('cancel')
    },

    onChange() {
      let value

      const picker = this.getPicker()
      const originColumns = this.getOriginColumns()

      if (this.type === 'time') {
        const indexes = picker.getIndexes()
        value = `${+originColumns[0].values[indexes[0]]}:${+originColumns[1].values[indexes[1]]}`
      } else {
        const indexes = picker.getIndexes()
        const values = indexes.map((value, index) => originColumns[index].values[value])
        const year = getTrueValue(values[0])
        const month = getTrueValue(values[1])
        const maxDate = getMonthEndDay(year, month)
        let date = getTrueValue(values[2])
        if (this.type === 'year-month') {
          date = 1
        }
        date = date > maxDate ? maxDate : date
        let hour = 0
        let minute = 0
        if (this.type === 'datetime') {
          hour = getTrueValue(values[3])
          minute = getTrueValue(values[4])
        }
        value = new Date(year, month - 1, date, hour, minute)
      }
      value = this.correctValue(value)

      this.updateColumnValue(value).then(() => {
        this.$emit('input', value)
        this.$emit('change', picker)
      })
    },

    updateColumnValue(value) {
      let values = []
      const { type } = this
      const formatter = this.formatter || defaultFormatter

      if (type === 'time') {
        const pair = value.split(':')
        values = [formatter('hour', pair[0]), formatter('minute', pair[1])]
      } else {
        const date = new Date(value)
        values = [formatter('year', `${date.getFullYear()}`), formatter('month', padZero(date.getMonth() + 1))]
        if (type === 'date') {
          values.push(formatter('day', padZero(date.getDate())))
        }
        if (type === 'datetime') {
          values.push(
            formatter('day', padZero(date.getDate())),
            formatter('hour', padZero(date.getHours())),
            formatter('minute', padZero(date.getMinutes())),
          )
        }
      }

      this.innerValue = value
      this.updateColumns()
      return this.$nextTick().then(() => this.getPicker().setValues(values))
    },
  },
}
</script>

<style lang="scss">
@import '../styles/index.scss';
</style>
