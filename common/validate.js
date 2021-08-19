/**
 * 是否有值
 * @param {*} value
 * @return {Boolean}
 */
export function isDef(value) {
  return value !== undefined && value !== null
}

/**
 * 是否是对象{object || array}
 * @param {*} x
 * @return {Boolean}
 */
export function isObj(x) {
  const type = typeof x
  return x !== null && (type === 'object' || type === 'function')
}

/**
 * 是否是对象 {object}
 * @param {*} val
 * @return {Boolean}
 */
export function isPlainObject(val) {
  return val !== null && typeof val === 'object' && !Array.isArray(val)
}

/**
 * 是否是字符串
 * @param {string} str
 * @return {Boolean}
 */
export function isString(str) {
  if (typeof str === 'string' || str instanceof String) {
    return true
  }
  return false
}

/**
 * 是否是数字
 * @param {Number} value
 * @return {Boolean}
 */
export function isNumber(value) {
  return /^\d+$/.test(value)
}
