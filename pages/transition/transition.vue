<template>
    <view class="container">
        <demo-block title="基础用法" padding>
            <i-cell v-for="(item, index) in list" :key="index" :title="item.label" is-link @click="onClick(item)" />
            <!-- transition -->
            <i-transition :show="show" :name="name" :custom-style="style" />
            <!-- custom transition -->
            <i-transition
                :show="showCustom"
                name="custom"
                :duration="{ enter: 300, leave: 1000 }"
                :anim-config="customAnimConfig"
                :custom-style="style"
            />
        </demo-block>
    </view>
</template>

<script>
import pageMixin from '@/mixins/page'
import { getSystemInfoSync, throttle } from '@/common/util'

export default {
    mixins: [pageMixin],
    data() {
        return {
            list: [
                { label: 'Fade', value: 'fade' },
                { label: 'Fade Up', value: 'fade-up' },
                { label: 'Fade Down', value: 'fade-down' },
                { label: 'Fade Left', value: 'fade-left' },
                { label: 'Fade Right', value: 'fade-right' },
                { label: 'Slide Up', value: 'slide-up' },
                { label: 'Slide Down', value: 'slide-down' },
                { label: 'Slide Left', value: 'slide-left' },
                { label: 'Slide Right', value: 'slide-right' },
                // { label: 'Zoom In', value: 'zoom-in' },
                // { label: 'Zoom Out', value: 'zoom-out' },
                { label: 'Custom', value: 'custom' }
            ],
            show: false,
            name: 'fade',
            title: '',
            style: {
                position: 'fixed',
                top: `${getSystemInfoSync().windowHeight / 2 - 50}px`,
                left: `${getSystemInfoSync().windowWidth / 2 - 50}px`,
                width: '100px',
                height: '100px',
                backgroundColor: '#1989fa'
            },
            // custom
            showCustom: false,
            customAnimConfig: {
                'enter': { opacity: '0', transform: `rotate(-360deg)` },
                'enter-to': { opacity: '1', transform: `rotate(0deg)` },
                'leave': { opacity: '1', transform: `rotate(0deg)` },
                'leave-to': { opacity: '0', transform: `rotate(-360deg)` }
            }
        }
    },
    onLoad() {

    },
    methods: {
        onClick: throttle(function(item) {
            const { label, value } = item
            this.title = label
            this.name = value
            this.trigger(value)
        }, 1000),
        onClickCustom: throttle(function(item) {
            const { label, value } = item
            this.title = label
            this.name = value
            this.trigger(value)
        }, 3000),
        trigger(name) {
            if (!name || name === 'custom') {
                this.showCustom = true
                setTimeout(() => {
                    this.showCustom = false
                }, 1500)
                return
            }
            this.show = true
            setTimeout(() => {
                this.show = false
            }, 500)
        }
    }
}
</script>

<style lang="scss">

    /* #ifndef APP-NVUE */
    .i-custom-enter-active,
    .i-custom-leave-active {
        transition-property: opacity, transform;
    }

    .i-custom-enter,
    .i-custom-leave-to {
        opacity: 0;
        transform: rotate(-360deg);
    }
    /* #endif */

</style>
