import HandlerAbstract from "ws/Handler/Abstract"
import Magus from "src/Magus"
import {EVENTS} from "constants/events"
import _ from 'lodash'

class MessageNew extends HandlerAbstract {
    async run() {
        const message = this.getMessage().getData()
        this.$store.dispatch('addMessage', { message })
        if(message.createdBy === Magus.getStore().getters.user._id)
            Magus.getGlobalEventBus().emit(EVENTS.SCROLL_TO_BOTTOM)

        if(message.attachments && _.isArray(message.attachments)) {
            for(const attachment of message.attachments) {
                if(!attachment.filePath)
                    await this.$store.dispatch('uploadFileByUniqId', attachment.tempId)
            }

            this.$store.dispatch('refetchMessage', message)
        }
    }
}

export default MessageNew