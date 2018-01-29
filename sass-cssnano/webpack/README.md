# Sass Workflow Using cssnano and Autoprefixer (webpack)

This Sass preprocessor workflow uses cssnano for postprocessing minification and optimization that includes Autoprefixer to add vendor prefixes for only the browsers that need to be supported. Website: http://jimfrenette.com/2018/01/webpack-3-sass-cssnano-autoprefixer-workflow-2/

1. Requires [Node.js](https://nodejs.org "Node.js")

2. Download or clone this repsoitory.

3. Change directory to /uiCookbook/sass-cssnano/webpack

4. Run npm install from a bash terminal or command prompt. This will read the package.json file and install the dependencies into the sass-cssnano project folder.

```
npm install
```

- Finally, run npm run build to process the Sass into css and post process the css using cssnano

```
npm run build
```

After running npm run build, compare the optimized /dist/style.css file that was created from the sass and notice that the applicable vendor prefixes have been added.


Additional reading:

- [jimfrenette.com/2017/11/webpack-3-sass-cssnano-autoprefixer-workflow](http://jimfrenette.com/2017/11/webpack-3-sass-cssnano-autoprefixer-workflow/)
- [sass-lang.com](http://sass-lang.com "sass-lang.com")
- [cssnano.co](http://cssnano.co "cssnano.co/")
- [github.com/postcss/autoprefixer](https://github.com/postcss/autoprefixer)
- [github.com/webpack-contrib/sass-loader](https://github.com/webpack-contrib/sass-loader)
- [webpack.js.org](https://webpack.js.org/ "webpack.js.org/")
