export default {
  props: {
    customStyle: {
      type: Object,
      default: () => ({}),
    },
    // customClass: {
    //   type: String,
    //   default: '',
    // },
  },
  methods: {
    noop() {},
    // #ifdef MP
    // 古古怪怪
    // toJSON() {}
    // #endif
  },
}
