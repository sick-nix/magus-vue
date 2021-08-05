import RoomNew from "ws/Handler/Room/New"
import {MESSAGE_HANDLERS} from "constants/chat"
import RoomGet from "ws/Handler/Room/Get"

export const HANDLER_MAP = {
    [MESSAGE_HANDLERS.ROOM_NEW]: RoomNew,
    [MESSAGE_HANDLERS.ROOM_GET]: RoomGet
}