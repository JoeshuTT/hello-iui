
export default {
    props: {
        customStyle: {
            type: Object,
            default: () => ({})
        },
        customClass: {
            type: String,
            default: ''
        }
    },
    methods: {
        noop() {}
    }
}
