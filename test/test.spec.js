import GLBufferWriter from "../src/gl-buffer-writer";
import GLBufferPlayer from "../src/gl-buffer-player";

function MockProgram() {

}

function MockShader() {

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
            var buffer = writer.addCommand('activeTexture', 0x84C0 /* gl.TEXTURE0 */).getBuffer();

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
    });
});
