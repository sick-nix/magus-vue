import defaultConfig, {CONFIG_OPTIONS} from "constants/config"
import v from 'voca'
import _ from 'lodash'
import {getNestedValue} from "util/object"
import mitt from "mitt"
import {Notyf} from "notyf"

class Magus {
    static _instance = null
    static _store = null
    static _globalEventBus = null
    static _notyf = null

    _config = null

    /**
     * @returns {Magus}
     */
    static get instance() {
        if(!Magus._instance) Magus._instance = new Magus()
        return Magus._instance
    }

    /**
     * @returns {Notyf}
     */
    static get notyf() {
        if(!Magus._notyf) Magus._notyf = new Notyf()
        return Magus._notyf
    }

    /**
     * @param {Object} config
     * @returns {Magus}
     */
    setConfig(config) {
        this._config = _.merge(this.getConfig(), config)
        return this
    }

    getConfig() {
        if(!this._config) this._config = defaultConfig
        return this._config
    }

    getConfigOption(option) {
        if(_.isString(option))
            option = [ option ]

        return getNestedValue(this.getConfig(), option)
    }

    getUrl(path) {
        return v.trimRight(this.getConfigOption(CONFIG_OPTIONS.BASE_URL), '/') + '/' + v.trimLeft(path, '/')
    }

    static setStore(store) {
        Magus._store = store
        return Magus
    }

    static getStore() {
        return Magus._store
    }

    static getGlobalEventBus() {
        if(!Magus._globalEventBus) Magus._globalEventBus = mitt()
        return Magus._globalEventBus
    }
}

export default Magus