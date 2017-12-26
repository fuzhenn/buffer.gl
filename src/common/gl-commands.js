import {
    Ref,
    Location,
    GLenum ,
    GLboolean,
    GLbitfield ,
    GLbyte,
    GLshort ,
    GLint ,
    GLsizei ,
    GLintptr ,
    GLsizeiptr ,
    GLubyte ,
    GLushort ,
    GLuint ,
    GLfloat,
    GLclampf,
    GLstring,
    GLarraybuffer
} from './gl-types';
// method tables
export const GLcommands = {
    activeTexture :	[1000, GLenum],
    attachShader :	[1001, Ref, Ref],
    bindAttribLocation :	[1002, Location, GLuint, GLstring],
    bindBuffer :	[1003, GLenum, Ref],
    bindFramebuffer :	[1004, GLenum, Ref],
    bindRenderbuffer :	[1005, GLenum, Ref],
    bindTexture :	[1006, GLenum, Ref],
    blendColor :	[1007, GLclampf, GLclampf, GLclampf, GLclampf],
    blendEquation :	[1008, GLenum],
    blendEquationSeparate :	[1009, GLenum, GLenum],
    blendFunc :	[1010, GLenum, GLenum],
    blendFuncSeparate :	[1011, GLenum, GLenum, GLenum, GLenum],
    bufferData : function (...args) {
        const argTypes = [
            [10120, GLenum, GLsizeiptr, GLenum],
            [10122, GLenum, GLarraybuffer, GLenum, GLuint, GLuint],
            [10121, GLenum, GLarraybuffer, GLenum]
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
            [10130, GLenum, GLintptr, GLarraybuffer],
            //a webgl 2 method
            [20131, GLenum, GLintptr, GLarraybuffer, GLuint, GLuint]
        ];
        if (args.length === 3) {
            return argTypes[0];
        } else if (args.length > 0) {
            return argTypes[1];
        }
        return argTypes;
    },
    checkFramebufferStatus :	[1014, GLenum],
    clear :	[1015, GLbitfield],
    clearColor :	[1016, GLclampf, GLclampf, GLclampf, GLclampf],
    clearDepth :	[1017, GLclampf],
    clearStencil :	[1018, GLint],
    colorMask :	[1019, GLclampf, GLclampf, GLclampf, GLclampf],
    commit :	[1020],
    compileShader :	[1021, Ref],
    compressedTexImage2D :	function (...args) {
        const argTypes = [
            [10220, GLenum, GLint, GLenum, GLsizei, GLsizei, GLint, GLarraybuffer],
            //webgl 2 methods
            [20221, GLenum, GLint, GLenum, GLsizei, GLsizei, GLint, GLintptr],
            [20222, GLenum, GLint, GLenum, GLsizei, GLsizei, GLint, GLarraybuffer, GLuint, GLuint]
        ];
        if (args.length === 9) {
            return argTypes[2];
        } else if (isNumber(args[6])) {
            return argTypes[1];
        } else if (args.length > 0) {
            return args[0];
        }
        return argTypes;
    },
    compressedTexSubImage2D :	function (...args) {
        //TODO
        const argTypes = [
            [10230, GLenum, GLint, GLenum, GLsizei, GLsizei, GLint, GLarraybuffer],
            //webgl 2 methods
            [20231, GLenum, GLint, GLenum, GLsizei, GLsizei, GLint, GLintptr],
            [20232, GLenum, GLint, GLenum, GLsizei, GLsizei, GLint, GLarraybuffer, GLuint, GLuint]
        ];
        if (args.length === 9) {
            return argTypes[2];
        } else if (isNumber(args[6])) {
            return argTypes[1];
        } else if (args.length > 0) {
            return args[0];
        }
        return argTypes;
    },
    //TODO 第二个参数确定是GLint而不是GLenum吗
    copyTexImage2D :	[1024, GLenum, GLint, GLint, GLint, GLint, GLsizei, GLsizei, GLint],
    copyTexSubImage2D :	[1025, GLenum, GLint, GLint, GLint, GLint, GLint, GLint, GLsizei, GLsizei],
    createBuffer :	[1026],
    createFramebuffer :	[1027],
    createProgram :	[1028],
    createRenderbuffer :	[1029],
    createShader :	[1030, GLenum],
    createTexture :	[1031],
    cullFace :	[1032, GLenum],
    deleteBuffer :	[1033, Ref],
    deleteFramebuffer :	[1034, Ref],
    deleteProgram :	[1035, Ref],
    deleteRenderbuffer :	[1036, Ref],
    deleteShader :	[1037, Ref],
    deleteTexture :	[1038, Ref],
    depthFunc :	[1039, GLenum],
    depthMask :	[1040, GLboolean],
    depthRange :	[1041, GLclampf, GLclampf],
    detachShader :	[1042, Ref, Ref],
    disable :	[1043, GLenum],
    disableVertexAttribArray :	[1044, Location],
    drawArrays :	[1045, GLenum, GLint, GLsizei],
    drawElements :	[1046, GLenum, GLsizei, GLenum, GLintptr],
    enable :	[1047, GLenum],
    enableVertexAttribArray :	[1048, Location],
    finish :	[1049],
    flush :	[1050],
    framebufferRenderbuffer :	[1051, GLenum, GLenum, GLenum, Ref],
    framebufferTexture2D :	[1052, GLenum, GLenum, GLenum, Ref, GLint],
    frontFace :	[1053, GLenum],
    generateMipmap :	[1054, GLenum],
    //doesn't need to record getXXX for playback
    // getActiveAttrib :	[1055, Ref, GLuint],
    // getActiveUniform :	[1056, Ref, GLuint],
    // getAttachedShaders :	[1057, Ref],
    getAttribLocation :	[1058, Ref, GLstring],
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
    getUniformLocation :	[1075, Ref, GLstring],
    // getVertexAttrib :	1076,
    // getVertexAttribOffset :	1077,
    hint :	[1078, GLenum, GLenum],
    //doesn't need isXXX for playback
    // isBuffer :	1079,
    // isContextLost :	1080,
    // isEnabled :	1081,
    // isFramebuffer :	1082,
    // isProgram :	1083,
    // isRenderbuffer :	1084,
    // isShader :	1085,
    // isTexture :	1086,
    lineWidth :	[1087, GLfloat],
    linkProgram :	[1088, Ref],
    pixelStorei :	[1089, GLenum, GLint],
    polygonOffset :	[1090, GLfloat, GLfloat],
    //doesn't need for playback
    // readPixels :	1091,
    renderbufferStorage :	[1092, GLenum, GLenum, GLsizei, GLsizei],
    sampleCoverage :	[1093, GLclampf, GLboolean],
    scissor :	[1094, GLint, GLint, GLsizei, GLsizei],
    shaderSource :	[1095, Ref, GLstring],
    stencilFunc :	[1096, GLenum, GLint, GLuint],
    stencilFuncSeparate :	[1097, GLenum, GLenum, GLint, GLuint],
    stencilMask :	[1098, GLuint],
    stencilMaskSeparate :	[1099, GLenum, GLuint],
    stencilOp :	[1100, GLenum, GLenum, GLenum],
    stencilOpSeparate :	[1101, GLenum, GLenum, GLenum, GLenum],
    texImage2D :	function (...args)  {
        //TODO 1102
    },
    texParameterf :	[11030, GLenum, GLenum, GLfloat],
    texParameteri :	[11031, GLenum, GLenum, GLint],
    texSubImage2D :	function (...args)  {
        //TODO 1104
    },

    uniform1f :	[11050, Ref, GLfloat],
    uniform2f :	[11051, Ref, GLfloat, GLfloat],
    uniform3f :	[11052, Ref, GLfloat, GLfloat, GLfloat],
    uniform4f :	[11053, Ref, GLfloat, GLfloat, GLfloat, GLfloat],
    uniform1i :	[11054, Ref, GLint],
    uniform2i :	[11055, Ref, GLint, GLint],
    uniform3i :	[11056, Ref, GLint, GLint, GLint],
    uniform4i :	[11057, Ref, GLint, GLint, GLint, GLint],

    uniform1fv : [11060, Ref, GLarraybuffer],
    uniform2fv : [11061, Ref, GLarraybuffer],
    uniform3fv : [11062, Ref, GLarraybuffer],
    uniform4fv : [11063, Ref, GLarraybuffer],
    uniform1iv : [11064, Ref, GLarraybuffer],
    uniform2iv : [11065, Ref, GLarraybuffer],
    uniform3iv : [11066, Ref, GLarraybuffer],
    uniform4iv : [11067, Ref, GLarraybuffer],

    uniformMatrix2fv : [11070, Ref, GLboolean, GLarraybuffer],
    uniformMatrix3fv : [11071, Ref, GLboolean, GLarraybuffer],
    uniformMatrix4fv : [11072, Ref, GLboolean, GLarraybuffer],

    useProgram :	[1108, Ref],
    // validateProgram :	1109, 

    vertexAttrib1f :	[11100, Location, GLfloat],
    vertexAttrib2f :	[11101, Location, GLfloat, GLfloat],
    vertexAttrib3f :	[11102, Location, GLfloat, GLfloat, GLfloat],
    vertexAttrib4f :	[11103, Location, GLfloat, GLfloat, GLfloat, GLfloat],
    vertexAttrib1fv : [11104, Location, GLarraybuffer],
    vertexAttrib2fv : [11105, Location, GLarraybuffer],
    vertexAttrib3fv : [11106, Location, GLarraybuffer],
    vertexAttrib4fv : [11107, Location, GLarraybuffer],

    vertexAttribPointer :	[1111, Location, GLint, GLenum, GLboolean, GLsizei, GLintptr],
    viewport :	[1112, GLint, GLint, GLsizei, GLsizei]
};

export const refCreators = {
    'createBuffer' : 1,
    'createFramebuffer' : 1,
    'createProgram' : 1,
    'createRenderbuffer' : 1,
    'createShader' : 1,
    'createTexture' : 1,
    'getUniformLocation' : 1
};

export const locationGetters = {
    'getAttribLocation' : Location
};
