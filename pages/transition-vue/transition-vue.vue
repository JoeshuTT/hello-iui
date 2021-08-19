<template>
  <view class="container">
    <demo-block title="基础用法" card>
      <i-cell v-for="(item, index) in list" :key="index" :title="item.label" is-link @click="onClick(item)" />
      <!-- transition -->
      <i-transition-vue :show="show" :name="name" custom-class="custom-class" />
      <!-- custom transition -->
      <!-- <i-transition-vue
        :show="showCustom"
        name="custom"
        :duration="{ enter: 300, leave: 1000 }"
        :anim-config="customAnimConfig"
        :custom-style="style"
      /> -->
    </demo-block>
  </view>
</template>

<script>
import pageMixin from '@/mixins/page'
import { throttle } from '@/common/util'

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
        { label: 'Custom', value: 'custom' },
      ],
      show: false,
      name: 'fade',
      title: '',

      // custom
      showCustom: false,
      customAnimConfig: {
        enter: { opacity: '0', transform: `rotate(-360deg)` },
        'enter-to': { opacity: '1', transform: `rotate(0deg)` },
        leave: { opacity: '1', transform: `rotate(0deg)` },
        'leave-to': { opacity: '0', transform: `rotate(-360deg)` },
      },
    }
  },
  onLoad() {},
  methods: {
    onClick: throttle(function (item) {
      const { label, value } = item
      this.title = label
      this.name = value
      this.trigger(value)
    }, 1000),
    trigger() {
      this.show = true
      setTimeout(() => {
        this.show = false
      }, 500)
    },
  },
}
</script>

<style lang="scss">
.i-custom-enter-active,
.i-custom-leave-active {
  transition-property: background-color, transform;
}
.i-custom-enter,
.i-custom-leave-to {
  background-color: red;
  transform: rotate(-360deg) translate3d(-100%, -100%, 0);
}

.custom-class {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 100px;
  height: 100px;
  margin-top: -50px;
  margin-left: -50px;
  background-color: #1989fa;
}
</style>
