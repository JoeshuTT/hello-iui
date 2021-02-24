<template>
  <view v-if="inited" class="i-transition" :class="[classes]" :style="[mergeStyle]" @click="onClick">
    <slot />
  </view>
</template>

<script>
import { isObj } from '../common/validator'

const nextTick = () => new Promise(resolve => setTimeout(resolve, 1000 / 30))
const getClassNames = name => ({
  enter: `i-${name}-enter i-${name}-enter-active`,
  'enter-to': `i-${name}-enter-to i-${name}-enter-active`,
  leave: `i-${name}-leave i-${name}-leave-active`,
  'leave-to': `i-${name}-leave-to i-${name}-leave-active`,
})

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
    customStyle: {
      type: Object,
      default: () => ({}),
    },
    animConfig: {
      type: null,
      default: null,
    },
  },
  data() {
    const currentDuration = isObj(this.duration) ? this.duration.enter : this.duration

    return {
      inited: false,
      display: false,
      status: '',
      classes: '',
      viewStyle: {},
      transitionEnded: false,
      currentDuration,
    }
  },
  computed: {
    mergeStyle() {
      const { viewStyle, customStyle } = this
      return {
        transitionDuration: `${this.currentDuration}ms`,
        display: `${this.display ? '' : 'none'}`,
        ...customStyle, // 避免自定义样式影响到动画属性
        ...viewStyle,
      }
    },
  },
  watch: {
    show: {
      handler(value) {
        value ? this.enter() : this.leave()
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
      const classNames = getClassNames(name)
      const currentDuration = isObj(duration) ? duration.enter : duration
      this.status = 'enter'
      this.$emit('before-enter')
      Promise.resolve()
        .then(nextTick)
        .then(() => {
          this.checkStatus('enter')
          this.$emit('enter')
          this.inited = true
          this.display = true
          this.classes = classNames.enter
          this.currentDuration = currentDuration
        })
        .then(nextTick)
        .then(() => {
          this.checkStatus('enter')
          this.$emit('after-enter')
          this.transitionEnded = false
          this.classes = classNames['enter-to']
        })
        .catch(() => {})
    },
    leave() {
      if (!this.display) {
        return
      }
      const { name, duration } = this
      const classNames = getClassNames(name)
      const currentDuration = isObj(duration) ? duration.leave : duration
      this.status = 'leave'
      this.$emit('before-leave')
      Promise.resolve()
        .then(nextTick)
        .then(() => {
          this.checkStatus('leave')
          this.$emit('leave')
          this.classes = classNames.leave
          this.currentDuration = currentDuration
        })
        .then(nextTick)
        .then(() => {
          this.checkStatus('leave')
          this.transitionEnded = false
          setTimeout(() => this.onTransitionEnd(), currentDuration)
          this.classes = classNames['leave-to']
        })
        .catch(() => {})
    },
  },
}
</script>

<style lang="scss">
@import '../styles/index.scss';
.i-transition {
  transition-timing-function: ease;
}
/* #ifndef APP-NVUE */
.i-fade-enter-active,
.i-fade-leave-active {
  transition-property: opacity;
}
.i-fade-enter,
.i-fade-leave-to {
  opacity: 0;
}
.i-fade-down-enter-active,
.i-fade-down-leave-active,
.i-fade-left-enter-active,
.i-fade-left-leave-active,
.i-fade-right-enter-active,
.i-fade-right-leave-active,
.i-fade-up-enter-active,
.i-fade-up-leave-active {
  transition-property: opacity, transform;
}
.i-fade-up-enter,
.i-fade-up-leave-to {
  transform: translate3d(0, 100%, 0);
  opacity: 0;
}
.i-fade-down-enter,
.i-fade-down-leave-to {
  transform: translate3d(0, -100%, 0);
  opacity: 0;
}
.i-fade-left-enter,
.i-fade-left-leave-to {
  transform: translate3d(-100%, 0, 0);
  opacity: 0;
}
.i-fade-right-enter,
.i-fade-right-leave-to {
  transform: translate3d(100%, 0, 0);
  opacity: 0;
}
.i-slide-down-enter-active,
.i-slide-down-leave-active,
.i-slide-left-enter-active,
.i-slide-left-leave-active,
.i-slide-right-enter-active,
.i-slide-right-leave-active,
.i-slide-up-enter-active,
.i-slide-up-leave-active {
  transition-property: transform;
}
.i-slide-up-enter,
.i-slide-up-leave-to {
  transform: translate3d(0, 100%, 0);
}
.i-slide-down-enter,
.i-slide-down-leave-to {
  transform: translate3d(0, -100%, 0);
}
.i-slide-left-enter,
.i-slide-left-leave-to {
  transform: translate3d(-100%, 0, 0);
}
.i-slide-right-enter,
.i-slide-right-leave-to {
  transform: translate3d(100%, 0, 0);
}
.i-zoom-in-enter-active,
.i-zoom-in-leave-active,
.i-zoom-out-enter-active,
.i-zoom-out-leave-active {
  transition-property: transform;
}
.i-zoom-in-enter,
.i-zoom-in-leave-to {
  transform: scale(0.8);
}
.i-zoom-out-enter,
.i-zoom-out-leave-to {
  transform: scale(1.2);
}
/* #endif */
</style>
