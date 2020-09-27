<template>
    <view class="i-button" :class="[customClass, 'i-button--' + type, plain && 'i-button--plain', disabled && 'i-button--disabled']" :style="[mergeStyle]" @click="onClick">
        <template v-if="loading">
            <i-loading class="i-button__loading" :type="loadingType" :size="loadingSize" :color="leftColor" />
        </template>
        <template v-if="icon">
            <i-icon class="i-button__icon" :name="icon" :font-family="iconFont" :color="leftColor" />
        </template>
        <!-- 兼容使用 text 的情况 -->
        <template v-if="text">
            <text class="i-button__text" :class="['i-button__text--' + type, plain && 'i-button__text--plain--' + type]" :style="[mergeTextStyle]">{{ text }}</text>
        </template>
        <template v-else>
            <!-- #ifdef APP-NVUE -->
            <text v-if="$slots.default && $slots.default[0].tag === 'u-text'" class="i-button__text" :class="['i-button__text--' + type, plain && 'i-button__text--plain--' + type]" :style="[mergeTextStyle]">{{ $slots.default[0].children[0].text }}</text>
            <!-- #endif -->
            <!-- #ifndef APP-NVUE -->
            <text v-if="$slots.default" class="i-button__text" :class="['i-button__text--' + type, plain && 'i-button__text--plain--' + type]" :style="[mergeTextStyle]"><slot /></text>
            <!-- #endif -->
        </template>
    </view>
</template>

<script>

import IComponent from '../mixins/component'
import ILoading from '../i-loading/i-loading'
import IIcon from '../i-icon/i-icon'
import { BUTTON } from '../common/config'

export default {
    name: 'IButton',
    components: {
        IIcon,
        ILoading
    },
    mixins: [IComponent],
    props: {
        text: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: 'default'
        },
        color: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        },
        plain: {
            type: Boolean,
            default: false
        },
        icon: {
            type: String,
            default: ''
        },
        iconFont: {
            type: String,
            default: 'iuiIconFont'
        },
        loading: {
            type: Boolean,
            default: false
        },
        loadingType: {
            type: String,
            default: 'circular'
        },
        loadingSize: {
            type: [Number, String],
            default: '20px'
        },
        textStyle: {
            type: Object,
            default: () => ({})
        }
    },
    computed: {
        leftColor() {
            if (this.plain) {
                return BUTTON.type[this.type] || BUTTON.text.color
            } else {
                return BUTTON.type[this.type] ? 'white' : BUTTON.text.color
            }
        },
        mergeStyle() {
            const viewStyle = {}
            const { color, plain, customStyle } = this

            // #ifndef APP-NVUE
            if (color) {
                if (!plain) {
                    viewStyle.background = color
                }
                if (color.indexOf('gradient') !== -1) {
                    viewStyle.borderWidth = 0
                    viewStyle.color = plain ? BUTTON.text.color : 'white'
                } else {
                    viewStyle.borderColor = color
                    viewStyle.color = plain ? color : 'white'
                }
            }
            // #endif

            return Object.assign({}, customStyle, viewStyle)
        },
        mergeTextStyle() {
            const viewStyle = {}
            const { color, type, icon, plain, loading, textStyle } = this

            // #ifdef APP-NVUE

            viewStyle.fontSize = BUTTON.text.fontSize
            viewStyle.color = BUTTON.type[type] ? 'white' : BUTTON.text.color

            if (plain) {
                viewStyle.color = BUTTON.type[type] || BUTTON.text.color
            }

            if (color) {
                if (color.indexOf('gradient') !== -1) {
                    viewStyle.color = plain ? BUTTON.text.color : 'white'
                } else {
                    viewStyle.color = plain ? color : 'white'
                }
            }

            if (icon || loading) {
                viewStyle.marginLeft = '4px'
            }
            // #endif

            return Object.assign({}, viewStyle, textStyle)
        }
    },
    methods: {
        onClick(event) {
            if (!this.loading && !this.disabled) {
                this.$emit('click', event)
            }
        }
    }
}
</script>

<style lang="scss">
	@import '../styles/index.scss';

    .i-button {
        @include flex-box('row');
        align-items: center;
        justify-content: center;
        height: $button-default-height;
        font-size: $button-default-font-size;
        /* #ifndef APP-NVUE */
        opacity: 1;
        transition: opacity $animation-duration-fast;
        /* #endif */

        &--default {
            color: $button-default-color;
            background-color: $button-default-background-color;
            border-width: $button-border-width;
            border-style: solid;
            border-color: $button-default-border-color;
        }

        &--primary {
            color: $button-primary-color;
            background-color: $button-primary-background-color;
            border-width: $button-border-width;
            border-style: solid;
            border-color: $button-primary-border-color;
        }

        &--info {
            color: $button-info-color;
            background-color: $button-info-background-color;
            border-width: $button-border-width;
            border-style: solid;
            border-color: $button-info-border-color;
        }

        &--danger {
            color: $button-danger-color;
            background-color: $button-danger-background-color;
            border-width: $button-border-width;
            border-style: solid;
            border-color: $button-danger-border-color;
        }

        &--warning {
            color: $button-warning-color;
            background-color: $button-warning-background-color;
            border-width: $button-border-width;
            border-style: solid;
            border-color: $button-warning-border-color;
        }

        &--plain {
            background-color: $button-plain-background-color;
            /* #ifndef APP-NVUE */
            &.i-button--default {
                color: $button-default-color;
            }

            &.i-button--primary {
                color: $button-primary-background-color;
            }

            &.i-button--info {
                color: $button-info-background-color;
            }

            &.i-button--danger {
                color: $button-danger-background-color;
            }

            &.i-button--warning {
                color: $button-warning-background-color;
            }
            /* #endif */
        }

        &--active {
            opacity: $active-opacity;
        }

        &:active {
            opacity: $active-opacity;
        }

        &--disabled {
            opacity: $button-disabled-opacity;
        }
    }

	/* #ifndef APP-NVUE */
	.i-button__icon+.i-button__text:not(:empty),
	.i-button__loading+.i-button__text:not(:empty) {
        margin-left: 4px
	}
	/* #endif */

</style>
