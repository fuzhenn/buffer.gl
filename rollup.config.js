import babel from 'rollup-plugin-babel';

export default {
    input: 'src/index.js',
    output: [
        {
            format: 'umd',
            name: 'glbuffer',
            file: 'dist/gl-buffer.js'
        },
        {
            format: 'es',
            file: 'dist/gl-buffer.es.js'
        }
    ],
    plugins: [
        babel({
            exclude: 'node_modules/**'
        })
    ]
};
