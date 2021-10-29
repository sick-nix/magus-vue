import _ from "lodash"

/**
 * @param {string|Date} date
 * @return {Date}
 */
export const getDateObj = date => {
    if(!_.isDate(date)) return new Date(date)
    return date
}