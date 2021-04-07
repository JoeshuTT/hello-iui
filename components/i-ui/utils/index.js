import { isNumber, isDef } from './validate'

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
 * @param {Number} destWidth
 * @return {Number}
 */
export const rpx2px = function (val, destWidth = 750) {
  const scale = getSystemInfoSync().windowWidth / destWidth

  return parseFloat(val * scale)
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

/**
 * 查询指定节点的布局位置信息，其功能类似于 DOM 的 getBoundingClientRect
 * @param {Boolean} context 节点对象实例
 * @param {String} selector .a, #a
 * @param {Boolean} all
 */
export const getRect = function (context, selector, all = false) {
  return new Promise(resolve => {
    uni
      .createSelectorQuery()
      .in(context)
      [all ? 'selectAll' : 'select'](selector)
      .boundingClientRect(rect => {
        resolve(rect)
      })
      .exec()
  })
}

/**
 * 会接受一个文件名作为参数，返回它的扩展名
 * @param {String} filename 文件名
 * @return {String}
 */
export const getExtName = function (filename) {
  var last = filename.lastIndexOf('.')
  var ext = last === -1 || last === 0 ? '' : filename.substring(last)
  return ext
}
