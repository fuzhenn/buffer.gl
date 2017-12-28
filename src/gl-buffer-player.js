import { isFunction } from "./common/misc";
import { getCommandTypesByNum, getTypeOfArrayByNum } from "./common/util";
import { GLrefCreators, GLlocationGetters } from "./common/gl-commands";
import { GLref, GLlocation } from "./common/gl-types";

export default class GLBufferPlayer {
    constructor() {
        this.commands = [];
        this.refMap = {};
    }

    addCommands(data) {
        this._parse(data);
        return this;
    }

    playback(gl) {
        if (!this.commands) {
            return this;
        }
        for (let i = 0, l = this.commands.length; i < l; i++) {
            const command = this.commands[i];
            const name = command.name;
            const types = command.types;
            const args = this._prepareArgs(types, command.args);
            const result = gl[name].apply(gl, args);
            const ref = command.ref;
            if (ref) {
                this.refMap[ref] = result;
            }
        }
        return this;
    }

    clearCommands() {
        this.commands = [];
    }

    reset() {
        this.clearCommands();
        this.refMap = {};
    }

    _prepareArgs(types, args) {
        const name = types[0];
        const isRef = GLrefCreators[name] || GLlocationGetters[name];
        const l = isRef ? types.length - 1 : types.length;
        const result = [];
        for (let i = 1; i < l; i++) {
            const type = types[i];
            const v = args[i - 1];
            if (type === GLref || type === GLlocation) {
                //a reference object or location
                result.push(this.refMap[v]);
            } else {
                result.push(v)
            }
        }
        return result;
    }

    _parse(data) {
        const commands = new Uint32Array(data.commands);
        const values = new DataView(data.values);
        let cPt, vPt = 0;
        while (cPt < commands.length) {
            const c = this._readCommand(cPt, commands, vPt, values);
            cPt = c.cPt;
            vPt = c.vPt;
            this.commands.push(c.command);
        }
    }
    
    _readCommand(cPt, comBuffer, vPt, values)  {
        const commandNum = comBuffer[cPt++];
        const types = getCommandTypesByNum(commandNum);
        //command method name
        const name = types[0];
        //arguments
        const args = [];
        //result reference id
        let ref = 0;
        const isRef = GLrefCreators[name] || GLlocationGetters[name];        
        for (let i = 1, l = types.length; i < l; i++) {
            const type = types[i];
            let bytesCount = type.bytesCount;
            if (type === GLarraybuffer) {
                //read value of array type 
                //[arr type][bytes count]
                const arrType = getTypeOfArrayByNum(comBuffer[cPt++]).type;
                bytesCount = comBuffer[cPt++];
                const v = this._readArray(vPt, values, arrType, bytesCount);
                args.push(v);
            } else if (type === GLstring) {
                //read value of string
                //[bytes count]
                bytesCount = comBuffer[cPt++];
                const str = this._readString(vPt, values, bytesCount);
                args.push(str);
            } else if (type === GLimage) {
                //[width][height]
                const w = comBuffer[cPt++],
                    h = comBuffer[cPt++];
                bytesCount = w * h * 4;
                const arr = this._readArray(vPt, values, Uint8ClampedArray, bytesCount);
                const imageData = this._createImageData(arr, w, h);
                args.push(ImageData);
            } else {
                //common values: int8/uint8/int16..
                const v = values[`get${type.type}`](vPt);
                if (isRef && i === l - 1) {
                    //the last value if the reference id
                    ref = v;
                } else {
                    args.push(v);
                }
            }
            vPt += bytesCount;
        }
        return {
            cPt,
            vPt,
            command : {
                name : name,
                types : types,
                args : args,
                ref : ref
            }
        }
    }

    _readArray(pt, values, arrType, arrSize) {
        return new arrType(values, pt, arrSize);
    }

    _readString(pt, values, strSize) {
        const str = [];
        for (let i = 0; i < strSize; i += 2) {
            const code = values.getUint16(pt + i);
            str.push(String.fromCharCode(code));
        }
        return str.join('');
    }

    _createImageData(arr, w, h) {
        if (isFunction(ImageData)) {
            return new ImageData(arr, w, h);
        }
        if (!this._canvas) {
            this._canvas = document.createElement('canvas');
        }
        const ctx = this._canvas.getContext('2d');
        const imgData = ctx.createImageData(w, h);
        for (let i = 0, l = arr.length; i < l; i++) {
            imgData.data[i] = arr[i];
        }
        return imgData;
    }
};
