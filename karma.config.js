const pkg = require('./package.json');

module.exports = function (config) {
    config.set({
        basePath : '.',
        frameworks: ['mocha', 'expect'],
        files: [
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
        singleRun :  false
    });
};
