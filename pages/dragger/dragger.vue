<template>
  <view class="container">
    <view
      class="list"
      :list="list"
      :change:list="handle.listObserver"
      :props="baseData"
      :change:props="handle.propsObserver"
    >
      <view
        v-for="(item, index) in list"
        :key="item.id"
        :data-index="index"
        class="list-item"
        :class="['list-item-' + index]"
        @touchstart="handle.touchStart"
        @touchmove="handle.touchMove"
        @touchend="handle.touchEnd"
        @touchcancel="handle.touchEnd"
      >
        {{ item.name }}
      </view>
    </view>
  </view>
</template>
<!-- #ifndef APP-PLUS-NVUE -->
<!-- eslint-disable-next-line -->
<script module="handle" lang="wxs" src="./index.wxs"></script>
<!-- #endif -->
<script>
import list from '@/iui.config.js'
import { guid } from '@/common/util'
export default {
  data() {
    return {
      list: Array.from({ length: 20 }, (v, i) => ({ id: guid(), name: `Item ${i}` })),
      itemStyle: {},
      baseData: {},
    }
  },
  onLoad() {},
  onReady() {
    var columns = 4
    const query = this.createSelectorQuery()
    query.select('.list').boundingClientRect()
    query.select('.list-item').boundingClientRect()

    // .in(this)
    const { windowWidth, windowHeight } = wx.getSystemInfoSync()
    query.exec(res => {
      console.log('query', res)
      this.baseData = {
        windowWidth,
        windowHeight,
        wrapWidth: res[0].width,
        wrapHeight: res[0].height,
        wrapLeft: res[0].left,
        wrapTop: res[0].top,
        itemWidth: res[1].width,
        itemHeight: res[1].height,
        columns: columns,
        total: this.list.length,
      }

      this.list = this.list.map((item, index) => {
        item.realKey = index // 真实顺序
        item.sortKey = index // 整体顺序
        item.tranX = `${(item.sortKey % columns) * 100}%`
        item.tranY = `${Math.floor(item.sortKey / columns) * 100}%`
        return item
      })
    })
  },
  methods: {
    dragStatus(status) {
      console.log('dragStatus', status)
      // this.baseData
    },
    dragEnter(e) {
      const { oldIndex, newIndex } = e
      console.log('dragEnterdragEnterdragEnterdragEnterdragEnter', e.oldIndex, e.newIndex)
      this.baseData.hitIndex = newIndex
      // 往左上移动
      // if (newIndex < oldIndex) {
      //   console.log('往左上移动')
      // } else {
      //   console.log('往右下移动')
      // }
      // this.list = this.sortList(this.list, oldIndex, newIndex)
      // this.list = this.sortList(this.list, oldIndex, newIndex)

      //   this.list = this.sortList(this.list, e.oldIndex, e.newIndex)
      //   this.list = [1]
      //   const temp = this.list[oldIndex]
      //   const temp2 = this.list[newIndex]
      //   this.list[oldIndex] = { id: guid(), name: `Item ${1}` }
      //   this.list[1] = { id: guid(), name: `Item ${1}` }
      //   this.list[newIndex] = temp
      // const temp  = this.list[oldIndex]
      // this.list.splice(oldIndex, 1)
      // this.list.splice(newIndex, 0,temp)
    },
    sortList(list, oldIndex, newIndex) {
      list = [...list]
      let temp = list.splice(oldIndex, 1)
      let start = list.splice(0, newIndex)

      return [...start, ...temp, ...list]
    },
    vibrate() {
      uni.vibrateShort()
    },
  },
}
</script>

<style lang="scss">
.list {
  position: relative;
  margin-top: 20px;
  &-item {
    position: absolute;
    box-sizing: border-box;
    width: 25%;
    height: 100px;
    display: inline-flex;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.2);
    padding: 10px;
    // margin: 12px;
    align-items: center;
    justify-content: center;
  }
}

.tran {
  transition: transform 0.3s;
}

.cur {
  border: 1px solid rgba(0, 0, 0, 1);
  z-index: 2;
}
</style>
