/**
 * RequireJS Optimizer build config
 * run node command:
 * node node_modules/requirejs/bin/r.js -o require.build.js
 * js/build.txt is a generated list of built modules
*/

({
    baseUrl: './src/js',
    dir: './js',
    modules: [
        {
            name: 'main'
        }
    ],
    fileExclusionRegExp: /^(r|require.build)\.js$/,
    removeCombined: true,
    paths: {
        async: 'require/async'
    },
    preserveLicenseComments: false
})