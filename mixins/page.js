export default {
    data() {
        return {
            pageQuery: {},
            pageTitle: ''
        }
    },
    onLoad(options) {
        if (options.pageTitle) {
            this.pageTitle = decodeURIComponent(options.pageTitle)
        }
    },
    onReady(options) {
        if (this.pageTitle) {
            let isNVue = false
            /* #ifdef APP-NVUE */
            isNVue = true
            /* #endif */
            uni.setNavigationBarTitle({
                title: `${this.pageTitle}${isNVue ? '-NVUE' : ''}`
            })
            //
            if (uni.report) {
                uni.report('title', this.pageTitle)
            }
        }
    }
}
