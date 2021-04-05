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
