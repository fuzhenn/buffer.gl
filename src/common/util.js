import * as types from './gl-types';
import { GLcommands } from './gl-commands';
import { isFunction } from "./misc";

export const GL_REF_KEY = '__gl_buffer_ref_';

const bufferTypeMap = {};
for (const p in types.ArrayBufferTypes) {
    const c = types.ArrayBufferTypes[p];
    bufferTypeMap[c.num] = {
        name : p,
        num : c.num,
        type : c.type
    };
}

/**
 * Get type definition of the array
 * @param {TypedArray} arr 
 */
export function getTypeOfArray(arr) {
    for (const p in types.ArrayBufferTypes) {
        if (arr instanceof types.ArrayBufferTypes[p].type) {
            return types.ArrayBufferTypes[p];
        }
    }
    throw new Error('unsupported array buffer type');
}

/**
 * Get type definition by array num
 * @param {Number} num 
 */
export function getTypeOfArrayByNum(num) {
    return bufferTypeMap[num];
}

const commandMap = {};

for (const p in GLcommands) {
    const c = GLcommands[p];
    if (isFunction(c)) {
        c().forEach(t => {
            commandMap[t[0]] = [p, t.slice(1)];
        });
    } else {
        commandMap[c[0]] = [p, c.slice(1)];
    }
}

/**
 * Get GLCommand definition by command name and arguments
 * @param {String} name 
 * @param {Any[]} args 
 */
export function getCommandTypes(name, ...args) {
    const c = GLcommands[name];
    if (!isFunction(c)) {
        return c;
    }
    return c(name, ...args);
}

/**
 * Get GLCommand definistion by mapping num
 * @param {Number} num 
 */
export function getCommandTypesByNum(num) {
    return commandMap[num];
}

const typeMap = {};
for (const p in types) {
    const t = types[p];
    typeMap[t.num] = {
        name : p,
        num : t.num,
        type : t.type
    };
}

export function getTypeByNum(num) {
    return typeMap[num];
}
