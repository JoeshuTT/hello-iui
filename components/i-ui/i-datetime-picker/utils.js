import { isNaN, isDef } from '../utils/validate'

export function isValidDate(date) {
    return isDef(date) && !isNaN(new Date(date).getTime())
}

export function times(n, iteratee) {
    let index = -1
    const result = Array(n < 0 ? 0 : n)
    while (++index < n) {
        result[index] = iteratee(index)
    }
    return result
}

export function getTrueValue(value) {
    if (!value) {
        return 0
    }

    while (isNaN(parseInt(value, 10))) {
        if (value.length > 1) {
            value = value.slice(1)
        } else {
            return 0
        }
    }

    return parseInt(value, 10)
}

export function getMonthEndDay(year, month) {
    return 32 - new Date(year, month - 1, 32).getDate()
}
