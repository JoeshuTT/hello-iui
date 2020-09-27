<template>
    <view class="i-cell" :class="[customClass, center && 'i-cell--center', (isLink || clickable) && 'i-cell--clickable', border && 'i-cell--border']" :style="[customStyle]" @click="onClick">
        <view class="i-cell__title">
            <slot name="title"><text v-if="title" class="i-cell__title-text">{{ title }}</text></slot>
            <slot name="label"><text v-if="label" class="i-cell__label">{{ label }}</text></slot>
        </view>
        <slot>
            <view v-if="value" class="i-cell__value">
                <text class="i-cell__value-text">{{ value }}</text>
            </view>
        </slot>
        <view v-if="isLink" class="i-cell__right-icon-wrap">
            <i-icon name="arrow" />
        </view>
        <slot v-else name="rightIcon" />
    </view>
</template>

<script>

import IComponent from '../mixins/component'
import IIcon from '../i-icon/i-icon'

export default {
    name: 'ICell',
    components: {
        IIcon
    },
    mixins: [IComponent],
    props: {
        title: {
            type: [Number, String],
            default: ''
        },
        value: {
            type: [Number, String],
            default: ''
        },
        label: {
            type: String,
            default: ''
        },
        border: {
            type: Boolean,
            default: true
        },
        center: {
            type: Boolean,
            default: false
        },
        isLink: {
            type: Boolean,
            default: false
        },
        clickable: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        onClick(event) {
            this.$emit('click', event)
        }

    }

}
</script>

<style lang="scss">
	@import '../styles/index.scss';

    .i-cell {
        @include flex-box('row');
        position: relative;
        padding: $cell-vertical-padding $cell-horizontal-padding;
        background-color: $cell-background-color;
        /* #ifndef APP-NVUE */
        font-size: $cell-font-size;
        line-height: $cell-line-height;
        /* #endif */

        &--center {
            align-items: center;
        }

        &--border {
            /* #ifndef APP-NVUE */
            &:after {
                @include hairline-bottom();
            }
            /* #endif */
            /* #ifdef APP-NVUE */
            border-bottom-style: solid;
            border-bottom-width: 1px;
            border-bottom-color: $cell-border-color;
            /* #endif */
        }

        &--clickable:active {
            background-color: $cell-active-color;
        }

        &__title ,&__value {
            flex: 1;
        }

        &__title {
            @include flex-box();
            &-text {
                font-size: $cell-title-font-size;
                line-height: $cell-title-line-height;
                color: $cell-title-color;
            }
        }

        &__value {
            @include flex-box('row');
            justify-content: flex-end;
            &-text {
                font-size: $cell-font-size;
                line-height: $cell-line-height;
                color: $cell-value-color;
            }
        }

        &__label {
            margin-top: 4px;
            font-size: $cell-label-font-size;
            color: $cell-label-color;
            line-height: $cell-label-line-height;
        }

        &__right-icon-wrap{
            @include flex-box();
            justify-content: center;
        }

    }
</style>
