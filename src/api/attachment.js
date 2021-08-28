import {externalApi} from "util/api"

export default {
    upload(params) {
        return externalApi
            .url('/attachment/upload')
            .formData(params)
            .post()
    },
    download(params) {
        return externalApi
            .url('/attachment/download')
            .query(params)
            .get()
    }
}