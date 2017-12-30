import {
    GLenum,
    GLboolean,
    GLbitfield,
    GLint,
    GLsizei,
    GLintptr,
    GLsizeiptr,
    GLuint,
    GLfloat,
    GLclampf,
    GLstring,
    GLarraybuffer,
    GLimage,
    GLref,
    GLlocation
} from './gl-types';
import { isNumber } from './misc';
// method tables
export const GLcommands = {
    activeTexture :	{ num : 1000, argTypes : [GLenum], returnType : null },
    attachShader :	{ num : 1001, argTypes : [GLref, GLref], returnType : null },
    bindAttribLocation :	{ num : 1002, argTypes : [GLlocation, GLuint, GLstring], returnType : null },
    bindBuffer :	{ num : 1003, argTypes : [GLenum, GLref], returnType : null },
    bindFramebuffer :	{ num : 1004, argTypes : [GLenum, GLref], returnType : null },
    bindRenderbuffer :	{ num : 1005, argTypes : [GLenum, GLref], returnType : null },
    bindTexture :	{ num : 1006, argTypes : [GLenum, GLref], returnType : null },
    blendColor :	{ num : 1007, argTypes : [GLclampf, GLclampf, GLclampf, GLclampf], returnType : null },
    blendEquation :	{ num : 1008, argTypes : [GLenum], returnType : null },
    blendEquationSeparate :	{ num : 1009, argTypes : [GLenum, GLenum], returnType : null },
    blendFunc :	{ num : 1010, argTypes : [GLenum, GLenum], returnType : null },
    blendFuncSeparate :	{ num : 1011, argTypes : [GLenum, GLenum, GLenum, GLenum], returnType : null },
    bufferData : function (...args) {
        const argTypes = [
            { num : 10120, argTypes : [GLenum, GLsizeiptr, GLenum], returnType : null },
            { num : 10122, argTypes : [GLenum, GLarraybuffer, GLenum, GLuint, GLuint], returnType : null },
            { num : 10121, argTypes : [GLenum, GLarraybuffer, GLenum], returnType : null }
        ];
        if (isNumber(args[1])) {
            return argTypes[0];
        } else if (args.length === 5) {
            return argTypes[1];
        } else if (args.length > 0) {
            return argTypes[2];
        }
        return argTypes;
    },
    bufferSubData : function (...args) {
        const argTypes = [
            { num : 10130, argTypes : [GLenum, GLintptr, GLarraybuffer], returnType : null },
            //a webgl 2 method
            { num : 20131, argTypes : [GLenum, GLintptr, GLarraybuffer, GLuint, GLuint], returnType : null }
        ];
        if (args.length === 3) {
            return argTypes[0];
        } else if (args.length > 0) {
            return argTypes[1];
        }
        return argTypes;
    },
    // checkFramebufferStatus : { num : 1014, argTypes : [GLenum], returnType : null },
    clear :	{ num : 1015, argTypes : [GLbitfield], returnType : null },
    clearColor :	{ num : 1016, argTypes : [GLclampf, GLclampf, GLclampf, GLclampf], returnType : null },
    clearDepth :	{ num : 1017, argTypes : [GLclampf], returnType : null },
    clearStencil :	{ num : 1018, argTypes : [GLint], returnType : null },
    colorMask :	{ num : 1019, argTypes : [GLclampf, GLclampf, GLclampf, GLclampf], returnType : null },
    commit :	{ num : 1020, argTypes : [], returnType : null },
    compileShader :	{ num : 1021, argTypes : [GLref], returnType : null },
    compressedTexImage2D :	function (...args) {
        const argTypes = [
            { num : 10220, argTypes : [GLenum, GLint, GLenum, GLsizei, GLsizei, GLint, GLimage], returnType : null },
            //webgl 2 methods
            { num : 20221, argTypes : [GLenum, GLint, GLenum, GLsizei, GLsizei, GLint, GLintptr], returnType : null },
            { num : 20222, argTypes : [GLenum, GLint, GLenum, GLsizei, GLsizei, GLint, GLimage, GLuint, GLuint] }
        ];
        if (args.length === 9) {
            return argTypes[2];
        } else if (isNumber(args[6])) {
            return argTypes[1];
        } else if (args.length > 0) {
            return argTypes[0];
        }
        return argTypes;
    },
    compressedTexSubImage2D :	function (...args) {
        //TODO miss webgl 2 methods
        //webgl 2 methods have optional parameters
        const argTypes = [
            { num : 10230, argTypes : [GLenum, GLint, GLint, GLint, GLsizei, GLsizei, GLenum, GLimage], returnType : null },
            //webgl 2 methods
            // [20231, GLenum, GLint, GLint, GLint, GLsizei, GLsizei, GLenum, GLimage],
            // [20232, GLenum, GLint, GLenum, GLsizei, GLsizei, GLint, GLimage, GLuint, GLuint]
        ];
        if (args.length === 8) {
            return argTypes[0];
        } else if (args.length > 0) {
            return argTypes[0];
        }
        return argTypes;
    },
    copyTexImage2D :	{ num : 1024, argTypes : [GLenum, GLint, GLenum, GLint, GLint, GLsizei, GLsizei, GLint], returnType : null },
    copyTexSubImage2D :	{ num : 1025, argTypes : [GLenum, GLint, GLint, GLint, GLint, GLint, GLint, GLsizei, GLsizei], returnType : null },
    createBuffer :	{ num : 1026, argTypes : [], returnType : GLref },
    createFramebuffer :	{ num : 10276, argTypes : [], returnType : GLref },
    createProgram :	{ num : 10286, argTypes : [], returnType : GLref },
    createRenderbuffer :	{ num : 10296, argTypes : [], returnType : GLref },
    createShader :	{ num : 1030, argTypes : [GLenum], returnType : GLref },
    createTexture :	{ num : 10316, argTypes : [], returnType : GLref },
    cullFace :	{ num : 1032, argTypes : [GLenum], returnType : null },
    deleteBuffer :	{ num : 1033, argTypes : [GLref], returnType : null },
    deleteFramebuffer :	{ num : 1034, argTypes : [GLref], returnType : null },
    deleteProgram :	{ num : 1035, argTypes : [GLref], returnType : null },
    deleteRenderbuffer :	{ num : 1036, argTypes : [GLref], returnType : null },
    deleteShader :	{ num : 1037, argTypes : [GLref], returnType : null },
    deleteTexture :	{ num : 1038, argTypes : [GLref], returnType : null },
    depthFunc :	{ num : 1039, argTypes : [GLenum], returnType : null },
    depthMask :	{ num : 1040, argTypes : [GLboolean], returnType : null },
    depthRange :	{ num : 1041, argTypes : [GLclampf, GLclampf], returnType : null },
    detachShader :	{ num : 1042, argTypes : [GLref, GLref], returnType : null },
    disable :	{ num : 1043, argTypes : [GLenum], returnType : null },
    disableVertexAttribArray :	{ num : 1044, argTypes : [GLlocation], returnType : null },
    drawArrays :	{ num : 1045, argTypes : [GLenum, GLint, GLsizei], returnType : null },
    drawElements :	{ num : 1046, argTypes : [GLenum, GLsizei, GLenum, GLintptr], returnType : null },
    enable :	{ num : 1047, argTypes : [GLenum], returnType : null },
    enableVertexAttribArray :	{ num : 1048, argTypes : [GLlocation], returnType : null },
    finish :	{ num : 1049, argTypes : [], returnType : null },
    flush :	{ num : 1050, argTypes : [], returnType : null },
    framebufferRenderbuffer :	{ num : 1051, argTypes : [GLenum, GLenum, GLenum, GLref], returnType : null },
    framebufferTexture2D :	{ num : 1052, argTypes : [GLenum, GLenum, GLenum, GLref, GLint], returnType : null },
    frontFace :	{ num : 1053, argTypes : [GLenum], returnType : null },
    generateMipmap :	{ num : 1054, argTypes : [GLenum], returnType : null },
    //doesn't need to record getXXX for playback
    // getActiveAttrib :	{ num : 1055, argTypes : [GLref, GLuint], returnType : null },
    // getActiveUniform :	{ num : 1056, argTypes : [GLref, GLuint], returnType : null },
    getAttachedShaders :	{ num : 1057, argTypes : [GLref], returnType : [GLref, GLref] },
    getAttribLocation :	{ num : 1058, argTypes : [GLref, GLstring], returnType : GLlocation },
    // getBufferParameter :	1059,
    // getContextAttributes :	1060,
    // getError :	1061,
    // getExtension :	1062,
    // getFramebufferAttachmentParameter :	1063,
    // getParameter :	1064,
    // getProgramInfoLog :	1065,
    // getProgramParameter :	1066,
    // getRenderbufferParameter :	1067,
    // getShaderInfoLog :	1068,
    // getShaderParameter :	1069,
    // getShaderPrecisionFormat :	1070,
    // getShaderSource :	1071,
    // getSupportedExtensions :	1072,
    // getTexParameter :	1073,
    // getUniform :	1074,
    getUniformLocation :	{ num : 1075, argTypes : [GLref, GLstring], returnType : GLref },
    // getVertexAttrib :	1076,
    // getVertexAttribOffset :	1077,
    hint :	{ num : 1078, argTypes : [GLenum, GLenum], returnType : null },
    //doesn't need isXXX for playback
    // isBuffer :	1079,
    // isContextLost :	1080,
    // isEnabled :	1081,
    // isFramebuffer :	1082,
    // isProgram :	1083,
    // isRenderbuffer :	1084,
    // isShader :	1085,
    // isTexture :	1086,
    lineWidth :	{ num : 1087, argTypes : [GLfloat], returnType : null },
    linkProgram :	{ num : 1088, argTypes : [GLref], returnType : null },
    pixelStorei :	{ num : 1089, argTypes : [GLenum, GLint], returnType : null },
    polygonOffset :	{ num : 1090, argTypes : [GLfloat, GLfloat], returnType : null },
    //doesn't need for playback
    // readPixels :	1091,
    renderbufferStorage :	{ num : 1092, argTypes : [GLenum, GLenum, GLsizei, GLsizei], returnType : null },
    sampleCoverage :	{ num : 1093, argTypes : [GLclampf, GLboolean], returnType : null },
    scissor :	{ num : 1094, argTypes : [GLint, GLint, GLsizei, GLsizei], returnType : null },
    shaderSource :	{ num : 1095, argTypes : [GLref, GLstring], returnType : null },
    stencilFunc :	{ num : 1096, argTypes : [GLenum, GLint, GLuint], returnType : null },
    stencilFuncSeparate :	{ num : 1097, argTypes : [GLenum, GLenum, GLint, GLuint], returnType : null },
    stencilMask :	{ num : 1098, argTypes : [GLuint], returnType : null },
    stencilMaskSeparate :	{ num : 1099, argTypes : [GLenum, GLuint], returnType : null },
    stencilOp :	{ num : 1100, argTypes : [GLenum, GLenum, GLenum], returnType : null },
    stencilOpSeparate :	{ num : 1101, argTypes : [GLenum, GLenum, GLenum, GLenum], returnType : null },
    texImage2D :	function (...args)  {
        //TODO 1102
        const argTypes = [
            { num : 11020, argTypes : [GLenum, GLint, GLenum, GLsizei, GLsizei, GLint, GLenum, GLenum, GLimage], returnType : null },
            { num : 11021, argTypes : [GLenum, GLint, GLenum, GLenum, GLenum, GLimage], returnType : null },
            //webgl 2 methods
            // [20231, GLenum, GLint, GLint, GLint, GLsizei, GLsizei, GLenum, GLimage],
            // [20232, GLenum, GLint, GLenum, GLsizei, GLsizei, GLint, GLimage, GLuint, GLuint]
        ];
        if (args.length === 9) {
            return argTypes[0];
        } else if (args.length > 0) {
            return argTypes[1];
        }
        return argTypes;
    },
    texParameterf : { num : 11030, argTypes : [GLenum, GLenum, GLfloat], returnType : null },
    texParameteri : { num : 11031, argTypes : [GLenum, GLenum, GLint], returnType : null },
    texSubImage2D :	function (...args)  {
        const argTypes = [
            { num : 11040, argTypes : [GLenum, GLint, GLint, GLint, GLsizei, GLsizei, GLenum, GLenum, GLimage], returnType : null },
            { num : 11041, argTypes : [GLenum, GLint, GLint, GLint, GLenum, GLenum, GLimage], returnType : null }
            //webgl 2 methods
            // [20231, GLenum, GLint, GLint, GLint, GLsizei, GLsizei, GLenum, GLimage],
            // [20232, GLenum, GLint, GLenum, GLsizei, GLsizei, GLint, GLimage, GLuint, GLuint]
        ];
        if (args.length === 9) {
            return argTypes[0];
        } else if (args.length > 0) {
            return argTypes[1];
        }
        return argTypes;
    },

    uniform1f : { num : 11050, argTypes : [GLref, GLfloat], returnType : null },
    uniform2f : { num : 11051, argTypes : [GLref, GLfloat, GLfloat], returnType : null },
    uniform3f : { num : 11052, argTypes : [GLref, GLfloat, GLfloat, GLfloat], returnType : null },
    uniform4f : { num : 11053, argTypes : [GLref, GLfloat, GLfloat, GLfloat, GLfloat], returnType : null },
    uniform1i : { num : 11054, argTypes : [GLref, GLint], returnType : null },
    uniform2i : { num : 11055, argTypes : [GLref, GLint, GLint], returnType : null },
    uniform3i : { num : 11056, argTypes : [GLref, GLint, GLint, GLint], returnType : null },
    uniform4i : { num : 11057, argTypes : [GLref, GLint, GLint, GLint, GLint], returnType : null },

    uniform1fv : { num : 11060, argTypes : [GLref, GLarraybuffer], returnType : null },
    uniform2fv : { num : 11061, argTypes : [GLref, GLarraybuffer], returnType : null },
    uniform3fv : { num : 11062, argTypes : [GLref, GLarraybuffer], returnType : null },
    uniform4fv : { num : 11063, argTypes : [GLref, GLarraybuffer], returnType : null },
    uniform1iv : { num : 11064, argTypes : [GLref, GLarraybuffer], returnType : null },
    uniform2iv : { num : 11065, argTypes : [GLref, GLarraybuffer], returnType : null },
    uniform3iv : { num : 11066, argTypes : [GLref, GLarraybuffer], returnType : null },
    uniform4iv : { num : 11067, argTypes : [GLref, GLarraybuffer], returnType : null },

    uniformMatrix2fv : { num : 11070, argTypes : [GLref, GLboolean, GLarraybuffer], returnType : null },
    uniformMatrix3fv : { num : 11071, argTypes : [GLref, GLboolean, GLarraybuffer], returnType : null },
    uniformMatrix4fv : { num : 11072, argTypes : [GLref, GLboolean, GLarraybuffer], returnType : null },

    useProgram : { num : 1108, argTypes : [GLref], returnType : null },
    // validateProgram :	1109,

    vertexAttrib1f : { num : 11100, argTypes : [GLlocation, GLfloat], returnType : null },
    vertexAttrib2f : { num : 11101, argTypes : [GLlocation, GLfloat, GLfloat], returnType : null },
    vertexAttrib3f : { num : 11102, argTypes : [GLlocation, GLfloat, GLfloat, GLfloat], returnType : null },
    vertexAttrib4f : { num : 11103, argTypes : [GLlocation, GLfloat, GLfloat, GLfloat, GLfloat], returnType : null },
    vertexAttrib1fv : { num : 11104, argTypes : [GLlocation, GLarraybuffer], returnType : null },
    vertexAttrib2fv : { num : 11105, argTypes : [GLlocation, GLarraybuffer], returnType : null },
    vertexAttrib3fv : { num : 11106, argTypes : [GLlocation, GLarraybuffer], returnType : null },
    vertexAttrib4fv : { num : 11107, argTypes : [GLlocation, GLarraybuffer], returnType : null },

    vertexAttribPointer : { num : 1111, argTypes : [GLlocation, GLint, GLenum, GLboolean, GLsizei, GLintptr], returnType : null },
    viewport : { num : 1112, argTypes : [GLint, GLint, GLsizei, GLsizei], returnType : null }
};

export const GLrefCreators = {
    'createBuffer' : 1,
    'createFramebuffer' : 1,
    'createProgram' : 1,
    'createRenderbuffer' : 1,
    'createShader' : 1,
    'createTexture' : 1,
    'getUniformLocation' : 1
};

export const GLlocationGetters = {
    'getAttribLocation' : 1
};
