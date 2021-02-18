/**
 * 组件库配置选项
 */
const imagePlaceholder =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg=='

export const basic = {
  version: '2.3.6',
  fontSrc: 'https://at.alicdn.com/t/font_1949925_qisrzzyoqy8.ttf',
}

// Color Palette
export const COLOR_PALETTE = {
  black: '#000',
  white: '#fff',
  'gray-1': '#f7f8fa',
  'gray-2': '#f2f3f5',
  'gray-3': '#ebedf0',
  'gray-4': '#dcdee0',
  'gray-5': '#c8c9cc',
  'gray-6': '#969799',
  'gray-7': '#646566',
  'gray-8': '#323233',
  red: '#ee0a24',
  blue: '#1989fa',
  orange: '#ff976a',
  green: '#07c160',
}

export const BUTTON = {
  type: {
    warning: COLOR_PALETTE['red'],
    info: COLOR_PALETTE['blue'],
    primary: COLOR_PALETTE['green'],
    danger: COLOR_PALETTE['orange'],
  },
  text: {
    color: COLOR_PALETTE['gray-8'],
    fontSize: '16px',
  },
  border: {
    color: COLOR_PALETTE['gray-3'],
  },
  height: {
    default: '88rpx',
  },
}

export const IMAGE = {
  placeHolder: imagePlaceholder,
}

export const LOAD_MORE = {
  statusTypeMap: {
    more: '上拉显示更多',
    loading: '正在加载...',
    noMore: '没有更多数据了',
  },
}

export const TRANSITION = {
  animationMap: {
    fade: {
      enter: { opacity: 0 },
      'enter-to': { opacity: 1 },
      leave: { opacity: 1 },
      'leave-to': { opacity: 0 },
    },
    'fade-up': {
      enter: { opacity: 0, transform: `translateY(100%)` },
      'enter-to': { opacity: 1, transform: `translateY(0)` },
      leave: { opacity: 1, transform: `translateY(0)` },
      'leave-to': { opacity: 0, transform: `translateY(100%)` },
    },
    'fade-down': {
      enter: { opacity: 0, transform: `translateY(-100%)` },
      'enter-to': { opacity: 1, transform: `translateY(0)` },
      leave: { opacity: 1, transform: `translateY(0)` },
      'leave-to': { opacity: 0, transform: `translateY(-100%)` },
    },
    'fade-left': {
      enter: { opacity: 0, transform: `translateX(-100%)` },
      'enter-to': { opacity: 1, transform: `translateY(0)` },
      leave: { opacity: 1, transform: `translateY(0)` },
      'leave-to': { opacity: 0, transform: `translateX(-100%)` },
    },
    'fade-right': {
      enter: { opacity: 0, transform: `translateX(100%)` },
      'enter-to': { opacity: 1, transform: `translateY(0)` },
      leave: { opacity: 1, transform: `translateY(0)` },
      'leave-to': { opacity: 0, transform: `translateX(100%)` },
    },
    'slide-up': {
      enter: { transform: `translateY(100%)` },
      'enter-to': { transform: `translateY(0)` },
      leave: { transform: `translateY(0)` },
      'leave-to': { transform: `translateY(100%)` },
    },
    'slide-down': {
      enter: { transform: `translateY(-100%)` },
      'enter-to': { transform: `translateY(0)` },
      leave: { transform: `translateY(0)` },
      'leave-to': { transform: `translateY(-100%)` },
    },
    'slide-left': {
      enter: { transform: `translateX(-100%)` },
      'enter-to': { transform: `translateY(0)` },
      leave: { transform: `translateY(0)` },
      'leave-to': { transform: `translateX(-100%)` },
    },
    'slide-right': {
      enter: { transform: `translateX(100%)` },
      'enter-to': { transform: `translateY(0)` },
      leave: { transform: `translateY(0)` },
      'leave-to': { transform: `translateX(100%)` },
    },
    'zoom-in': {
      enter: { opacity: 0, transform: `scale(0.8)` },
      'enter-to': { opacity: 1, transform: `scale(1)` },
      leave: { opacity: 1, transform: `scale(1)` },
      'leave-to': { opacity: 0, transform: `scale(0.8)` },
    },
    'zoom-out': {
      enter: { opacity: 0, transform: `scale(1.2)` },
      'enter-to': { opacity: 1, transform: `scale(1)` },
      leave: { opacity: 1, transform: `scale(1)` },
      'leave-to': { opacity: 0, transform: `scale(1.2)` },
    },
  },
}

export const PAGE = {
  reloadTitle: '重新加载',
  offlineTitle: '网络环境较差，请检查网络配置',
  loadingTitle: '页面加载中，请稍后 ...',
  tabbarPaths: ['pages/home/home', 'pages/discover/discover'],
}
