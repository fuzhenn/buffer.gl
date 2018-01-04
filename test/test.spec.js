import GLBufferWriter from "../src/gl-buffer-writer";
import GLBufferPlayer from "../src/gl-buffer-player";
import { UID } from "../src/common/misc";
// import { MockProgram, MockShader, MockBuffer } from './mocks';

function MockProgram() {

}

function MockShader() {

}

function MockBuffer() {

}

function MockUniformLocation() {

}

function assertCommand(command, name, args, result) {
    expect(command.name).to.be.eql(name);
    expect(command.args).to.be.eql(args);
    if (result) {
        expect(command.ref).to.be.eql(result);
    } else {
        expect(command.ref).not.to.be.ok();
    }
}

describe('GL Buffer specs', function () {
    it('should create a writer', function () {
        var writer = new GLBufferWriter({ debug : true });
        expect(writer).to.be.ok();
    });

    it('should create a player', function () {
        var player = new GLBufferPlayer();
        expect(player).to.be.ok();
    });

    context('gl commands', function () {
        it('should support normal methods', function () {
            var writer = new GLBufferWriter({ debug : true });
            var bufferData = writer
                .addCommand('activeTexture', 0x84C0 /* gl.TEXTURE0 */)
                .getBuffer();

            var player = new GLBufferPlayer();
            player.addBuffer(bufferData);
            var commands = player.getCommands();
            expect(commands.length).to.be.eql(1);

            assertCommand(commands[0], 'activeTexture', [0x84C0]);
        });

        it('should support methods with reference arguments', function () {
            var writer = new GLBufferWriter({ debug : true });
            var program = new MockProgram();
            var shader = new MockShader();
            var bufferData = writer
                .addCommand('createProgram', program)
                .addCommand('createShader', 0x8B31 /* gl.VERTEX_SHADER */, shader)
                .addCommand('attachShader', program, shader)
                .getBuffer();

            var player = new GLBufferPlayer();
            player.addBuffer(bufferData);
            var commands = player.getCommands();
            expect(commands.length).to.be.eql(3);

            assertCommand(commands[0], 'createProgram', [], '1');
            assertCommand(commands[1], 'createShader', [0x8B31], '2');
            assertCommand(commands[2], 'attachShader', [1, 2]);
        });

        it('should support methods with attribute location', function () {
            var uid = UID();
            var positionLocation = 1;
            var writer = new GLBufferWriter({ debug : true, refPrefix : 'prefix-' });
            var program = new MockProgram();
            var buffer = new MockBuffer();
            var bufferData = writer
                .addCommand('createProgram', program)
                .addCommand('createBuffer', buffer)
                .addCommand('bindBuffer', 0x8892 /* gl.ArrayBuffer */, buffer)
                .addCommand('bufferData', 0x8892, new Float32Array([1.0, 2.0, 3.0]), 0x88E4/* gl.STATIC_DRAW */)
                .addCommand('getAttribLocation', program, 'a_position', positionLocation)
                .addCommand('enableVertexAttribArray', positionLocation)
                .addCommand('vertexAttribPointer', positionLocation, 4, 0x1406/* gl.FLOAT */,
                    false, 0, 0)
                .getBuffer();


            var player = new GLBufferPlayer();
            player.addBuffer(bufferData);
            var commands = player.getCommands();
            expect(commands.length).to.be.eql(7);
            var command;

            assertCommand(commands[0], 'createProgram', [], 'prefix-' + (uid + 1));
            assertCommand(commands[1], 'createBuffer', [], 'prefix-' + (uid + 2));
            assertCommand(commands[2], 'bindBuffer', [0x8892, 'prefix-' + (uid + 2)]);
            assertCommand(commands[3], 'bufferData', [0x8892, new Float32Array([1.0, 2.0, 3.0]), 0x88E4]);
            assertCommand(commands[4], 'getAttribLocation', ['prefix-' + (uid + 1), 'a_position'], 'prefix-' + positionLocation);
            assertCommand(commands[5], 'enableVertexAttribArray', ['prefix-' + positionLocation]);
            assertCommand(commands[6], 'vertexAttribPointer', ['prefix-' + positionLocation, 4, 0x1406/* gl.FLOAT */, false, 0, 0]);
        });

        it('should support methods with uniform location', function () {
            var uid = UID();
            var positionLocation = 1;
            var writer = new GLBufferWriter({ debug : true, refPrefix : 'prefix-' });
            var program = new MockProgram();
            var uniformLoc = new MockUniformLocation();
            var bufferData = writer
                .addCommand('createProgram', program)
                .addCommand('getUniformLocation', program, 'u_matrix', uniformLoc)
                .getBuffer();

            var player = new GLBufferPlayer();
            player.addBuffer(bufferData);
            var commands = player.getCommands();
            expect(commands.length).to.be.eql(2);

            assertCommand(commands[0], 'createProgram', [], 'prefix-' + (uid + 1));
            assertCommand(commands[1], 'getUniformLocation', ['prefix-' + (uid + 1), 'u_matrix'], 'prefix-' + (uid + 2));
        });
    });
});
