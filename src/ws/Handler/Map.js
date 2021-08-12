import RoomNew from "ws/Handler/Room/New"
import {MESSAGE_HANDLERS} from "constants/chat"
import RoomGet from "ws/Handler/Room/Get"
import MessageNew from "ws/Handler/Message/New"
import MessageGet from "ws/Handler/Message/Get"
import RoomEnter from "ws/Handler/Room/Enter"

export const HANDLER_MAP = {
    [MESSAGE_HANDLERS.ROOM_NEW]: RoomNew,
    [MESSAGE_HANDLERS.ROOM_GET]: RoomGet,
    [MESSAGE_HANDLERS.ROOM_ENTER]: RoomEnter,
    [MESSAGE_HANDLERS.MESSAGE_NEW]: MessageNew,
    [MESSAGE_HANDLERS.MESSAGE_GET]: MessageGet
}