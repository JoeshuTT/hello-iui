<template>
  <view class="i-stepper">
    <view type="view" class="i-stepper__minus" :class="[disabledLeft && 'i-stepper--disabled']" @click="onMinus">
      <slot name="minus">
        <text class="i-icon i-icon-minus i-stepper__icon">{{ iconType['minus'] }}</text>
      </slot>
    </view>
    <input
      :disabled="disabled || disabledInput"
      type="number"
      :value="currentValue"
      class="i-stepper__input"
      :class="[(disabled || disabledInput) && 'i-stepper__input--disabled']"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
    />
    <view type="view" class="i-stepper__plus" :class="[disabledRight && 'i-stepper--disabled']" @click="onPlus">
      <slot name="plus">
        <text class="i-icon i-icon-plus i-stepper__icon">{{ iconType['plus'] }}</text>
      </slot>
    </view>
  </view>
</template>
<script>
import iconType from '../i-icon/type'

export default {
  name: 'IStepper',
  props: {
    value: {
      type: [Number, String],
      default: 1,
    },
    min: {
      type: [Number, String],
      default: 1,
    },
    max: {
      type: [Number, String],
      default: '',
    },
    step: {
      type: [Number, String],
      default: 1,
    },
    name: {
      type: [Number, String],
      default: 1,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    disabledInput: {
      type: Boolean,
      default: false,
    },
    disabledPlus: {
      type: Boolean,
      default: false,
    },
    disabledMinus: {
      type: Boolean,
      default: false,
    },
    customStyle: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      currentValue: 0,
      iconType,
    }
  },
  computed: {
    disabledLeft() {
      const { disabled, disabledMinus, currentValue, min } = this
      if (disabled) return true
      return disabledMinus || currentValue <= min
    },
    disabledRight() {
      const { disabled, disabledPlus, currentValue, max } = this
      if (disabled) return true
      if (!max) return false

      return disabledPlus || currentValue >= max
    },
  },
  watch: {
    value(val) {
      this.currentValue = val
      this.$emit('change', val, { name: this.name })
    },
  },
  created() {
    this.currentValue = this.format(this.value)
  },
  methods: {
    onMinus() {
      this.onChange('minus')
    },
    onPlus() {
      this.onChange('plus')
    },
    onChange(type) {
      const { step, disabled, currentValue, max, min } = this
      if (disabled) {
        this.$emit('overlimit')
        return
      }
      const diff = type === 'minus' ? -step : +step
      const newValue = currentValue + diff
      if (type === 'plus' && max && newValue > max) {
        this.$emit('overlimit')
        return
      }

      if (type === 'minus' && min > 0 && newValue < min) {
        this.$emit('overlimit')
        return
      }

      this.$emit(type)
      this.$emit('input', newValue)
    },
    onInput(e) {
      const value = e.detail.value
      this.currentValue = this.format(value)
    },
    onFocus(e) {
      const value = e.detail.value
      this.currentValue = this.format(value)
      this.$emit('focus', e)
    },
    onBlur(e) {
      const value = e.detail.value
      this.currentValue = this.format(value)
      this.$emit('blur', e)
    },
    format(value) {
      const { max, min } = this
      return Math.max(Math.min(+max, value), +min)
    },
  },
}
</script>

<style lang="scss">
@import '../styles/index.scss';

.i-stepper {
  @include flex-box('row');
  position: relative;
  align-items: center;
  transition: background-color $switch-transition-duration;

  &__input {
    width: $stepper-input-width;
    height: $stepper-input-height;
    margin: 0 2px;
    color: $stepper-input-text-color;
    font-size: $stepper-input-font-size;
    line-height: $stepper-input-height;
    text-align: center;
    background-color: $stepper-background-color;

    &--disabled {
      color: $stepper-input-disabled-text-color;
    }
  }

  &__minus,
  &__plus {
    position: relative;
    @include flex-box();
    align-items: center;
    justify-content: center;
    width: $stepper-input-height;
    height: $stepper-input-height;
    background-color: $stepper-background-color;

    &--disabled {
      background-color: $stepper-button-disabled-color;
    }

    &:active {
      background-color: $stepper-active-color;
    }
  }

  &__minus {
    border-radius: $stepper-border-radius 0 0 $stepper-border-radius;
  }

  &__plus {
    border-radius: 0 $stepper-border-radius $stepper-border-radius 0;
  }

  &__icon {
    font-size: $stepper-input-font-size;
    color: $stepper-input-text-color;
    // color: $stepper-button-disabled-icon-color;
  }

  &--disabled {
    opacity: $stepper-disabled-opacity;
  }
}
</style>
