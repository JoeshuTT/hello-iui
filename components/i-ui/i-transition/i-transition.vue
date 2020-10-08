<template>
    <view v-if="inited" ref="ani" class="i-transition" :class="[customClass, classes]" :style="[mergeStyle]" @click="onClick">
        <slot />
    </view>
</template>

<script>
import IComponent from '../mixins/component'
import transition from '../mixins/transition'

export default {
    name: 'ITransition',
    mixins: [IComponent, transition],
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
    }
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
        opacity: 0
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
        opacity: 0
    }

    .i-fade-down-enter,
    .i-fade-down-leave-to {
        transform: translate3d(0, -100%, 0);
        opacity: 0
    }

    .i-fade-left-enter,
    .i-fade-left-leave-to {
        transform: translate3d(-100%, 0, 0);
        opacity: 0
    }

    .i-fade-right-enter,
    .i-fade-right-leave-to {
        transform: translate3d(100%, 0, 0);
        opacity: 0
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
        transform: translate3d(0, 100%, 0)
    }

    .i-slide-down-enter,
    .i-slide-down-leave-to {
        transform: translate3d(0, -100%, 0)
    }

    .i-slide-left-enter,
    .i-slide-left-leave-to {
        transform: translate3d(-100%, 0, 0)
    }

    .i-slide-right-enter,
    .i-slide-right-leave-to {
        transform: translate3d(100%, 0, 0)
    }

    .i-zoom-in-enter-active,
    .i-zoom-in-leave-active,
    .i-zoom-out-enter-active,
    .i-zoom-out-leave-active {
        transition-property: transform;
    }

    .i-zoom-in-enter,
    .i-zoom-in-leave-to {
        transform: scale(0.8)
    }

    .i-zoom-out-enter,
    .i-zoom-out-leave-to {
        transform: scale(1.2)
    }

    /* #endif */

</style>
