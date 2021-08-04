import RoomNew from "websocket/Handler/Room/New"
import {MESSAGE_HANDLERS} from "constants/chat"

export const HANDLER_MAP = {
    [MESSAGE_HANDLERS.ROOM_NEW]: RoomNew
}