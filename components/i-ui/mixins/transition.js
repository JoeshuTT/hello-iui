/**
 * transition
 */

import { isObj } from '../utils'
const nextTick = () => new Promise((resolve) => setTimeout(resolve, 1000 / 30))
const getClassNames = (name) => ({
    enter: `i-${name}-enter i-${name}-enter-active enter-class enter-active-class`,
    'enter-to': `i-${name}-enter-to i-${name}-enter-active enter-to-class enter-active-class`,
    leave: `i-${name}-leave i-${name}-leave-active leave-class leave-active-class`,
    'leave-to': `i-${name}-leave-to i-${name}-leave-active leave-to-class leave-active-class`
})

// #ifdef APP-NVUE
const animation = uni.requireNativePlugin('animation')
const animationMap = {
    'fade': {
        enter: { opacity: 0 },
        'enter-to': { opacity: 1 },
        leave: { opacity: 1 },
        'leave-to': { opacity: 0 }
    },
    'fade-up': {
        enter: { opacity: 0, transform: `translateY(100%)` },
        'enter-to': { opacity: 1, transform: `translateY(0)` },
        leave: { opacity: 1, transform: `translateY(0)` },
        'leave-to': { opacity: 0, transform: `translateY(100%)` }
    },
    'fade-down': {
        enter: { opacity: 0, transform: `translateY(-100%)` },
        'enter-to': { opacity: 1, transform: `translateY(0)` },
        leave: { opacity: 1, transform: `translateY(0)` },
        'leave-to': { opacity: 0, transform: `translateY(-100%)` }
    },
    'fade-left': {
        enter: { opacity: 0, transform: `translateX(-100%)` },
        'enter-to': { opacity: 1, transform: `translateY(0)` },
        leave: { opacity: 1, transform: `translateY(0)` },
        'leave-to': { opacity: 0, transform: `translateX(-100%)` }
    },
    'fade-right': {
        enter: { opacity: 0, transform: `translateX(100%)` },
        'enter-to': { opacity: 1, transform: `translateY(0)` },
        leave: { opacity: 1, transform: `translateY(0)` },
        'leave-to': { opacity: 0, transform: `translateX(100%)` }
    },
    'slide-up': {
        enter: { transform: `translateY(100%)` },
        'enter-to': { transform: `translateY(0)` },
        leave: { transform: `translateY(0)` },
        'leave-to': { transform: `translateY(100%)` }
    },
    'slide-down': {
        enter: { transform: `translateY(-100%)` },
        'enter-to': { transform: `translateY(0)` },
        leave: { transform: `translateY(0)` },
        'leave-to': { transform: `translateY(-100%)` }
    },
    'slide-left': {
        enter: { transform: `translateX(-100%)` },
        'enter-to': { transform: `translateY(0)` },
        leave: { transform: `translateY(0)` },
        'leave-to': { transform: `translateX(-100%)` }
    },
    'slide-right': {
        enter: { transform: `translateX(100%)` },
        'enter-to': { transform: `translateY(0)` },
        leave: { transform: `translateY(0)` },
        'leave-to': { transform: `translateX(100%)` }
    },
    'zoom-in': {
        enter: { opacity: 0, transform: `scale(0.8)` },
        'enter-to': { opacity: 1, transform: `scale(1)` },
        leave: { opacity: 1, transform: `scale(1)` },
        'leave-to': { opacity: 0, transform: `scale(0.8)` }
    },
    'zoom-out': {
        enter: { opacity: 0, transform: `scale(1.2)` },
        'enter-to': { opacity: 1, transform: `scale(1)` },
        leave: { opacity: 1, transform: `scale(1)` },
        'leave-to': { opacity: 0, transform: `scale(1.2)` }
    }
}
const getStyle = (name) => animationMap[name]
// #endif

