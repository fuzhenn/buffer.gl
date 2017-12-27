import { refCreators, locationGetters } from './common/gl-commands';
import { getCommandTypes, GL_REF_KEY, UID, getTypeOfArray, getTypeOfArrayByNum, isString } from './common/util';
import { GLref, GLlocation, GLstring, GLarraybuffer } from './gl-types';
import { ArrayBufferTypes } from './common/gl-types';

export default class GLBufferWriter {
    constructor(options = {}) {
        this.options = options;
        this.reset();
    }

    /**
     * Add a webgl command and arguments
     * @param {String} name 
     * @param {Any[]} args 
     */
    addCommand(name, ...args) {
        const argTypes = GLCommands[name];
        if (!argTypes) {
            if (this.options.debug) {
                // command ignored
                console.log(`[addCommand] ignore command ${name}`);
            }
            return this;
        }
        this._saveCommand(name, ...args);
        return this;
    }
    
    clearCommands() {
        this.commands = [];
        this.valueBuffers = [];
        return this;
    }

    reset() {
        this.clearCommands();
        this.refMap = {};
        return this;
    }

    getBuffer() {
        return {
            commands : new Uint32Array(this.commands),
            values : this.valueBuffers
        };
    }

    _saveCommand(name, ...args) {
        const commandTypes = getCommandTypes(name, ...args);
        if (refCreators[name]) {
            const obj = args[args.length - 1];
            if (!obj[GL_REF_KEY]) {
                const key = UID();
                obj[GL_REF_KEY] = key;
                this.refMap[key] = obj;
            }
        }
        const { bufferTypes, size } = this._getBufferTypes(commandTypes, ...args);
        this._writeCommand(types, bufferTypes);
        const buffer = this._writeArgValues(args, commandTypes, bufferTypes, size);
        this.valueBuffers.push(buffer);
    }
    
    /**
     * write command and its buffer types to command buffer.
     * the structure: (each [] is an uint32 number)
     * [command number] | [buffer type number][buffer size] | [buffer type number][buffer size] | ....
     *                  |------optional------------------------------------------------|
     * @param {Any[]} types 
     * @param {Any[]} bufferTypes 
     */
    _writeCommand(types, bufferTypes) {
        //command num
        this.commands.push(types[0]);
        if (bufferTypes) {
            //push in buffer types
            bufferTypes.forEach(d => {
                this.commands.push(d);
            });
        }
    }

    /**
     * write argument values
     * the structure(each [] is an argument value, it's length is decided by argument type):
     * [arg00][arg01][arg02] | [arg10][arg11][arg12] | .....
     *    command0's args         command1's args      ...
     * @param {Any[]} values argument values
     * @param {Object[]} types argument types
     * @param {Object[]} bufferTypes buffer argument's types
     * @param {Number} size value's buffer size in bytes
     */
    _writeArgValues(values, types, bufferTypes, size) {
        const buf = new ArrayBuffer(size);        
        if (values.length === 1) {
            return buf;
        }
        const view = new DataView(buffer);

        let pointer = 0;
        let btPointer = 0; //bufferTypes's pointer
        for (let i = 1, l = types.length; i < l; i++) {
            const type = types[i];
            let value = values[i - 1];
            if (type === GLref) {
                //reference uid of object
                value = value[GL_REF_KEY];
            }
            let bytesCount = types.type.bytesCount;
            if (type === GLstring || type === GLarraybuffer) {
                //write array or string value
                this._writeBuffer(buf, value, bufferTypes[btPointer++], pointer, bufferTypes[btPointer++]);
                bytesCount = bufferTypes[btPointer];
            }  else {
                //write common values
                view['set' + types.type](pointer, value);
            }
            pointer += bytesCount;
        }
        return buf;
    }

    /**
     * write array or string type argument value into arraybuffer
     * @param {ArrayBuffer} buffer 
     * @param {Any} value 
     * @param {Number} type ArrayBufferType's num
     * @param {Number} pointer 
     * @param {Number} size 
     */
    _writeBuffer(buffer, value, type, pointer, size) {
        const arrType = getTypeOfArrayByNum(type);
        const arr = new arrType.type(buffer, pointer, size);
        if (isString(value)) {
            for (let i = 0, l = value.length; i < l; i++) {
                arr[i] = str[i].charCodeAt(i);
            }
        } else {
            arr.set(value);
        }
    }

    /**
     * Get array type or string type definitions in the given arguments
     * @param {Any[]} types 
     * @param {Any[]} args 
     */
    _getBufferTypes(types, ...args) {
        const size = 0;
        const bufferTypes = [];
        let bytesCount;
        for (let i = 1, l = types.length; i < l; i++) {
            if (types[i] === GLarraybuffer) {
                const arr = args[i - 1];
                const arrType = getTypeOfArray(arr);
                bytesCount = arr.length * arrType.type.BYTES_PER_ELEMENT;
                bufferTypes.push(arrType.num, bytesCount);
            } else if (types[i] === GLstring) {
                const str = args[i - 1];
                bytesCount = str.length * 2;
                const arrType = ArrayBufferTypes.GLUint32Array;
                bufferTypes.push(arrType.num, bytesCount);
            } else {
                bytesCount = types[i].bytesCount;
            }
            size += bytesCount;
        }
        return {
            bufferTypes,
            size
        };
    }
}
