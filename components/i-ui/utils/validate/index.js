/**
 * validate 数据校验
 */

/**
 * 验证 - 是否未定义
 * @param {*} value
 */
export function isDef(value) {
    return value !== undefined && value !== null
}

/**
 * 验证 - 是否是对象
 * @param {*} x
 */
export function isObj(x) {
    const type = typeof x
    return x !== null && (type === 'object' || type === 'function')
}

/**
 * 验证 - 是否是字符串
 * @param {string} str
 */
export function isString(str) {
    if (typeof str === 'string' || str instanceof String) {
        return true
    }
    return false
}

/**
 * 验证 - 是否是数字
 * @param {Number} value
 */
export function isNumber(value) {
    return /^\d+$/.test(value)
}

/**
 * 验证 - 是否是数组
 * @param {Array} arg
 */
export function isArray(arg) {
    if (typeof Array.isArray === 'undefined') {
        return Object.prototype.toString.call(arg) === '[object Array]'
    }
    return Array.isArray(arg)
}

/**
 * 验证 - 是否是对象{},非数组情况
 * @param {Array} arg
 */
export function isObject(arg) {
    return Object.prototype.toString.call(arg) === '[object Object]'
}

/**
 * 验证 - 是否为空数据
 * @param {*} obj
 */
export function isEmpty(obj) {
    if (obj == null) {
        return true
    }
    if (isArray(obj)) {
        return obj.length === 0
    }
    if (isString(obj)) {
        return !`${obj}`.trim().length
    }
    if (JSON.stringify(obj) === '{}') {
        return true
    }
    return false
}
/**
 * 验证 - 是否是本地资源路径
 * @param {String} src
 */
export function isSrc(src) {
    const reg = /^https?/ig
    if (reg.test(src)) {
        return false
    } else {
        return true
    }
}
