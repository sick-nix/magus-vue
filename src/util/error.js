import _ from "lodash"
import Magus from "src/Magus"

export const renderToasts = (obj) => {
    const messages = _.pick(obj, ['success', 'error'])

    for (const [key, message] of Object.entries(messages)) {
        Magus.notyf[key](message)
    }
}