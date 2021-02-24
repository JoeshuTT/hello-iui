import { isNumber, isDef } from './validator'

/**
 * getSystemInfoSync
 * @return {Object}
 */
let systemInfo = null
export const getSystemInfoSync = function () {
  if (systemInfo == null) {
    systemInfo = uni.getSystemInfoSync()
  }
  return systemInfo
}

/**
 * rpx2px
 * @param {Number} val
 * @param {Number} destWidth
 * @return {Number}
 */
export const rpx2px = function (val, destWidth = 750) {
  const scale = getSystemInfoSync().windowWidth / destWidth

  return parseFloat(val * scale)
}

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
 * @return {String}
 */
export function unitToPx(value) {
  if (typeof value === 'number') {
    return value
  }

  if (value.indexOf('rpx') !== -1) {
    return rpx2px(convertRPx(value))
  }

  return parseFloat(value)
}
