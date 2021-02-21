/**
 * 验证 - 是否有值
 * @param {*} value
 * @return {Boolean}
 */
export function isDef(value) {
  return value !== undefined && value !== null
}

/**
 * isNumeric
 * @param {String} val
 * @return {Boolean}
 */
export function isNumeric(val) {
  return /^\d+(\.\d+)?$/.test(val)
}

/**
 * isNaN
 * @param {Number} val
 * @return {Boolean}
 */
export function isNaN(val) {
  if (Number.isNaN) {
    return Number.isNaN(val)
  }
  // eslint-disable-next-line no-self-compare
  return val !== val
}

/**
 * isDate
 * @param {Date} val
 * @return {Boolean}
 */
export function isDate(val) {
  return Object.prototype.toString.call(val) === '[object Date]' && !isNaN(val.getTime())
}
