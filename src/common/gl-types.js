export const Ref = { type : 'Int64', num : 0, bytesCount : 8 };
export const GLlocation = { type : 'Int64', num : 1, bytesCount : 8 };
export const GLenum = { type : 'Uint32', num : 100, bytesCount : 4 };
export const GLboolean = { type : 'Boolean', num : 101, bytesCount : 1 };
export const GLbitfield = { type : 'Uint32', num : 102, bytesCount : 4 };
export const GLbyte = { type : 'Int8', num : 103, bytesCount : 1 };
export const GLshort = { type : 'Int16', num : 104, bytesCount : 2 };
export const GLint = { type : 'Int32', num : 105, bytesCount : 4 };
export const GLsizei = { type : 'Int32', num : 106, bytesCount : 4 };
export const GLintptr = { type : 'Int64', num : 107, bytesCount : 8 };
export const GLsizeiptr = { type : 'Int64', num : 108, bytesCount : 8 };
export const GLubyte = { type : 'Uint8', num : 109, bytesCount : 1 };
export const GLushort = { type : 'Uint16', num : 110, bytesCount : 2 };
export const GLuint = { type : 'Uint32', num : 111, bytesCount : 4 };
export const GLfloat = { type : 'Float32', num : 112, bytesCount : 4 };
export const GLclampf = { type : 'Float32', num : 113, bytesCount : 4 };
export const GLstring = { type : 'String', num : 114, bytesCount : 0 };
export const GLarraybuffer = { type : 'ArrayBuffer', num : 115, bytesCount : 0 };

export const ArrayBufferTypes = {
    GLInt8Array : { type : Int8Array, num : 200 },
    GLUint8Array : { type : Uint8Array, num : 201 },
    GLUint8ClampedArray : { type : Uint8ClampedArray, num : 202 },
    GLInt16Array : { type : Int16Array, num : 203 },
    GLUint16Array : { type : Uint16Array, num : 204 },
    GLInt32Array : { type : Int32Array, num : 205 },
    GLUint32Array : { type : Uint32Array, num : 206 },
    GLFloat32Array : { type : Float32Array, num : 207 },
    GLFloat64Array : { type : Float64Array, num : 208 }
};

