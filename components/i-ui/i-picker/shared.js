export const DEFAULT_ITEM_HEIGHT = 44

export const pickerProps = {
    loading: Boolean,
    title: String,
    showToolbar: Boolean,
    cancelButtonText: {
        type: String,
        default: '取消'
    },
    confirmButtonText: {
        type: String,
        default: '确认'
    },
    visibleItemCount: {
        type: Number,
        default: 6
    },
    itemHeight: {
        type: [Number, String],
        default: 44
    },
    // 外部样式类
    toolbarClass: {
        type: String,
        default: ''
    },
    activeClass: {
        type: String,
        default: ''
    },
    columnClass: {
        type: String,
        default: ''
    }
}
