/**
 * range
 * @param {Number} num
 * @param {Number} min
 * @param {Number} max
 * @return {Number}
 */
export function range(num, min, max) {
    return Math.min(Math.max(num, min), max)
}

/**
 * trimExtraChar
 * @param {String} value
 * @param {String} char
 * @param {RegExp} regExp
 * @return {String}
 */
function trimExtraChar(value, char, regExp) {
    const index = value.indexOf(char)

    if (index === -1) {
  	return value
    }

    if (char === '-' && index !== 0) {
  	return value.slice(0, index)
    }

    return value.slice(0, index + 1) + value.slice(index).replace(regExp, '')
}

/**
 * formatNumber
 * @param {String} value
 * @param {Boolean} allowDot
 * @return {String}
 */
export function formatNumber(value, allowDot) {
    if (allowDot) {
        value = trimExtraChar(value, '.', /\./g)
    } else {
        value = value.split('.')[0]
    }

    value = trimExtraChar(value, '-', /-/g)

    const regExp = allowDot ? /[^-0-9.]/g : /[^-0-9]/g

    return value.replace(regExp, '')
}

const camelizeRE = /-(\w)/g

/**
 * camelize
 * @param {String} str
 * @return {String}
 */
export function camelize(str) {
    return str.replace(camelizeRE, (_, c) => c.toUpperCase())
}

/**
 * padZero
 * @param {String | Number} num
 * @return {Number} targetLength 2
 * @return {String}
 */
export function padZero(num, targetLength = 2) {
    let str = num + ''

    while (str.length < targetLength) {
        str = '0' + str
    }

    return str
}
