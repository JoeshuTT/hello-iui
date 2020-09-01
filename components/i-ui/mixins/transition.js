/**
 * transition
 */

const nextTick = () => new Promise((resolve) => setTimeout(resolve, 1000 / 30))
const getClassNames = (name) => ({
    enter: `i-${name}-enter i-${name}-enter-active`,
    'enter-to': `i-${name}-enter-to i-${name}-enter-active`,
    leave: `i-${name}-leave i-${name}-leave-active`,
    'leave-to': `i-${name}-leave-to i-${name}-leave-active`
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
const getStyle = (name) => (animationMap[name] || animationMap['fade'])
// #endif

export default {
    name: 'ITransition',
    props: {
        show: {
            type: Boolean,
            default: false
        }
        // name: {
        //     type: String,
        //     default: 'fade'
        // },
        // duration: {
        //     type: Number,
        //     default: 300
        // },
        // customStyle: {
        //     type: Object,
        //     default: () => ({})
        // }
    },
    data() {
        return {
            inited: false,
            display: false,
            status: '',
            classes: '',
            viewStyle: {}
        }
    },
    computed: {
        mergeStyle() {
            const { viewStyle, customStyle } = this
            return {
                // #ifndef APP-NVUE
                transitionDuration: `${this.duration}ms`,
                display: `${this.display ? '' : 'none'}`,
                // #endif
                ...viewStyle,
                ...customStyle // 避免自定义样式影响到动画属性
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
                    this.currentDuration = duration
                })
                .then(nextTick)
                .then(() => {
                    this.checkStatus('enter')
                    this.$emit('after-enter')
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
            this.status = 'leave'
            this.$emit('before-leave')
            Promise.resolve()
                .then(nextTick)
                .then(() => {
                    this.checkStatus('leave')
                    this.$emit('leave')
                    this.classes = classNames.leave
                    this.currentDuration = duration
                })
                .then(nextTick)
                .then(() => {
                    this.checkStatus('leave')
                    this.$emit('after-leave')
                    setTimeout(() => {
                        const { show, display } = this
                        if (!show && display) {
                            this.display = false
                        }
                    }, duration)
                    this.classes = classNames['leave-to']
                })
                .catch(() => {})
        },
        // #endif
        // #ifdef APP-NVUE
        enter2() {
            const { name, duration } = this
            const styleObj = getStyle(name)
            this.status = 'enter'
            this.$emit('before-enter')
            this.inited = true
            this.display = true
            this.viewStyle = Object.assign({}, this.viewStyle, styleObj.enter)

            Promise.resolve()
                .then(nextTick)
                .then(() => {
                    this.checkStatus('enter')
                    this.$emit('enter')
                    animation.transition(this.$refs['ani'].ref, {
                        styles: styleObj['enter-to'],
                        duration,
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
            const styleObj = getStyle(name)
            this.status = 'leave'
            this.$emit('before-leave')
            this.viewStyle = Object.assign({}, this.viewStyle, styleObj.leave)

            Promise.resolve()
                .then(nextTick)
                .then(() => {
                    this.checkStatus('leave')
                    this.$emit('leave-to')
                    animation.transition(this.$refs['ani'].ref, {
                        styles: styleObj['leave-to'],
                        duration,
                        timingFunction: 'ease',
                        needLayout: false,
                        delay: 0
                    }, () => {
                        // console.log('animation finished')
                        this.checkStatus('leave')
                        this.$emit('after-leave')
                        const { show, inited } = this
                        if (!show && inited) {
                            this.inited = false
                            this.display = false
                        }
                    })
                })
                .catch(() => {})
        },
        // #endif
        checkStatus(status) {
            if (status !== this.status) {
                console.error(`incongruent status: ${status}`)
            }
        }
    }

}
