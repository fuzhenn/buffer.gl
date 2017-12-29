/**
 * Whether the object is null or undefined.
 * @param  {Object}  obj - object
 * @return {Boolean}
 */
export function isNil(obj) {
    return obj == null;
}

/**
 * Check whether the object is a function
 * @param {Object} obj
 * @return {Boolean}
 */
export function isFunction(obj) {
    if (isNil(obj)) {
        return false;
    }
    return typeof obj === 'function' || (obj.constructor !== null && obj.constructor === Function);
}

/**
 * Whether val is a number and not a NaN.
 * @param  {Object}  val - val
 * @return {Boolean}
 */
export function isNumber(val) {
    return (typeof val === 'number') && !isNaN(val);
}

/**
 * Check whether the object is a string
 * @param {Object} obj
 * @return {Boolean}
 */
export function isString(obj) {
    if (isNil(obj)) {
        return false;
    }
    return typeof obj === 'string' || (obj.constructor !== null && obj.constructor === String);
}

let uid = 1;

export function UID() {
    return uid++;
}

/**
 * Merges the properties of sources into destination object.
 * @param  {Object} dest   - object to extend
 * @param  {...Object} src - sources
 * @return {Object}
 */
export function extend(dest) { // (Object[, Object, ...]) ->
    for (let i = 1; i < arguments.length; i++) {
        const src = arguments[i];
        for (const k in src) {
            dest[k] = src[k];
        }
    }
    return dest;
}
