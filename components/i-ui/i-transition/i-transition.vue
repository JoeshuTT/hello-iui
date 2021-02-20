<template>
  <view v-if="inited" ref="ani" class="i-transition" :style="[mergeStyle]" @click="onClick">
    <slot />
  </view>
</template>

<script>
import { isObj } from '../utils'
import { TRANSITION } from '../common/config'
// #ifdef APP-NVUE
const animation = uni.requireNativePlugin('animation')
// #endif
const nextTick = () => new Promise(resolve => setTimeout(resolve, 1000 / 30))
const animationMap = TRANSITION.animationMap
const getStyle = name => animationMap[name]

export default {
  name: 'ITransition',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      default: 'fade',
    },
    duration: {
      type: null,
      default: 300,
    },
    animConfig: {
      type: Object,
      default: () => ({}),
    },
    customStyle: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    const currentDuration = isObj(this.duration) ? this.duration.enter : this.duration

    return {
      inited: false,
      aniStyle: {},
      status: '',
      classes: '',
      viewStyle: {},
      transitionEnded: false,
      currentDuration,
    }
  },
  computed: {
    mergeStyle() {
      const { customStyle, aniStyle } = this

      return Object.assign({}, customStyle, aniStyle)
    },
    currentDisplay() {
      let display = 'block'
      // #ifdef APP-NVUE
      display = 'flex'
      // #endif
      return this.customStyle.display || display
    },
  },
  watch: {
    show: {
      handler(value) {
        if (value) {
          this.enter()
        } else {
          this.leave()
        }
      },
      immediate: true,
    },
  },
  methods: {
    onClick() {
      this.$emit('click')
    },
    enter() {
      this.$emit('beforeEnter')
      const { name, duration } = this
      const currentDuration = isObj(duration) ? duration.enter : duration
      const currentStyle = getStyle(name) || this.animConfig

      this.inited = true

      // #ifndef APP-NVUE
      this.aniStyle = {
        ...currentStyle['enter'],
        transitionTimingFunction: 'ease',
        transitionDuration: `${currentDuration}ms`,
        display: this.currentDisplay,
      }
      this.$emit('enter')

      this.$nextTick()
        .then(nextTick)
        .then(() => {
          this.aniStyle = Object.assign({}, this.aniStyle, currentStyle['enter-to'])
          this.$emit('afterEnter')
        })
        .catch(() => {})
      // #endif

      // #ifdef APP-NVUE
      this.aniStyle = {
        ...currentStyle['enter'],
      }
      this.$emit('enter')
      this.$nextTick()
        .then(nextTick)
        .then(() => {
          animation.transition(
            this.$refs.ani,
            {
              styles: currentStyle['enter-to'],
              duration: currentDuration,
              timingFunction: 'ease',
              needLayout: false,
              delay: 0,
            },
            () => {
              this.$emit('afterEnter')
            },
          )
        })
        .catch(() => {})
      // #endif
    },
    leave() {
      this.$emit('beforeLeave')
      if (!this.inited) {
        return
      }

      const { name, duration } = this
      const currentDuration = isObj(duration) ? duration.leave : duration
      const currentStyle = getStyle(name) || this.animConfig

      // #ifndef APP-NVUE
      this.aniStyle = Object.assign({}, this.aniStyle, currentStyle['leave-to'], {
        transitionDuration: `${currentDuration}ms`,
      })
      this.$emit('leave')

      setTimeout(() => {
        this.aniStyle = {
          display: 'none',
        }
        this.$emit('afterLeave')
      }, currentDuration)
      // #endif

      // #ifdef APP-NVUE
      this.$emit('leave')
      animation.transition(
        this.$refs.ani,
        {
          styles: currentStyle['leave-to'],
          duration: currentDuration,
          timingFunction: 'ease',
          needLayout: false,
          delay: 0,
        },
        () => {
          this.$emit('afterLeave')
          this.inited = false
        },
      )
      // #endif
    },
  },
}
</script>

<style lang="scss">
@import '../styles/index.scss';

.i-transition {
  // transition-timing-function: ease;
}
</style>
