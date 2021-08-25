import RoomNew from "ws/Handler/Room/New"
import {MESSAGE_HANDLERS} from "constants/chat"
import RoomGet from "ws/Handler/Room/Get"
import MessageNew from "ws/Handler/Message/New"
import MessageGet from "ws/Handler/Message/Get"
import RoomEnter from "ws/Handler/Room/Enter"
import RoomDelete from "ws/Handler/Room/Delete"
import RoomHide from "ws/Handler/Room/Hide"
import MessageEdit from "ws/Handler/Message/Edit"
import MessageDelete from "ws/Handler/Message/Delete"

export const HANDLER_MAP = {
    [MESSAGE_HANDLERS.ROOM_NEW]: RoomNew,
    [MESSAGE_HANDLERS.ROOM_GET]: RoomGet,
    [MESSAGE_HANDLERS.ROOM_ENTER]: RoomEnter,
    [MESSAGE_HANDLERS.ROOM_DELETE]: RoomDelete,
    [MESSAGE_HANDLERS.ROOM_HIDE]: RoomHide,
    [MESSAGE_HANDLERS.MESSAGE_NEW]: MessageNew,
    [MESSAGE_HANDLERS.MESSAGE_GET]: MessageGet,
    [MESSAGE_HANDLERS.MESSAGE_EDIT]: MessageEdit,
    [MESSAGE_HANDLERS.MESSAGE_DELETE]: MessageDelete
}