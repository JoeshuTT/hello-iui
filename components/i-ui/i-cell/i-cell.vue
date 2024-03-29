<template>
  <view
    class="i-cell"
    :class="[center && 'i-cell--center', (isLink || clickable) && 'i-cell--clickable', border && 'i-cell--border']"
    :style="[customStyle]"
    @click="onClick"
  >
    <view v-if="$slots.icon" class="i-cell__left-icon-wrap">
      <slot name="icon" />
    </view>
    <view class="i-cell__title">
      <slot name="title">
        <text v-if="title" class="i-cell__title-text">{{ title }}</text>
      </slot>
      <slot name="label">
        <text v-if="label" class="i-cell__label">{{ label }}</text>
      </slot>
    </view>
    <view v-if="value || $slots.default" class="i-cell__value">
      <slot name="default">
        <text class="i-cell__value-text">{{ value }}</text>
      </slot>
    </view>
    <view v-if="isLink" class="i-cell__right-icon-wrap">
      <i-icon :name="arrowDirection ? 'arrow' + '-' + arrowDirection : 'arrow'" />
    </view>
    <view v-if="$slots['right-icon']" class="i-cell__right-icon-wrap">
      <slot name="right-icon" />
    </view>
  </view>
</template>

<script>
import IIcon from '../i-icon/i-icon'

export default {
  name: 'ICell',
  components: {
    IIcon,
  },
  props: {
    title: {
      type: null,
      default: '',
    },
    value: {
      type: null,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    border: {
      type: Boolean,
      default: true,
    },
    center: {
      type: Boolean,
      default: false,
    },
    isLink: {
      type: Boolean,
      default: false,
    },
    arrowDirection: {
      type: String,
      default: '',
    },
    clickable: {
      type: Boolean,
      default: false,
    },
    customStyle: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    onClick() {
      this.$emit('click')
    },
  },
}
</script>

<style lang="scss">
@import '../styles/index.scss';

.i-cell {
  @include flex-box('row');
  position: relative;
  padding: $cell-vertical-padding $cell-horizontal-padding;
  background-color: $cell-background-color;

  &--center {
    align-items: center;
  }

  &--border {
    /* #ifndef APP-PLUS-NVUE */
    &::after {
      @include hairline-bottom($border-color, $padding-md, $padding-md);
    }
    /* #endif */
    /* #ifdef APP-PLUS-NVUE */
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-bottom-color: $cell-border-color;
    /* #endif */
  }

  &--clickable:active {
    background-color: $cell-active-color;
  }

  &__title,
  &__value {
    flex: 1;
  }

  &__title {
    @include flex-box();

    &-text {
      font-size: $cell-title-font-size;
      line-height: $cell-title-line-height;
      color: $cell-title-color;
      // @include ellipsis();
    }
  }

  &__label {
    margin-top: 4px;
    font-size: $cell-label-font-size;
    line-height: $cell-label-line-height;
    color: $cell-label-color;
  }

  &__value {
    @include flex-box('row');
    justify-content: flex-end;
    align-items: center;

    &-text {
      font-size: $cell-font-size;
      line-height: $cell-line-height;
      color: $cell-value-color;
    }
  }

  &__left-icon-wrap {
    @include flex-box('row');
    align-items: center;
    margin-right: 4px;
  }

  &__right-icon-wrap {
    @include flex-box('row');
    align-items: center;
    margin-left: 4px;
  }
}
</style>
