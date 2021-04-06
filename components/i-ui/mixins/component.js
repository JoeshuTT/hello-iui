/**
 * 并未开启
 */
export default {
  options: {
    // #ifdef MP-WEIXIN
    virtualHost: true,
    // #endif
  },
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
}
