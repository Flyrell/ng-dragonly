export default {
    entry: 'dist/index.js',
    dest: 'dist/bundles/dragonly.umd.js',
    sourceMap: false,
    format: 'umd',
    moduleName: 'ng.dragonly',
    external: ['@angular/core'],
    globals: {
        '@angular/core': 'ng.core',
    }
}