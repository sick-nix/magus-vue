import wretch from "wretch"
import Magus from "src/Magus"
import {CONFIG_OPTIONS} from "constants/config"
import {renderToasts} from "util/error"

export const externalApi = function () {
    return wretch()
        .url(Magus.instance.getConfigOption(CONFIG_OPTIONS.BASE_URL))
        .options({
            credentials: "same-origin",
            mode: "cors",
        })
        .catcher('Error', err => {
            if(err?.message) {
                try {
                    const json = JSON.parse(err.message)
                    renderToasts(json)
                } catch (err) {}
            }
        })
}