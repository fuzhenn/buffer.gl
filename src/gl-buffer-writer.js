import { refCreators, locationGetters } from './common/gl-commands';
import { getCommandTypes, GL_REF_KEY, UID } from './common/util';
import { Ref, GLlocation, GLstring, GLarraybuffer } from './gl-types';
import { getTypeOfArrayByNum } from './common/util';

export default class GLBufferWriter {
    constructor(id) {
        this.id = id;
        this.reset();
    }

    addCommand(name, ...args) {
        const argTypes = GLCommands[name];
        if (!argTypes) {
            throw new Error('invalid webgl command:' + command);
        }
        this._saveCommand(name, ...args);
        return this;
    }
    
    clearCommands() {
        this.bytesCount = 0;
        this.commands = [];
        return this;
    }

    reset() {
        this.clearCommands();
        this.refMap = {};
        this.locationMap = {};
        return this;
    }

    getBuffer() {
        const buf = new ArrayBuffer(this.bytesCount);
        const commands = [];
        let pointer = 0;
        let cmdPointer = 0;
        for (let i = 0, l = this.commands.length; i < l; i++) {
            pointer = this._writeValues(buf, pointer, this.commands[i]);
            this._writeCommand(commands, this.commands[i]);
        }
        return {
            commands : new Uint32Array(commands),
            values : buf
        };
    }

    _saveCommand(name, ...args) {
        const commandTypes = getCommandTypes(name, ...args);
        commandTypes.forEach((c, idx) => {
            if (c.type === Ref || c.type === GLlocation) {
                args[idx - 1][GL_REF_KEY()] = UID();
            }
        })
        const { bufferTypes, count } = this._getBufferTypes(commandTypes, ...args);
        commands.push({
            name : name,
            types : commandTypes,
            bufferTypes : bufferTypes,
            args : args
        });
        this.bytesCount += count;
    }
    

    _writeCommand(commands, command) {
        const types = command.types;
        //command num
        commands.push(types[0]);
        if (command.bufferTypes) {
            //push in buffer types
            command.bufferTypes.forEach(d => {
                commands.push(d)
            });
        }
    }

    _writeValues(buffer, pointer, command) {
        const view = new DataView(buffer, pointer);
        const pt = 0;
        const args = command.args,
            types = command.types,
            bufferTypes = command.bufferTypes;
        // command num
        if (args.length === 1) {
            return;
        }
        let btPt = 0;
        for (let i = 1, l = types.length; i < l; i++) {
            const type = types[i];
            const value = args[i - 1];
            let bytesCount;
            if (type === GLstring || type === GLarraybuffer) {
                this._writeBuffer(buf, value, bufferTypes[btPt++], bufferTypes[btPt++]);
                bytesCount = bufferTypes[btPt];
            }  else if (type === GLlocation || type === Ref) {
                // gl object reference or attribute/uniform location
                view['set' + types.type](pointer, value[GL_REF_KEY]);
                bytesCount = types.type.bytesCount;
            } else {
                view['set' + types.type](pointer, value);
                bytesCount = types.type.bytesCount;
            }
            pointer += bytesCount;
        }
        return pointer;
    }

    _getBufferTypes(types, ...args) {
        const count = 0;
        const bufferTypes = [];
        let bytesCount;
        for (let i = 1, l = types.length; i < l; i++) {
            if (types[i] === GLarraybuffer) {
                const arr = args[i - 1];
                const arrType = getTypeOfArrayByNum(arr);
                bytesCount = arr.length * arrType.type.BYTES_PER_ELEMENT;
                bufferTypes.push(arrType.num, bytesCount);
            } else if (types[i] === GLstring) {
                const str = args[i - 1];
                bytesCount = str.length * 2;
                bufferTypes.push(types[i].num, bytesCount);
            } else {
                bytesCount = types[i].bytesCount;
            }
            count += bytesCount;
        }
        return {
            bufferTypes,
            count
        };
    }
}
