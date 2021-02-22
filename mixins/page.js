import { log, getCurrentRoute } from '@/common/util'

export default {
  data() {
    return {
      pageQuery: {},
      pageTitle: '',
    }
  },
  onLoad(options) {
    log('info', 'Lifecycle', `${getCurrentRoute()} onLoad`, options)
    if (options.pageTitle) {
      this.pageTitle = decodeURIComponent(options.pageTitle)
    }
  },
  onShow() {
    log('info', 'Lifecycle', `${getCurrentRoute()} onShow`)
  },
  onReady() {
    log('info', 'Lifecycle', `${getCurrentRoute()} onReady`)

    if (this.pageTitle) {
      console.log(this.pageTitle)
      uni.setNavigationBarTitle({
        title: `${this.pageTitle}`,
      })

      // 上报
      if (uni.report) {
        uni.report('title', this.pageTitle)
      }
    }
  },
  methods: {
    onNavigator(url) {
      uni.navigateTo({
        url,
      })
    },
  },
}
