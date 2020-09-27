
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
        // #endif
        // #ifndef MP
        log('info', 'Lifecycle', `${this.$page.fullPath} onLoad`, options)
        // #endif
        console.log('options', options)
        if (options.pageTitle) {
            this.pageTitle = decodeURIComponent(options.pageTitle)
        }
    },
    onShow() {
        // #ifdef MP
        log('info', 'Lifecycle', `${this.$mp.page.$page.fullPath} onShow`)
        // #endif
        // #ifndef MP
        log('info', 'Lifecycle', `${this.$page.fullPath} onShow`)
        // #endif
    },
    onReady() {
        // #ifdef MP
        log('info', 'Lifecycle', `${this.$mp.page.$page.fullPath} onReady`)
        // #endif
        // #ifndef MP
        log('info', 'Lifecycle', `${this.$page.fullPath} onReady`)
        // #endif
        if (this.pageTitle) {
            console.log(this.pageTitle)
            uni.setNavigationBarTitle({
                title: `${this.pageTitle}`
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
                url
            })
        }
    }
}
