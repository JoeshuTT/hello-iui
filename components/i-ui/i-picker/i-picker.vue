<template>
  <view class="i-picker" :class="[customClass]">
    <slot name="columns-top" />
    <slot>
      <view v-if="showToolbar" class="i-picker__toolbar i-hairline--bottom" :class="[toolbarClass]">
        <text
          class="i-picker__cancel"
          hover-class="i-picker__cancel--hover"
          hover-stay-time="70"
          @click="emit('cancel')"
        >
          {{ cancelButtonText }}
        </text>
        <text v-if="title" class="i-picker__title i-ellipsis">{{ title }}</text>
        <text
          class="i-picker__confirm"
          hover-class="i-picker__confirm--hover"
          hover-stay-time="70"
          @click="emit('confirm')"
        >
          {{ confirmButtonText }}
        </text>
      </view>
    </slot>

    <view v-if="loading" class="i-picker__loading">
      <slot name="loading">loading...</slot>
    </view>

    <view
      class="i-picker__columns"
      :style="{ height: `${itemPxHeight * visibleItemCount}px` }"
      @touchmove.stop.prevent="noop"
    >
      <i-picker-column
        v-for="(item, index) in formattedColumns"
        :key="index"
        :value-key="valueKey"
        :initial-options="item.values"
        :default-index="item.defaultIndex"
        :item-height="itemPxHeight"
        :visible-item-count="visibleItemCount"
        :active-class="activeClass"
        :column-class="columnClass"
        :custom-class="item.className"
        @change="onChange(index)"
      />
      <view
        class="i-picker__mask"
        :style="{ backgroundSize: `100% ${(itemPxHeight * visibleItemCount - itemPxHeight) / 2}px` }"
      />
      <view class="i-picker__frame i-hairline--top-bottom" :style="{ height: `${itemPxHeight}px` }" />
    </view>
    <slot name="columns-bottom" />
  </view>
</template>

<script>
import IComponent from '../mixins/component'
import Emitter from '../mixins/emitter'
import { pickerProps, DEFAULT_ITEM_HEIGHT } from './shared'
import IPickerColumn from '../i-picker-column/i-picker-column'
import { isDef, unitToPx } from '../utils'

