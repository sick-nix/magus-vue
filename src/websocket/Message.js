import MagusObject from "util/class/Magus/Object"

class Message extends MagusObject {
    /**
     * @type {null|string}
     * @private
     */
    _type = null

    /**
     * @type {null|Object}
     * @private
     */
    _meta = null

    /**
     * @returns {Message}
     */
    constructor(msg) {
        super()

        const { type, data = {}, meta = {} } = msg
        this.setType(type).setData(data)
        this._setMeta(new MagusObject(meta))
        return this
    }

    /**
     * @param {string} type
     * @returns {Message}
     */
    setType(type) {
        this._type = type
        return this
    }

    /**
     * @returns {null|string}
     */
    getType() {
        return this._type
    }

    /**
     * @param {Object} meta
     * @returns {Message}
     * @private
     */
    _setMeta(meta) {
        this._meta = meta
        return this
    }

    /**
     * @returns {MagusObject}
     */
    getMeta() {
        return this._meta
    }

    /**
     * @returns {string}
     */
    toString() {
        return JSON.stringify({
            type: this.getType(),
            data: this.getData(),
            meta: this.getMeta().getData()
        })
    }
}

export default Message