export const waitForOpenSocket = (socket) => {
    return new Promise((resolve) => {
        if (socket.readyState !== WebSocket.OPEN) {
            socket.addEventListener("open", _ => {resolve()})
        } else {
            resolve()
        }
    })
}