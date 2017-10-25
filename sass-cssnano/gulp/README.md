# Sass Workflow Using cssnano and Autoprefixer (gulp)

This Sass preprocessor workflow uses cssnano for postprocessing minification and optimization that includes Autoprefixer to add vendor prefixes for only the browsers that need to be supported. Website: http://jimfrenette.com/2016/02/sass-cssnano-autoprefixer/


1. Requires [Node.js](https://nodejs.org "Node.js")

2. Download or clone this repsoitory.

3. Change directory to /uiCookbook/sass-cssnano/gulp

4. Run npm install from a bash terminal or command prompt. This will read the package.json file and install the dependencies into the sass-cssnano project folder.

```
npm install
```

- Finally, run gulp css to process the Sass into css and post process the css using cssnano

```
gulp css
```

After running gulp css, compare the optimized /css/main.css file that was created from the sass and notice that the applicable vendor prefixes have been added.


Additional reading:

- [sass-lang.com](http://sass-lang.com "sass-lang.com")
- [cssnano.co](http://cssnano.co "cssnano.co/")
- [github.com/postcss/autoprefixer](https://github.com/postcss/autoprefixer)
- [gulpjs.com](http://gulpjs.com "gulpjs.com/")
