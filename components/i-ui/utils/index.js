export { addUnit, getPageY, rpx2px, splitUnit } from './unit'
export { isNumber, isObj } from './validate'

/**
 * getSystemInfoSync
 * @return {Object}
 */
let systemInfo = null
export const getSystemInfoSync = function () {
  if (systemInfo == null) {
    // 小程序上没有 windowTop
    systemInfo = uni.getSystemInfoSync()
  }
  return systemInfo
}

/**
 * 会接受一个文件名作为参数，返回它的扩展名
 * @param {String} filename 文件名
 * @return {String}
 */
export function getExtName(filename) {
  var last = filename.lastIndexOf('.')
  var ext = last === -1 || last === 0 ? '' : filename.substring(last)
  return ext
}
