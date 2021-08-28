import $ from 'cash-dom'

/**
 * @param {HTMLElement} el
 */
export const scrollToBottom = (el) => {
    $(el).prop('scrollTop', $(el).prop('scrollHeight'))
}

/**
 * @param {Blob} blob
 * @param {MagusObject} attachment
 */
export const download = (blob, attachment) => {
    if(blob) {
        const url = URL.createObjectURL(blob)

        // create link
        const a = $('<a>')
        a.css('display', 'none')
        a.prop('href', url)
        // the filename you want
        a.prop('download', attachment.origFilename)
        $(document.body).append(a)
        a.trigger('click')
        URL.revokeObjectURL(url)
        $(document.body).remove(a)
    }
}

/**
 * @param {HTMLTextAreaElement} field
 * @param {*} value
 * @return string
 */
export const insertAtCaretPosition = (field, value) => {
    let newValue = field.value
    if (field.selectionStart || field.selectionStart === 0) {
        const  startPos = field.selectionStart;
        const endPos = field.selectionEnd;
        newValue = field.value.substring(0, startPos)
            + value
            + field.value.substring(endPos, field.value.length);
    } else newValue += value;

    return newValue
}