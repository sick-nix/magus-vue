import MagusObject from "util/class/Magus/Object"
import _ from "lodash"
import Vue from "vue"

class ReactiveObject extends MagusObject {
    /**
     * @param {String|Object} key
     * @param {*} value
     * @returns {ReactiveObject}
     */
    setData(key, value = null) {
        if(key instanceof Object) {
            this._data = {}
            this.addData(key)
        }
        else this.addData({[key]: value})

        return this
    }

    /**
     * @param {Object} data
     * @returns {ReactiveObject}
     */
    addData(data) {
        for(let [key, value] of Object.entries(data)) {
            Vue.set(this._data, key, ReactiveObject.getReactiveObject(value, this.getReactiveClassByProp(key)))
        }

        return this
    }

    /**
     * @return {Object}
     */
    getReactiveClassesMap() {
        return this._getReactiveClasses()
    }

    /**
     * Map properties to other classes.
     * Convert set values to mapped class.
     * @return {Object}
     * @private
     */
    _getReactiveClasses() {
        return {}
    }

    /**
     * @param {string} prop
     * @return {*}
     */
    getReactiveClassByProp(prop) {
        return this.getReactiveClassesMap()[prop]
    }

    /**
     * @param {Object} obj
     * @param {typeof MagusObject|null} className
     * @return {*}
     */
    static getReactiveObject(obj, className = null) {
        if(!className) className = ReactiveObject
        let reactiveObj = obj
        // if object is not an array or an object return as it is
        if(_.isArray(obj)) {
            reactiveObj = []
            // If obj is array create array of reactive objects
            for(let key of Object.keys(obj)) {
                let value = obj[key]
                Vue.set(reactiveObj, key, ReactiveObject.getReactiveObject(value, className))
            }
        } else if(_.isObject(obj)) {
            // If object is any object create instance of reactive object
            // reactive object handles recursively the conversion of any object properties to reactive objects
            if(obj instanceof MagusObject)
                obj = obj.getData()
            if(className)
                reactiveObj = new className(obj)
        }

        return reactiveObj
    }
}

export default ReactiveObject