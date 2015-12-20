# Easy Browsersync Server

This code includes an HTML 5 Template with a NPM package config to install a minimal set of development tools including a Browsersync server and Gulp task runner. A gulp server command loads the html 5 template in a browser using Browsersync. Any edits made to the html or sass (scss) files are processed instantly and reloaded into the browser.


1. Requires [Node.js](https://nodejs.org "Node.js")

2. Download or clone this repsoitory.

3. Change directory to /uiCookbook/easybs

4. Run npm install from a bash terminal or command prompt. This will read the package.json file and install the dependencies into the easybs project.

```
npm install
```

- Finally, run gulp server to load the index.html file in a web browser 

```
gulp server
```

The gulp server task is configured so that any edits to the html are reloaded in the browser instantly. Any edits to scss files are processed into the css file and injected instantly into the browser.

Additional reading:

- [browsersync.io](http://www.browsersync.io/ "browsersync.io")
- [gulpjs.com/](http://gulpjs.com/ "gulpjs.com/")
- [sass-lang.com/](http://sass-lang.com/ "sass-lang.com/")