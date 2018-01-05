const pkg = require('./package.json');

module.exports = function (config) {
    config.set({
        basePath : '.',
        frameworks: ['mocha', 'expect'],
        files: [
            { pattern : 'src/**/*.js', included : false, watched : true },
            'test/**/*.js'
        ],
        preprocessors: {
            'test/**/*.spec.js': ['rollup']
        },
        rollupPreprocessor: {
            format: 'umd',
            name: 'glbuffer',
            sourcemap: 'inline',
            sourceMap: 'inline'
        },
        browsers: ['Chrome'],
        reporters: ['mocha'],
        singleRun :  true
    });
};
