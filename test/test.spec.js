import GLBufferWriter from "../src/gl-buffer-writer";

describe('GL Buffer specs', function () {
    it('1', function () {
        var writer = new GLBufferWriter({ debug : true });
        expect(writer).to.be.ok();
    });
});