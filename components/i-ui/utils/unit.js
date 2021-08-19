import { isNumber, isDef } from './validate'
import { getSystemInfoSync } from './index'

/**
 * 添加单位
 * @param {Number|String} value
 * @param {String} unit
 * @return {String}
 */
export function addUnit(value, unit = 'px') {
  if (!isDef(value)) {
    return undefined
  }
  value = String(value)
  return isNumber(value) ? `${value}${unit}` : value
}

/**
 * 分离数字和单位
 * @param {Number|String} value
 * @param {String} unit
 * @return {Object}
 */
export function splitUnit(value, unit = 'px') {
  // const map = ['px', 'rpx', '%', 'rem', 'em', 'vw', 'vh', 'vmin', 'vmax']

  const num = /\d+/g.exec(String(value))[0]
  const unitStr = String(value).replace(num, '') || unit

  return {
    num: Number(num),
    unit: unitStr,
  }
}

/**
 * rpx2px
 * @param {Number} val
 * @param {Number} [destWidth] 设计稿基准宽度
 * @return {Number}
 */
export const rpx2px = function (val, destWidth = 750) {
  const scale = getSystemInfoSync().windowWidth / destWidth

  return parseFloat((val * scale).toFixed(2))
}

/**
 * 转换为rpx单位数值
 * @param {Number|String} value
 * @param {String} unit
 * @return {String}
 */
function convertRPx(value) {
  if (typeof value === 'number') {
    return value
  }
  value = value.replace(/rpx/g, '')
  return +value
}

/**
 * 转换为px单位数值
 * @param {Number|String} value
 * @param {String} unit
 * @example unitToPx(15), unitToPx(15rpx)
 * @return {String}
 */
export function unitToPx(value) {
  if (typeof value === 'string' && value.includes('rpx')) {
    return rpx2px(convertRPx(value))
  }
  return value
}

/**
 * 相对于 uni-page-wrapper 的Y坐标
 * @param {*} value rpx 数值
 * @returns
 */
export const getPageY = function (value) {
  const { windowTop = 0, windowBottom = 0 } = getSystemInfoSync()
  let px = rpx2px(value)

  // #ifdef H5
  px = value > 0 ? px + windowTop : px - windowBottom
  // #endif

  return px
}
