export const MESSAGE_HANDLERS = {
    ROOM_NEW: 'room.new',
    ROOM_GET: 'room.get',
    ROOM_ENTER: 'room.enter',
    ROOM_DELETE: 'room.delete',
    ROOM_HIDE: 'room.hide',
    MESSAGE_NEW: 'message.new',
    MESSAGE_GET: 'message.get',
    MESSAGE_EDIT: 'message.edit',
    MESSAGE_DELETE: 'message.delete',
    ATTACHMENT_NEW: 'attachment.new',
}

export const MESSAGE_DISPATCHERS = {
    ROOM_NEW: 'room.new',
    ROOM_GET: 'room.get',
    ROOM_ENTER: 'room.enter',
    ROOM_DELETE: 'room.delete',
    ROOM_HIDE: 'room.hide',
    MESSAGE_NEW: 'message.new',
    MESSAGE_GET: 'message.get',
    MESSAGE_EDIT: 'message.edit',
    MESSAGE_DELETE: 'message.delete',
    ATTACHMENT_NEW: 'attachment.new',
    MESSAGE_REFETCH: 'message.refetch'
}

export const ROOM_TYPES = {
    CHANNEL: 'channel',
    DIRECT: 'direct'
}

export const MESSAGE_REPLY_MODES = {
    REPLY: 'reply',
    PRIVATE: 'private',
    EDIT: 'edit'
}

export const MESSAGE_GET_ORIGIN = {
    ROOM_ENTER: 0,
    SCROLL: 1
}