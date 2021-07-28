import {externalApi} from "util/api"

export default {
    isAvailable(params) {
        return externalApi
            .url('/user')
            .query(params)
            .get()
    },
}