export default {
  name: 'IPicker',
  components: {
    IPickerColumn,
  },
  mixins: [IComponent, Emitter],
  props: {
    ...pickerProps,
    defaultIndex: {
      type: Number,
      default: 0,
    },
    columns: {
      type: Array,
      default: () => [],
    },
    valueKey: {
      type: String,
      default: 'text',
    },
  },
  data() {
    return {
      formattedColumns: [],
      children: [],
    }
  },
  computed: {
    itemPxHeight() {
      return this.itemHeight ? unitToPx(this.itemHeight) : DEFAULT_ITEM_HEIGHT
    },

    dataType() {
      const { columns } = this
      const firstColumn = columns[0] || {}

      if (firstColumn.children) {
        return 'cascade'
      }

      if (firstColumn.values) {
        return 'object'
      }

      return 'text'
    },
  },
  watch: {
    columns: {
      handler: 'format',
      immediate: true,
    },
  },
  created() {
    this.$on('pushChildren', this.addChildCom)
  },
  methods: {
    format() {
      const { columns, dataType } = this

      if (dataType === 'text') {
        this.formattedColumns = [{ values: columns }]
      } else if (dataType === 'cascade') {
        this.formatCascade()
      } else {
        this.formattedColumns = columns
      }
    },
    formatCascade() {
      const formatted = []

      let cursor = { children: this.columns }

      while (cursor && cursor.children) {
        const defaultIndex = isDef(cursor.defaultIndex) ? cursor.defaultIndex : +this.defaultIndex

        formatted.push({
          values: cursor.children,
          className: cursor.className,
          defaultIndex,
        })

        cursor = cursor.children[defaultIndex]
      }

      this.formattedColumns = formatted
    },
    addChildCom(component) {
      this.children.push(component)
    },
    emit(type) {
      if (this.dataType === 'text') {
        this.$emit(type, this.getColumnValue(0), this.getColumnIndex(0))
      } else {
        this.$emit(type, this.getValues(), this.getIndexes())
      }
    },

    onCascadeChange(columnIndex) {
      let cursor = { children: this.columns }
      const indexes = this.getIndexes()

      for (let i = 0; i <= columnIndex; i++) {
        cursor = cursor.children[indexes[i]]
      }

      while (cursor && cursor.children) {
        columnIndex++
        this.setColumnValues(columnIndex, cursor.children)
        cursor = cursor.children[cursor.defaultIndex || 0]
      }
    },

    onChange(columnIndex) {
      if (this.dataType === 'cascade') {
        this.onCascadeChange(columnIndex)
      }

      if (this.dataType === 'text') {
        this.$emit('change', this, this.getColumnValue(0), this.getColumnIndex(0))
      } else {
        this.$emit('change', this, this.getValues(), this.getIndexes())
      }
    },

    // get column instance by index
    getColumn(index) {
      return this.children[index]
    },

    // @exposed-api
    // get column value by index
    getColumnValue(index) {
      const column = this.getColumn(index)

      return column && column.getValue()
    },

    // @exposed-api
    // set column value by index
    setColumnValue(index, value) {
      const column = this.getColumn(index)

      if (column == null) {
        return Promise.reject(new Error('setColumnValue: 对应列不存在'))
      }

      if (column) {
        if (this.dataType === 'cascade') {
          this.onCascadeChange(index)
        }
        return column.setValue(value)
      }
    },

    // @exposed-api
    // get column option index by column index
    getColumnIndex(columnIndex) {
      return (this.getColumn(columnIndex) || {}).currentIndex
    },

    // @exposed-api
    // set column option index by column index
    setColumnIndex(columnIndex, optionIndex) {
      const column = this.getColumn(columnIndex)

      if (column == null) {
        return Promise.reject(new Error('setColumnValue: 对应列不存在'))
      }

      if (column) {
        if (this.dataType === 'cascade') {
          this.onCascadeChange(columnIndex)
        }
        return column.setIndex(optionIndex)
      }
    },

    // @exposed-api
    // get options of column by index
    getColumnValues(index) {
      return (this.children[index] || {}).options
    },

    // @exposed-api
    // set options of column by index
    setColumnValues(index, options, needReset = true) {
      const column = this.children[index]

      if (column == null) {
        return Promise.reject(new Error('setColumnValue: 对应列不存在'))
      }

      const isSame = JSON.stringify(column.options) === JSON.stringify(options)

      if (isSame) {
        return Promise.resolve()
      }

      column.options = options
      return this.$nextTick().then(() => {
        if (needReset) {
          column.setIndex(0)
        }
      })
    },

    // @exposed-api
    // get values of all columns
    getValues() {
      return this.children.map(child => child.getValue())
    },

    // @exposed-api
    // set values of all columns
    setValues(values) {
      const stack = values.map((value, index) => this.setColumnValue(index, value))
      return Promise.all(stack)
    },

    // @exposed-api
    // get indexes of all columns
    getIndexes() {
      return this.children.map(child => child.currentIndex)
    },

    // @exposed-api
    // set indexes of all columns
    setIndexes(indexes) {
      const stack = indexes.map((optionIndex, columnIndex) => this.setColumnIndex(columnIndex, optionIndex))
      return Promise.all(stack)
    },
  },
}
</script>

<style lang="scss">
@import '../styles/index.scss';

.i-picker {
  position: relative;
  overflow: hidden;
  /* #ifndef APP-NVUE */
  -webkit-text-size-adjust: 100%; /* avoid iOS text size adjust */
  user-select: none;
  /* #endif */
  background-color: $picker-background-color;

  &__toolbar {
    @include flex-box('row');
    justify-content: space-between;
    align-items: center;
    height: $picker-toolbar-height;
  }

  &__cancel,
  &__confirm {
    padding: $picker-action-padding;
    font-size: $picker-action-font-size;
    line-height: $picker-toolbar-height;
  }

  &--hover {
    opacity: $active-opacity;
  }

  &__confirm {
    color: $picker-confirm-action-color;
  }

  &__cancel {
    color: $picker-cancel-action-color;
  }

  &__title {
    /* #ifndef APP-NVUE */
    max-width: 50%;
    /* #endif */
    text-align: center;
    font-weight: $font-weight-bold;
    font-size: $picker-option-font-size;
  }
  /* #ifndef APP-NVUE */

  &__columns {
    position: relative;
    @include flex-box('row');
  }

  &__columns {
    position: relative;
    @include flex-box('row');
  }

  &__loading {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 4;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: $picker-loading-mask-color;
    color: $picker-loading-icon-color;
  }

  &__mask {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(180deg, hsla(0, 0%, 100%, 0.9), hsla(0, 0%, 100%, 0.4)),
      linear-gradient(0deg, hsla(0, 0%, 100%, 0.9), hsla(0, 0%, 100%, 0.4));
    background-repeat: no-repeat;
    background-position: top, bottom;
    backface-visibility: hidden;
    pointer-events: none;
  }

  &__frame {
    position: absolute;
    top: 50%;
    right: $padding-md;
    left: $padding-md;
    z-index: 1;
    transform: translateY(-50%);
    pointer-events: none;
  }
  /* #endif */
}
</style>
