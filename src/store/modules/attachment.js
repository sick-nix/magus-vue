import attachmentApi from "api/attachment"

const state = () => ({
    inProgress: {}
})

const getters = {
    getInProgressFile: state => uniq => state.inProgress[uniq],
    isCreatedByUser: (state, getters, rootState, rootGetters) => attachment => {
        return attachment.createdBy === rootGetters.user._id
    },
}

const actions = {
    uploadFile: (store, data) => {
        return attachmentApi.upload(data).json(json => json)
    },
    downloadFile: (store, data) => {
        return attachmentApi.download(data).blob(blob => blob)
    },
    addAttachmentInProgress(store, params) {
        const { uniq, file } = params
        store.state.inProgress[uniq] = file
    },
    async uploadFileByUniqId(store, uniq) {
        if(store.getters.getInProgressFile(uniq)) {
            const res = await store.dispatch('uploadFile', {
                file: store.getters.getInProgressFile(uniq),
                uniq,
            })

            if(res && res.filePath)
                store.dispatch('removeByUniqId', uniq)
        }
    },
    removeByUniqId(store, uniq) {
        delete store.state.inProgress[uniq]
    }
}

const mutations = {

}

export default {
    state,
    getters,
    actions,
    mutations
}