export const CONFIG_OPTIONS = {
    BASE_URL: 'baseUrl',
    WS_ENDPOINT: 'wsEndpoint',
    MAX_ATTACHMENT_SIZE: 'maxAttachmentSize'
}

export default {
    [CONFIG_OPTIONS.BASE_URL]: 'http://localhost:3000',
    [CONFIG_OPTIONS.WS_ENDPOINT]: 'ws://localhost:9000',
    [CONFIG_OPTIONS.MAX_ATTACHMENT_SIZE]: 1024 * 1024 * 20 // 20 MB
}