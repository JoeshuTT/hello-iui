<template>
  <view class="i-col" :class="[customClass, 'i-col--' + span]" :style="[mergeStyle]" @click="onClick">
    <slot />
  </view>
</template>

<script>
import IComponent from '../mixins/component'
// #ifdef APP-NVUE
const dom = weex.requireModule('dom')
// #endif

export default {
  name: 'Icol',
  mixins: [IComponent],
  inject: {
    iRow: {
      default: null,
    },
    gutter: {
      default: 0,
    },
  },
  props: {
    span: {
      type: [Number, String],
      default: 0,
    },
  },
  data() {
    return {
      width: '100px',
    }
  },
  computed: {
    mergeStyle() {
      const { gutter, customStyle, width } = this
      const style = {
        // #ifdef APP-NVUE
        width,
        // #endif
      }
      if (gutter) {
        const padding = `${Number(gutter) / 2}rpx`
        style.paddingLeft = padding
        style.paddingRight = padding
      }
      return Object.assign({}, style, customStyle)
    },
  },
  // #ifdef APP-NVUE
  mounted() {
    setTimeout(() => {
      dom.getComponentRect(this.$parent.$refs.iRow, res => {
        if (res.size && res.size.width) {
          const rect = res.size
          const parentWidth = rect.width
          this.width = (parentWidth / 24) * this.span + 'px'
        } else {
          console.error('get row width error')
        }
      })
    }, 100)
  },
  // #endif
  methods: {
    onClick(event) {
      this.$emit('click', event)
    },
  },
}
</script>

<style lang="scss">
@import '../styles/index.scss';

.i-col {
  @include flex-box();
  /* #ifndef APP-NVUE */
  min-height: 1px;
  /* #endif */
}

/* #ifndef APP-NVUE */
@for $i from 1 through 24 {
  .i-col--#{$i} {
    width: $i * 100% / 24;
  }
}
/* #endif */
</style>
