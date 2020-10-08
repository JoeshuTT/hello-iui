<template>
    <!-- #ifndef APP-NVUE -->
    <view
        class="i-button"
        :class="[customClass, utils.bem('button', [type, {plain, round, square, disabled}])]"
        :hover-class="hoverClass"
        :lang="lang"
        :form-type="formType"
        :style="[mergeStyle]"
        :open-type="disabled ? '' : openType "
        :sbusiness-id="businessId"
        :session-from="sessionFrom"
        :send-message-title="sendMessageTitle"
        :send-message-path="sendMessagePath"
        :send-message-img="sendMessageImg"
        :show-message-card="showMessageCard"
        :app-parameter="appParameter"
        @click="onClick"
        @getuserinfo="bindGetUserInfo"
        @contact="bindContact"
        @getphonenumber="bindGetPhoneNumber"
        @error="bindError"
        @launchapp="bindLaunchApp"
        @opensetting="bindOpenSetting"
    >
        <template v-if="loading">
            <slot name="loading"><i-loading custom-class="i-button__loading" class="i-button__loading" :type="loadingType" :size="loadingSize" :color="leftColor" /></slot>
        </template>
        <template v-if="icon">
            <i-icon custom-class="i-button__icon" class="i-button__icon" :name="icon" :font-family="iconFont" :class-prefix="classPrefix" :color="leftColor" />
        </template>
        <!-- 兼容使用 text 的情况 -->
        <template v-if="text">
            <text class="i-button__text" :style="[mergeTextStyle]">{{ text }}</text>
        </template>
        <template v-else>
            <text v-if="$slots.default" class="i-button__text" :style="[mergeTextStyle]"><slot /></text>
        </template>
    </view>
    <!-- #endif -->
    <!-- #ifdef APP-NVUE -->
    <!-- eslint-disable-next-line -->
        <view
        class="i-button"
        :class="[customClass, 'i-button--' + type, plain && 'i-button--plain', disabled && 'i-button--disabled', round && 'i-button--round', square && 'i-button--square']"
        :style="[mergeStyle]"
        @click="onClick"
    >
        <template v-if="loading">
            <i-loading custom-class="i-button__loading" class="i-button__loading" :type="loadingType" :size="loadingSize" :color="leftColor" />
        </template>
        <template v-if="icon">
            <i-icon custom-class="i-button__icon" class="i-button__icon" :name="icon" :font-family="iconFont" :color="leftColor" />
        </template>
        <!-- 兼容使用 text 的情况 -->
        <template v-if="text">
            <text class="i-button__text" :style="[mergeTextStyle]">{{ text }}</text>
        </template>
        <template v-else>
            <text v-if="$slots.default && $slots.default[0] && $slots.default[0].tag === 'u-text'" class="i-button__text" :style="[mergeTextStyle]">{{ $slots.default[0].children[0].text }}</text>
        </template>
    </view>
    <!-- #endif -->
</template>
<!-- #ifndef APP-NVUE -->
<!-- eslint-disable-next-line -->
<script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>
<!-- #endif -->
<script>

import IComponent from '../mixins/component'
import button from '../mixins/button'
import openType from '../mixins/open-type'
import ILoading from '../i-loading/i-loading'
import IIcon from '../i-icon/i-icon'
import { BUTTON } from '../common/config'

export default {
    name: 'IButton',
    components: {
        IIcon,
        ILoading
    },
    mixins: [IComponent, button, openType],
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
        round: {
            type: Boolean,
            default: false
        },
        square: {
            type: Boolean,
            default: false
        },
        icon: {
            type: String,
            default: ''
        },
        classPrefix: {
            type: String,
            default: 'i-icon'
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
        },
        formType: {
            type: String,
            default: ''
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

            // #ifdef APP-NVUE
            viewStyle.height = BUTTON.height.default
            viewStyle.backgroundColor = BUTTON.type[this.type] || 'white'
            viewStyle.borderWidth = '1px'
            viewStyle.borderStyle = 'solid'
            viewStyle.borderColor = BUTTON.type[this.type] || BUTTON.border.color
            // viewStyle.borderRadius = '999px'
            // #endif

            if (color) {
                // #ifndef APP-NVUE
                viewStyle.color = plain ? color : 'white'
                // #endif
                if (color.indexOf('gradient') !== -1) {
                    if (!plain) {
                        viewStyle.backgroundImage = color
                    }
                    viewStyle.borderWidth = 0
                } else {
                    if (!plain) {
                        viewStyle.backgroundColor = color
                    }
                    viewStyle.borderColor = color
                }
            }

            // #ifdef APP-NVUE
            if (plain) {
                viewStyle.backgroundColor = 'white'
            }
            // #endif

            return Object.assign({}, viewStyle, customStyle)
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

            // #endif

            return Object.assign({}, viewStyle, textStyle)
        }
    },
    methods: {
        onClick() {
            if (!this.loading && !this.disabled) {
                this.$emit('click')
            }
        }
    }
}
</script>

<style lang="scss">
	@import '../styles/index.scss';

    .i-button {
        position: relative;
        @include flex-box('row');
        align-items: center;
        justify-content: center;
        /* #ifndef APP-NVUE */
        height: $button-default-height;
        line-height: $button-default-line-height;
        padding: 0;
        margin-left: 0;
        margin-right: 0;
        text-align: center;
        vertical-align: middle;
        -webkit-appearance: none;
        -webkit-text-size-adjust: 100%;
        font-size: $button-default-font-size;
        border-radius: $button-border-radius;
        opacity: 1;
        transition: opacity $animation-duration-fast;
        /* #endif */
        /* #ifndef APP-NVUE */
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

        }

        &::after {
            border-width: 0;
            display: none;
        }

        &__icon + &__text,
        &__loading + &__text {
            margin-left: 4px;
        }
        /* #endif */

        &--square {
            border-radius: 0;
        }

        &--round {
            border-radius: $button-round-border-radius;
        }

        &--active {
            opacity: $active-opacity;
        }
        /* #ifdef APP-NVUE */
        &:active {
            opacity: $active-opacity;
        }
        /* #endif */
        &--disabled {
            opacity: $button-disabled-opacity;
        }
    }

</style>
