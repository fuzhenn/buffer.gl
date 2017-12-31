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
            var buffer = writer
                .addCommand('activeTexture', 0x84C0 /* gl.TEXTURE0 */)
                .getBuffer();

            var player = new GLBufferPlayer();
            player.addBuffer(buffer);
            var commands = player.getCommands();
            expect(commands.length).to.be.eql(1);
            var command = commands[0];
            expect(command.name).to.be.eql('activeTexture');
            expect(command.args).to.be.eql([0x84C0]);
        });

        it('should support methods with reference arguments', function () {
            var writer = new GLBufferWriter({ debug : true });
            var program = new MockProgram();
            var shader = new MockShader();
            var buffer = writer
                .addCommand('createProgram', program)
                .addCommand('createShader', 0x8B31 /* gl.VERTEX_SHADER */, shader)
                .addCommand('attachShader', program, shader)
                .getBuffer();

            var player = new GLBufferPlayer();
            player.addBuffer(buffer);
            var commands = player.getCommands();
            expect(commands.length).to.be.eql(3);
            var command = commands[0];
            expect(command.name).to.be.eql('createProgram');
            expect(command.args).to.be.eql([]);

            command = commands[1];
            expect(command.name).to.be.eql('createShader');
            expect(command.args).to.be.eql([0x8B31]);

            command = commands[2];
            expect(command.name).to.be.eql('attachShader');
            expect(command.args).to.be.eql([1, 2]);
        });

        it('should support methods with attribute location', function () {
            var uid = UID();
            var positionLocation = 1;
            var writer = new GLBufferWriter({ debug : true, refPrefix : 'prefix-' });
            var program = new MockProgram();
            var buffer = new MockBuffer();
            var buffer = writer
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
            player.addBuffer(buffer);
            var commands = player.getCommands();
            expect(commands.length).to.be.eql(7);

            var command = commands[0];
            expect(command.name).to.be.eql('createProgram');
            expect(command.args).to.be.eql([]);
            expect(command.ref).to.be.eql('prefix-' + (uid + 1));

            command = commands[1];
            expect(command.name).to.be.eql('createBuffer');
            expect(command.args).to.be.eql([]);
            expect(command.ref).to.be.eql('prefix-' + (uid + 2));

            command = commands[2];
            expect(command.name).to.be.eql('bindBuffer');
            expect(command.args).to.be.eql([0x8892, 'prefix-' + (uid + 2)]);

            command = commands[3];
            expect(command.name).to.be.eql('bufferData');
            expect(command.args).to.be.eql([0x8892, new Float32Array([1.0, 2.0, 3.0]), 0x88E4]);

            command = commands[4];
            expect(command.name).to.be.eql('getAttribLocation');
            expect(command.args).to.be.eql(['prefix-' + (uid + 1), 'a_position']);
            expect(command.ref).to.be.eql('prefix-' + positionLocation);

            command = commands[5];
            expect(command.name).to.be.eql('enableVertexAttribArray');
            expect(command.args).to.be.eql(['prefix-' + positionLocation]);

            command = commands[6];
            expect(command.name).to.be.eql('vertexAttribPointer');
            expect(command.args).to.be.eql(['prefix-' + positionLocation, 4, 0x1406/* gl.FLOAT */, false, 0, 0]);

        });
    });
});
