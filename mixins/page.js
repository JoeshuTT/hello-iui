
import { log } from '@/common/util'

export default {
    data() {
        return {
            pageQuery: {},
            pageTitle: ''
        }
    },
    onLoad(options) {
        // #ifdef MP
        log('info', 'Lifecycle', `${this.$mp.page.$page.fullPath} onLoad`, options)
        console.log('options', options)
        // #endif
        // #ifndef MP
        log('info', 'Lifecycle', `${this.$page.fullPath} onLoad`, options)
        console.log('options', options)
        if (options.pageTitle) {
            this.pageTitle = decodeURIComponent(options.pageTitle)
        }
        // #endif
    },
    onReady() {
        // #ifdef MP
        console.log('info', 'Lifecycle', `${this.$mp.page.$page.fullPath} onReady`)
        // #endif
        // #ifndef MP
        log('info', 'Lifecycle', `${this.$page.fullPath} onReady`)
        if (this.pageTitle) {
            uni.setNavigationBarTitle({
                title: `${this.pageTitle}${this.$page.meta.isNVue ? '-NVUE' : ''}`
            })
            // 上报
            if (uni.report) {
                uni.report('title', this.pageTitle)
            }
        }
        // #endif
    }
}
