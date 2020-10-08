export default {
    props: {
        lang: String,
        businessId: Number,
        sessionFrom: String,
        sendMessageTitle: String,
        sendMessagePath: String,
        sendMessageImg: String,
        showMessageCard: Boolean,
        appParameter: String,
        hoverClass: {
            type: String,
            default: 'i-button--active'
        }
    }
}
