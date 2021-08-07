import {getChannelConfig} from "components/Form/Schema/Chat/channel"
import {ROOM_TYPES} from "constants/chat"

export default function (params = {}) {
    let schema = getChannelConfig(params)
    schema.type.value = ROOM_TYPES.DIRECT
    schema.users.multiple = false
    schema.users.label = "Choose a user"
    schema.group.children[1].label = "Create Direct"
    delete schema.name

    return Object.values(schema)
}