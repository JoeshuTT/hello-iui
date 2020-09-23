<template>
    <view class="i-button" :class="[customClass, 'i-button--' + type, plain && 'i-button--plain', disabled && 'i-button--disabled']" :style="[customStyle]" @click="onClick">
        <template v-if="loading">
            <i-loading v-if="loading" :type="loadingType" class="i-button__loading" :size="loadingSize" :color="loadingColor" />
            <text v-if="loadingText" class="i-button__loading-text" :class="['i-button__text--' + type, plain && 'i-button__text--plain--' + type]">{{ loadingText }}</text>
        </template>
        <template v-else>
            <i-icon v-if="icon" :name="icon" :font-family="iconFont" :color="iconColor" class="i-button__icon" />
            <template v-if="text">
                <text class="i-button__text" :class="['i-button__text--' + type, plain && 'i-button__text--plain--' + type, icon && 'i-button__text--inline']" :style="[textStyle]">{{ text }}</text>
            </template>
            <template v-else>
                <!-- #ifdef APP-NVUE -->
                <text v-if="$slots.default && $slots.default[0].tag === 'u-text'" class="i-button__text" :class="['i-button__text--' + type, plain && 'i-button__text--plain--' + type, icon && 'i-button__text--inline']" :style="[textStyle]">{{ $slots.default[0].children[0].text }}</text>
                <!-- #endif -->
                <!-- #ifndef APP-NVUE -->
                <text v-if="$slots.default" class="i-button__text" :class="['i-button__text--' + type, plain && 'i-button__text--plain--' + type, icon && 'i-button__text--inline']" :style="[textStyle]"><slot /></text>
                <!-- #endif -->
            </template>
            </text>
        </template>
    </view>
</template>

<script>

import IComponent from '../mixins/component'
import ILoading from '../i-loading/i-loading'
import IIcon from '../i-icon/i-icon'

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
        loadingText: {
            type: String,
            default: ''
        },
        textStyle: {
            type: Object,
            default: () => ({})
        }
    },
    computed: {
        loadingColor() {
            if (this.type === 'default') {
                return '#c9c9c9'
            }

            return 'white'
        },
        iconColor() {
            if (this.type === 'default') {
                return '#323233'
            }

            return 'white'
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
        font-size: $button-normal-font-size;
        opacity: 1;
		transition: opacity $animation-duration-fast;

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

		&--active {
			opacity: $active-opacity;
		}

		&:active {
			opacity: $active-opacity;
		}

		&--plain {
			background-color: $button-plain-background-color;
		}

		&--disabled {
			opacity: $button-disabled-opacity;
		}
	}

	.i-button__text {
        /* #ifdef APP-NVUE */
		font-size: $button-normal-font-size;
        /* #endif */
		&--default {
			color: $button-default-color;
		}

		&--primary {
			color: $button-primary-color;
		}

		&--info {
			color: $button-info-color;
		}

		&--danger {
			color: $button-danger-color;
		}

		&--warning {
			color: $button-warning-color;
		}

		&--plain {

			&--default {
				color: $button-default-color;
			}

			&--primary {
				color: $button-primary-background-color;
			}

			&--info {
				color: $button-info-background-color;
			}

			&--danger {
				color: $button-danger-background-color;
			}

			&--warning {
				color: $button-warning-background-color;
			}
		}

	}

	.i-button__loading-text {
        /* #ifdef APP-NVUE */
		font-size: $button-normal-font-size;
        /* #endif */
		margin-left: 4px;
	}

    .i-button__text--inline {
      margin-left: 4px
    }

</style>
