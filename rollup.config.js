import babel from 'rollup-plugin-babel';

export default {
    input: 'src/index.js',
    output: [
        {
            format: 'umd',
            name: 'glbuffer',
            file: 'dist/buffer.gl.js'
        },
        {
            format: 'es',
            file: 'dist/buffer.gl.es.js'
        }
    ],
    plugins: [
        babel({
            exclude: 'node_modules/**'
        })
    ]
};
