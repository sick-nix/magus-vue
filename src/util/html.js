import $ from 'cash-dom'

/**
 * @param {HTMLElement} el
 */
export const scrollToBottom = (el) => {
    $(el).prop('scrollTop', $(el).prop('scrollHeight'))
}