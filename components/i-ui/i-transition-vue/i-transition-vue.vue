<template>
  <view v-if="inited" class="i-transition" :class="[classes, customClass]" :style="[mergeStyle]" @click="onClick">
    <slot />
  </view>
</template>

<script>
import { isObj } from '../utils/validate'

const requestAnimationFrame = () => new Promise(resolve => setTimeout(resolve, 1000 / 30))
const getClassNames = name => ({
  enter: `i-${name}-enter i-${name}-enter-active`,
  'enter-to': `i-${name}-enter-to i-${name}-enter-active`,
  leave: `i-${name}-leave i-${name}-leave-active`,
  'leave-to': `i-${name}-leave-to i-${name}-leave-active`,
})

export default {
  name: 'ITransitionVue',
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
    customClass: {
      type: String,
      default: '',
    },
  },
  data() {
    const currentDuration = isObj(this.duration) ? this.duration.enter : this.duration

    return {
      inited: false,
      display: false,
      classes: '',
      currentDuration,
    }
  },
  computed: {
    mergeStyle() {
      const { customStyle } = this
      return {
        transitionDuration: `${this.currentDuration}ms`,
        display: `${this.display ? '' : 'none'}`,
        ...customStyle,
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

      this.$emit('beforeEnter')

      this.$nextTick()
        .then(requestAnimationFrame)
        .then(() => {
          this.inited = true
          this.display = true
          this.classes = classNames.enter
          this.currentDuration = currentDuration
          this.$emit('enter')
        })
        .then(requestAnimationFrame)
        .then(() => {
          this.classes = classNames['enter-to']
          this.$emit('afterEnter')
        })
    },
    leave() {
      if (!this.inited) {
        return
      }

      const { name, duration } = this
      const classNames = getClassNames(name)
      const currentDuration = isObj(duration) ? duration.leave : duration
      this.$emit('beforeLeave')

      this.$nextTick()
        .then(requestAnimationFrame)
        .then(() => {
          this.classes = classNames.leave
          this.currentDuration = currentDuration
          this.$emit('leave')
        })
        .then(requestAnimationFrame)
        .then(() => {
          this.classes = classNames['leave-to']
          setTimeout(() => {
            this.display = false
            this.$emit('afterLeave')
          }, currentDuration)
        })
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

.i-fade-up-enter-active,
.i-fade-up-leave-active,
.i-fade-down-enter-active,
.i-fade-down-leave-active,
.i-fade-left-enter-active,
.i-fade-left-leave-active,
.i-fade-right-enter-active,
.i-fade-right-leave-active {
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

.i-slide-up-enter-active,
.i-slide-up-leave-active,
.i-slide-down-enter-active,
.i-slide-down-leave-active,
.i-slide-left-enter-active,
.i-slide-left-leave-active,
.i-slide-right-enter-active,
.i-slide-right-leave-active {
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

/* #endif */
</style>
