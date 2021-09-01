import {externalApi} from "util/api"

export default {
    isAvailable(params) {
        return externalApi()
            .url('/user')
            .query(params)
            .get()
    },
    getUsers(params) {
        return externalApi()
            .url('/user/users')
            .query(params)
            .get()
    }
}