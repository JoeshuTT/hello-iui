<template>
  <view class="i-load-more" :class="[customClass]" :style="[customStyle]" @click="onClick">
    <i-loading
      v-if="status === 'loading'"
      :type="iconType"
      :size="iconSize"
      :color="color"
      class="i-load-more__loading"
    />
    <text class="i-load-more__text" :style="{ color: color }">{{ statusTypeMap[status] }}</text>
  </view>
</template>

<script>
import IComponent from '../mixins/component'
import ILoading from '../i-loading/i-loading'
import { LOAD_MORE } from '../common/config'

export default {
  name: 'ILoadMore',
  components: {
    ILoading,
  },
  mixins: [IComponent],
  props: {
    status: {
      type: String,
      default: 'more', // more, loading, noMore
    },
    contentText: {
      type: Object,
      default: () => ({}),
    },
    iconSize: {
      type: [Number, String],
      default: '48rpx',
    },
    iconType: {
      type: String,
      default: 'spinner',
    },
    color: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      statusTypeMap: Object.assign({}, LOAD_MORE.statusTypeMap, this.contentText),
    }
  },
  methods: {
    onClick() {
      this.$emit('click', { status: this.status })
    },
  },
}
</script>

<style lang="scss">
@import '../styles/index.scss';

.i-load-more {
  @include flex-box('row');
  align-items: center;
  justify-content: center;
  height: $load-more-height;
  &__text {
    margin-left: 5px;
    font-size: $load-more-text-font-size;
    color: $load-more-text-color;
  }
}
</style>
