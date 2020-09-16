/**
 * util
 */

export function isDef(value) {
    return value !== undefined && value !== null
}

export function isObj(x) {
    const type = typeof x
    return x !== null && (type === 'object' || type === 'function')
}

export function isNumber(value) {
    return /^\d+(\.\d+)?$/.test(value)
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
 * rpx2px
 * @param {Number} val
 * @param {Number} destWidth
 * @return {Number}
 */
export const rpx2px = function(val, destWidth = 750) {
    const scale = getSystemInfoSync().windowWidth / destWidth

    return Math.round(val * scale)
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
 * @param {Boolean} context 节点对象实例
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

/**
   * 个性化 console.log
   * @param {*} type
   * @param {*} key
   * @param {*} text
   */
export const log = (type = 'danger', key = '错误', text = '系统异常') => {
    /* #ifndef H5 */
    console.log(`%c ${key} %c ${text}`)
    /* #endif */
    /* #ifdef  H5 */
    let bgColor = '#ee0a24'
    switch (type) {
        case 'default':
            bgColor = '#515a6e'
            break
        case 'primary':
            bgColor = '#07c160'
            break
        case 'info':
            bgColor = '#1989fa'
            break
        case 'warning':
            bgColor = '#ff976a'
            break
        case 'danger':
            bgColor = '#ee0a24'
            break
        default:
            break
    }
    console.log(`%c ${key} %c ${text}`, 'background:#7ebea0; padding: 2px 4px; border-radius: 3px 0 0 3px; color: #fff;', `background:${bgColor};padding: 2px 4px; border-radius: 0 3px 3px 0;  color: #fff;`)
    /* #endif */
}