export default {
    name: 'ITransition',
    props: {
        show: {
            type: Boolean,
            default: false
        },
        name: {
            type: String,
            default: 'fade'
        },
        duration: {
            type: null,
            default: 300
        },
        customStyle: {
            type: Object,
            default: () => ({})
        },
        animConfig: {
            type: null,
            default: null
        }
        // [{ backgroundColor: 'red', transform: `rotate(-360deg) translate3d(-100%, -100%, 0)` },{ backgroundColor: 'blue', transform: `rotate(0deg) translate3d(0, 0, 0)` }]
        // [{ backgroundColor: 'red', transform: `rotate(-360deg) translate3d(-100%, -100%, 0)` },{ backgroundColor: 'blue', transform: `rotate(0deg) translate3d(0, 0, 0)` }]

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
            currentDuration
        }
    },
    computed: {
        mergeStyle() {
            const { viewStyle, customStyle } = this
            return {
                // #ifndef APP-NVUE
                transitionDuration: `${this.currentDuration}ms`,
                display: `${this.display ? '' : 'none'}`,
                // #endif
                ...customStyle, // 避免自定义样式影响到动画属性
                ...viewStyle
            }
        }
    },
    watch: {
        show: {
            handler(value, old) {
                if (value === old) {
                    return
                }
                // #ifndef APP-NVUE
                value ? this.enter() : this.leave()
                // #endif
                // #ifdef APP-NVUE
                value ? this.enter2() : this.leave2()
                // #endif
            },
            immediate: true
        }
    },
    methods: {
        onClick() {
            this.$emit('click')
        },
        // #ifndef APP-NVUE
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
        // #endif
        // #ifdef APP-NVUE
        enter2() {
            const { name, duration } = this
            const currentStyle = getStyle(name) || this.animConfig
            const currentDuration = isObj(duration) ? duration.enter : duration
            this.status = 'enter'
            this.$emit('before-enter')
            this.inited = true
            this.display = true
            this.currentDuration = currentDuration
            this.viewStyle = Object.assign({}, this.viewStyle, currentStyle.enter)

            Promise.resolve()
                .then(nextTick)
                .then(() => {
                    this.checkStatus('enter')
                    this.$emit('enter')
                    this.currentDuration = currentDuration
                    animation.transition(this.$refs['ani'].ref, {
                        styles: currentStyle['enter-to'],
                        duration: currentDuration,
                        timingFunction: 'ease',
                        needLayout: false,
                        delay: 0
                    }, () => {
                        // console.log('animation finished')
                        this.checkStatus('enter')
                        this.$emit('after-enter')
                    })
                })
                .catch(() => {})
        },
        leave2() {
            if (!this.display) {
                return
            }
            const { name, duration } = this
            const currentStyle = getStyle(name) || this.animConfig
            const currentDuration = isObj(duration) ? duration.leave : duration
            this.status = 'leave'
            this.$emit('before-leave')
            this.viewStyle = Object.assign({}, this.viewStyle, currentStyle.leave)

            Promise.resolve()
                .then(nextTick)
                .then(() => {
                    this.checkStatus('leave')
                    this.transitionEnded = false
                    this.$emit('leave-to')
                    animation.transition(this.$refs['ani'].ref, {
                        styles: currentStyle['leave-to'],
                        duration: currentDuration,
                        timingFunction: 'ease',
                        needLayout: false,
                        delay: 0
                    }, () => {
                        // console.log('animation finished')
                        this.checkStatus('leave')
                        this.onTransitionEnd()
                    })
                })
                .catch(() => {})
        },
        // #endif
        checkStatus(status) {
            if (status !== this.status) {
                console.error(`incongruent status: ${status}`)
            }
        },
        // 完成过渡后触发
        onTransitionEnd() {
            if (this.transitionEnded) {
                return
            }
            this.transitionEnded = true
            this.$emit(`after-${this.status}`)
            const { show, display } = this
            if (!show && display) {
                this.display = false
                // #ifdef APP-NVUE
                this.inited = false
                // #endif
            }
        }
    }

}
