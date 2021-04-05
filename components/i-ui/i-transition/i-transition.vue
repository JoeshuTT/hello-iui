<template>
  <view v-if="inited" ref="ani" class="i-transition" :style="[mergeStyle]" @click="onClick">
    <slot />
  </view>
</template>

<script>
import { isObj } from '../utils/validate'
import { TRANSITION } from '../index'
// #ifdef APP-NVUE
const animation = uni.requireNativePlugin('animation')
// #endif
const requestAnimationFrame = () => new Promise(resolve => setTimeout(resolve, 1000 / 30))
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
    currentDisplay() {
      let display = 'block'
      // #ifdef APP-NVUE
      display = 'flex'
      // #endif
      return this.customStyle.display || display
    },
    mergeStyle() {
      const { customStyle, aniStyle } = this
      // #ifndef APP-NVUE
      delete customStyle.display
      // #endif
      return Object.assign({}, aniStyle, customStyle)
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
      const { name, duration } = this
      const currentDuration = isObj(duration) ? duration.enter : duration
      const currentStyle = getStyle(name) || this.animConfig
      this.$emit('beforeEnter')

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
        .then(requestAnimationFrame)
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
        .then(requestAnimationFrame)
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
      if (!this.inited) {
        return
      }

      const { name, duration } = this
      const currentDuration = isObj(duration) ? duration.leave : duration
      const currentStyle = getStyle(name) || this.animConfig
      this.$emit('beforeLeave')

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
  transition-timing-function: ease;
}
</style>
