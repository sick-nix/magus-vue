import {mapGetters} from "vuex"
import {MESSAGE_REPLY_MODES} from "constants/chat"

export const replyBoxMixin = {
    data() {
        return {
            selectedMode: null
        }
    },
    computed: {
        ...mapGetters({
            isReply: 'isReply',
            isPrivateNote: 'isPrivateNote',
            isEdit: 'isEdit'
        }),
        getModes() {
            return [
                {
                    mode: MESSAGE_REPLY_MODES.REPLY,
                    class: {'reply__mode--reply': true, active: this.isReply},
                    label: 'Reply',
                    click: () => this.setSelectedReplyMode(MESSAGE_REPLY_MODES.REPLY)
                },
                {
                    mode: MESSAGE_REPLY_MODES.PRIVATE,
                    class: {'reply__mode--private': true, active: this.isPrivateNote},
                    label: 'Private',
                    click: () => this.setSelectedReplyMode(MESSAGE_REPLY_MODES.PRIVATE)
                },
                {
                    mode: MESSAGE_REPLY_MODES.EDIT,
                    class: {'reply__mode--edit': true, active: this.isEdit, disabled: !this.isEdit},
                    label: 'Edit',
                    click: () => {}
                }
            ]
        }
    },
    methods: {
        async setSelectedReplyMode(mode) {
            await this.$store.dispatch('setSelectedMode', mode)
        }
    }
}