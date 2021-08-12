import _ from 'lodash'

/**
 * @param {Object} obj
 * @param {Array} propArray
 * @return {*}
 */
export const getNestedValue = (obj, propArray) => {
    if(!(_.isArray(propArray) && propArray.length)) return null
    const key = propArray[0]
    if(propArray.length === 1)
        return obj[key]
    if(obj[key] === undefined)
        return undefined
    return getNestedValue(obj, _.splice(propArray, 1))
}