/**
 * util 工具方法
 */

/**
 * 验证 - 是否有值
 * @param {*} value
 * @return {Boolean}
 */
export function isDef(value) {
    return value !== undefined && value !== null
}

/**
 * 验证 - 是否是对象
 * @param {*} x
 * @return {Boolean}
 */
export function isObj(x) {
    const type = typeof x
    return x !== null && (type === 'object' || type === 'function')
}

/**
 * 验证 - 是否是字符串
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
 * 验证 - 是否是数字
 * @param {Number} value
 * @return {Boolean}
 */
export function isNumber(value) {
    return /^\d+$/.test(value)
}

/**
 * 取区间内合法值 - 是否是数字
 * @param {Number} num,
 * @param {Number} min
 * @param {Number} max
 * @return {Number}
 */
export function range(num, min, max) {
    return Math.min(Math.max(num, min), max)
}

/**
 * getSystemInfoSync
 * @return {Object}
 */
let systemInfo = null
export const getSystemInfoSync = function() {
    if (systemInfo == null) {
        systemInfo = uni.getSystemInfoSync()
    }
    return systemInfo
}

/**
 * 对页面携带参数(url传参)进行encodeURI编码
 * @param {Object} query
 * @description 页面跳转携带参数时使用，尤其是携带中文参数时
 * @return {String}
 */
export const qsStringify = function(query) {
    if (!query && typeof query !== 'object') {
        throw new Error('error arguments', 'qsStringify')
    }
    const url = Object.keys(query).map(key => key + '=' + encodeURIComponent(query[key])).join('&')
    return url
}

/**
 * 获取上一个页面实例 $vm
 * @param {Number} delta 页面层数
 * @description 可用于修改上一页数据
 * @return {Object} query
 */
export const getPrevPage = function(delta = 1) {
    const pages = getCurrentPages()
    if (delta > pages.length) {
        // 页面层数大于现有页面数
        return null
    }
    const prevPage = pages[pages.length - (delta + 1)]
    if (prevPage) {
        return prevPage.$vm
    }
    return null
}

/**
 * rpx2px
 * @param {Number} val
 * @param {Number} destWidth
 * @return {Number}
 */
export const rpx2px = function(val, destWidth = 750) {
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
/**
 * 函数节流
 * @param {*} fn 事件回调
 * @param {*} interval 时间间隔的阈值
 */
export const throttle = function(fn, interval) {
    let last = 0
    return function() {
        const context = this
        const args = arguments
        const now = +new Date()

        if (now - last >= interval) {
            last = now
            fn.apply(context, args)
        }
    }
}

/**
 * 函数防抖
 * @param {callback} fn 事件回调
 * @param {number} delay 每次推迟执行的等待时间
 */
export const debounce = function(fn, delay) {
    let last = 0
    let timer = null
    return function() {
        const context = this
        const args = arguments
        const now = +new Date()

        if (now - last < delay) {
            clearTimeout(timer)
            timer = setTimeout(function() {
                last = now
                fn.apply(context, args)
            }, delay)
        } else {
            last = now
            fn.apply(context, args)
        }
    }
}

/**
 * 浅拷贝
 * @param {Object} source
 * @return {Object}
 */
export function shallowClone(source) {
    if (!source && typeof source !== 'object') {
        throw new Error('error arguments', 'shallowClone')
    }
    return Object.assign({}, source)
}

/**
 * 深拷贝
 * @param {Object} source
 * @return {Object}
 */
export function deepClone(source) {
    if (!source && typeof source !== 'object') {
        throw new Error('error arguments', 'deepClone')
    }
    const targetObj = source.constructor === Array ? [] : {}
    Object.keys(source).forEach(keys => {
        if (source[keys] && typeof source[keys] === 'object') {
            targetObj[keys] = deepClone(source[keys])
        } else {
            targetObj[keys] = source[keys]
        }
    })
    return targetObj
}

/**
 * 查询指定节点的布局位置信息，其功能类似于 DOM 的 getBoundingClientRect
 * @param {Object} context 节点对象实例
 * @param {String} selector .a, #a
 * @param {Boolean} all
 */
export const getRect = function(context, selector, all = false) {
    return new Promise((resolve) => {
        uni.createSelectorQuery().in(context)[all ? 'selectAll' : 'select'](selector).boundingClientRect((rect) => {
            resolve(rect)
        }).exec()
    })
}

/**
 * 生成一个 UUID
 */
export const guid = function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0
        var v = c === 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
    })
}
