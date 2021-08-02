/**
 * @param {Array} array1
 * @param {Array} array2
 * @param {number|string} key
 * @returns {*[]}
 */
export const mergeWithUniqueKeys = (array1, array2, key = '_id') => {
    const result = []
    for(let i = 0; i < array1.length; i++) {
        const item = array1[i]
        let index = array2.findIndex(el => el[key] === item[key])
        if(index >= 0) removeAndResetIndexes(array2, index)
        result.push(item)
    }
    result.push(...array2)

    return result
}

/**
 * @param {Array} array
 * @param {number} index
 */
export const removeAndResetIndexes = (array, index) => {
    array.splice(index, 1);
}