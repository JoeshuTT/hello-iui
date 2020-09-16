
import { log } from '@/common/util'

export default {
    data() {
        return {
            pageQuery: {},
            pageTitle: ''
        }
    },
    onLoad(options) {
        log('info', 'Lifecycle', `${this.$page.path} onLoad`, options)
        console.log('options', options)
        if (options.pageTitle) {
            this.pageTitle = decodeURIComponent(options.pageTitle)
        }
    },
    onReady() {
        log('info', 'Lifecycle', `${this.$page.path} onReady`)
        if (this.pageTitle) {
            uni.setNavigationBarTitle({
                title: `${this.pageTitle}${this.$page.meta.isNVue ? '-NVUE' : ''}`
            })
            // 上报
            if (uni.report) {
                uni.report('title', this.pageTitle)
            }
        }
    }
}
