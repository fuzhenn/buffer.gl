import { GLcommands, GLrefCreators } from './common/gl-commands';
import { getCommandTypes, GL_REF_KEY, getTypeOfArray, getTypeOfArrayByNum } from './common/util';
import { UID, isString } from './common/misc';
import { GLref, GLstring, GLarraybuffer, GLimage, ArrayBufferTypes } from './common/gl-types';

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
        const commandTypes = GLcommands[name];
        if (!commandTypes) {
            if (this.options.debug) {
                // command ignored
                console.log(`[addCommand] ignore command ${name}`);
            }
            return this;
        }
        let l = commandTypes.argTypes.length;
        if (commandTypes.returnType) {
            l += commandTypes.returnType.length || 1;
        }
        if (l !== args.length) {
            throw new Error(`[addCommand] wrong argument number ${name}`);
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
        if (GLrefCreators[name]) {
            const obj = args[args.length - 1];
            if (!obj[GL_REF_KEY]) {
                const key = UID();
                obj[GL_REF_KEY] = key;
                this.refMap[key] = obj;
            }
        }
        const { bufferTypes, size } = this._getBufferTypes(commandTypes, ...args);
        this._writeCommand(commandTypes, bufferTypes);
        const buffer = this._writeArgValues(args, commandTypes, bufferTypes, size);
        this.valueBuffers.push(buffer);
    }

    /**
     * write command and its buffer types to command buffer.
     * the structure: (each [] is an uint32 number)
     * [command number] | [buffer type number][buffer size] | [buffer type number][buffer size] | ....
     *                  |------optional------------------------------------------------|
     * @param {Any[]} commandTypes
     * @param {Any[]} bufferTypes
     */
    _writeCommand(commandTypes, bufferTypes) {
        //command num
        this.commands.push(commandTypes.num);
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
     * @param {Object[]} commandTypes command types
     * @param {Object[]} bufferTypes buffer argument's types
     * @param {Number} size value's buffer size in bytes
     */
    _writeArgValues(values, commandTypes, bufferTypes, size) {
        const buf = new ArrayBuffer(size);
        if (values.length === 0) {
            return buf;
        }
        const view = new DataView(buf);

        let pointer = 0;
        let btPointer = 0; //bufferTypes's pointer
        const types = commandTypes.argTypes;
        let i = 0;
        for (const l = types.length; i < l; i++) {
            const type = types[i];
            let value = values[i];
            if (type === GLref) {
                value = value[GL_REF_KEY];
            }
            let bytesCount = type.bytesCount;
            if (type === GLarraybuffer) {
                //write array or string value
                this._writeBuffer(buf, value, bufferTypes[btPointer++], pointer, bufferTypes[btPointer++]);
                bytesCount = bufferTypes[btPointer];
            } else if (type === GLstring) {
                this._writeBuffer(buf, value, ArrayBufferTypes.GLUint16Array.num, pointer, bufferTypes[btPointer++]);
                bytesCount = bufferTypes[btPointer];
            } else if (type === GLimage) {
                const w = bufferTypes[btPointer++],
                    h = bufferTypes[btPointer++];
                this._writeBuffer(buf, value, ArrayBufferTypes.GLUint8ClampedArray.num, pointer, w * h * 4);
                bytesCount = w * h * 4;
            } else {
                //write common values
                view['set' + type.type](pointer, value);
            }
            pointer += bytesCount;
        }
        const returnType = commandTypes.returnType;
        if (returnType) {
            if (Array.isArray(returnType)) {
                returnType.forEach(t => {
                    const value = t === GLref ? values[i++][GL_REF_KEY] : values[i++];
                    view['set' + t.type](pointer, value);
                    pointer += t.bytesCount;
                });
            } else {
                //last argument
                const value = returnType === GLref ? values[i][GL_REF_KEY] : values[i];
                view['set' + returnType.type](pointer, value);
            }
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
                arr[i] = value[i].charCodeAt(i);
            }
        } else {
            arr.set(value);
        }
    }

    /**
     * Get array type or string type definitions in the given arguments
     * @param {Object} commandTypes
     * @param {Any[]} args
     */
    _getBufferTypes(commandTypes, ...args) {
        let size = 0;
        const bufferTypes = [];
        let bytesCount;

        const types = commandTypes.argTypes;
        for (let i = 0, l = types.length; i < l; i++) {
            if (types[i] === GLarraybuffer) {
                const arr = args[i - 1];
                const arrType = getTypeOfArray(arr);
                bytesCount = arr.length * arrType.type.BYTES_PER_ELEMENT;
                //[arr type][bytes count]
                bufferTypes.push(arrType.num, bytesCount);
            } else if (types[i] === GLstring) {
                const str = args[i - 1];
                bytesCount = str.length * 2;
                //[bytes count]
                bufferTypes.push(bytesCount);
            } else if (types[i] === GLimage) {
                const img = args[i - 1];
                const imgData = this._readImage(img);
                bytesCount = imgData.data.length;
                const w = imgData.width,
                    h = imgData.height;
                //[width][height]
                bufferTypes.push(w, h);
            } else {
                bytesCount = types[i].bytesCount;
            }
            size += bytesCount;
        }

        const returnType = commandTypes.returnType;
        if (returnType) {
            if (Array.isArray(returnType)) {
                returnType.forEach(t => {
                    size += t.bytesCount;
                });
            } else {
                size += returnType.bytesCount;
            }
        }

        return {
            bufferTypes,
            size
        };
    }

    _readImage(img) {
        if (img instanceof ImageData) {
            return img;
        }
        return null;
    }
}
