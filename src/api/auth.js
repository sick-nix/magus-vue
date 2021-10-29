import {externalApi} from "util/api"

export default {
    register(params) {
        return externalApi()
            .url('/auth/register')
            .post(params)
    },
    login(params) {
        return externalApi()
            .url('/auth/login')
            .post(params)
    },
    checkAuth() {
        return externalApi()
            .url('/auth')
            .get()
    },
    logout() {
        return externalApi()
            .url('/auth/logout')
            .delete()
    }
}