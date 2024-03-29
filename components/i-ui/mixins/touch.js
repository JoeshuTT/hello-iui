const MIN_DISTANCE = 10
function getDirection(x, y) {
  if (x > y && x > MIN_DISTANCE) {
    return 'horizontal'
  }

  if (y > x && y > MIN_DISTANCE) {
    return 'vertical'
  }

  return ''
}

export default {
  data() {
    return {
      startX: 0,
      startY: 0,
      deltaX: 0,
      deltaY: 0,
      offsetX: 0,
      offsetY: 0,
      direction: '',
    }
  },
  methods: {
    touchStart(event) {
      // console.log('touchStart')
      this.resetTouchStatus()
      // #ifndef APP-PLUS-NVUE
      this.startX = event.touches[0].clientX
      this.startY = event.touches[0].clientY
      // #endif
      // #ifdef APP-PLUS-NVUE
      this.startX = event.touches[0].screenX
      this.startY = event.touches[0].screenY
      // #endif
    },
    touchMove(event) {
      // console.log('touchMove')
      const touch = event.touches[0]
      // #ifndef APP-PLUS-NVUE
      this.deltaX = touch.clientX - this.startX
      this.deltaY = touch.clientY - this.startY
      // #endif
      // #ifdef APP-PLUS-NVUE
      this.deltaX = touch.screenX - this.startX
      this.deltaY = touch.screenY - this.startY
      // #endif
      this.offsetX = Math.abs(this.deltaX)
      this.offsetY = Math.abs(this.deltaY)
      this.direction = this.direction || getDirection(this.offsetX, this.offsetY)
    },
    resetTouchStatus() {
      this.direction = ''
      this.deltaX = 0
      this.deltaY = 0
      this.offsetX = 0
      this.offsetY = 0
    },
  },
}
