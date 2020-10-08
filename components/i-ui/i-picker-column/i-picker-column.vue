<template>
    <view
        class="i-picker-column"
        :class="[columnClass, customClass]"
        :style="{height: `${itemHeight * visibleItemCount}px`}"
        @touchstart="onTouchStart"
        @touchmove.stop.prevent="onTouchMove"
        @touchend="onTouchEnd"
        @touchcancel="onTouchEnd"
    >
        <view :style="[groupStyle]">
            <view
                v-for="(item, index) in options"
                :key="index"
                :style="{height: `${itemHeight}px`}"
                class="i-picker-column__item"
                :class="[item.disabled ? 'i-picker-column__item--disabled' : '', index === currentIndex ? 'i-picker-column__item--selected ' + activeClass : '']"
            ><text class="i-ellipsis i-picker-column__item-text">{{ getOptionText(item, valueKey) }}</text></view>
        </view>
    </view>
</template>

<script>
import IComponent from '../mixins/component'
import Emitter from '../mixins/emitter'
import { pickerProps } from '../i-picker/shared'

import { isObj, range } from '../utils'

const DEFAULT_DURATION = 200

export default {
    name: 'IPickerColumn',
    mixins: [IComponent, Emitter],
    props: {
        ...pickerProps,
        valueKey: {
            type: String,
            default: ''
        },
        initialOptions: {
            type: Array,
            default: () => ([])
        },
        defaultIndex: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            startY: 0,
            offset: 0,
            duration: 0,
            startOffset: 0,
            options: [],
            currentIndex: 0
        }
    },
    computed: {
        groupStyle() {
            const { duration, offset, itemHeight, visibleItemCount } = this
            return {
                transition: `transform ${duration}ms`,
                lineHeight: `${itemHeight}px`,
                transform: `translate3d(0, ${offset + (itemHeight * (visibleItemCount - 1)) / 2}px, 0)`
            }
        }
    },
    created() {
        const { defaultIndex, initialOptions } = this

        this.currentIndex = defaultIndex
        this.options = initialOptions
        this.$nextTick(() => {
            this.setIndex(defaultIndex)
        })
    },
    mounted() {
        //
        this.dispatch('IPicker', 'pushChildren', this)
    },
    methods: {
        getCount() {
            return this.options.length
        },

        onTouchStart(event) {
            this.startY = event.touches[0].clientY
            this.startOffset = this.offset
            this.duration = 0
        },

        onTouchMove(event) {
            const { startY, startOffset, itemHeight } = this
            const deltaY = event.touches[0].clientY - startY

            this.offset = range(startOffset + deltaY, -(this.getCount() * itemHeight), itemHeight)
        },

        onTouchEnd() {
            const { offset, startOffset, itemHeight } = this
            if (offset !== startOffset) {
                this.duration = DEFAULT_DURATION
                const index = range(Math.round(-offset / itemHeight), 0, this.getCount() - 1)
                this.setIndex(index, true)
            }
        },

        adjustIndex(index) {
            const { options } = this
            const count = this.getCount()

            index = range(index, 0, count)
            for (let i = index; i < count; i++) {
                if (!this.isDisabled(options[i])) return i
            }
            for (let i = index - 1; i >= 0; i--) {
                if (!this.isDisabled(options[i])) return i
            }
        },

        isDisabled(option) {
            return isObj(option) && option.disabled
        },

        getOptionText(option) {
            const { valueKey } = this
            return isObj(option) && valueKey in option
                ? option[valueKey]
                : option
        },

        setIndex(index, userAction) {
            const { itemHeight, currentIndex } = this
            index = this.adjustIndex(index) || 0
            const offset = -index * itemHeight

            if (index !== currentIndex) {
                this.offset = offset
                this.currentIndex = index
                return this.$nextTick()
                    .then(() => {
                        userAction && this.$emit('change', index)
                    })
            }

            this.offset = offset
            return this.$nextTick()
        },

        setValue(value) {
            const { options } = this
            for (let i = 0; i < options.length; i++) {
                if (this.getOptionText(options[i]) === value) {
                    return this.setIndex(i)
                }
            }
            return Promise.resolve()
        },

        getValue() {
            const { options, currentIndex } = this
            return options[currentIndex]
        }

    }
}
</script>

<style lang="scss">
	@import '../styles/index.scss';

    .i-picker-column {
        flex: 1;
        overflow: hidden;
        text-align: center;
        color: $picker-option-text-color;
        font-size: $picker-option-font-size;

        &__wrapper {
            flex: 1;
        }

        &__item {
            @include flex-box('row');
            align-items: center;
            justify-content: center;
            padding: 0 5px;

            &--selected {
                font-weight: $font-weight-bold;
                color: $picker-option-selected-text-color;
            }

            &--disabled {
                opacity: $picker-option-disabled-opacity;
            }
        }

    }

</style>
