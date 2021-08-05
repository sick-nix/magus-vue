export const waitForOpenSocket = (socket) => {
    return new Promise((resolve) => {
        console.log(socket.OPEN)
        if (socket.readyState !== WebSocket.OPEN) {
            socket.addEventListener("open", _ => {resolve()})
        } else {
            resolve()
        }
    })
}