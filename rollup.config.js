    export default {
        entry: 'dist/index.js',
        dest: 'dist/bundles/dragonly.umd.js',
        sourceMap: false,
        format: 'umd',
        moduleName: 'ng.dragonly',
        external: ['@angular/core'],
        onwarn: ( warning, next ) => {
            if ( warning.code === 'THIS_IS_UNDEFINED' ) return;
            next( warning );
        },
        globals: {
            '@angular/core': 'ng.core',
        }
    }