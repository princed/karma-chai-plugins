karma-chai-plugins
==================

> [Chai](http://chaijs.com) browser plugins set for [Karma](http://karma-runner.github.io)

[![Dependency Status](https://gemnasium.com/princed/karma-chai-plugins.svg)](https://gemnasium.com/princed/karma-chai-plugins)

Installation
------------

Install the `karma-chai-plugins`:

```sh
$ npm install karma-chai-plugins --save-dev
```

Add `chai` and plugins you need to the `frameworks` key in your Karma configuration:

```coffee
module.exports = (config) ->
  config.set

    # frameworks to use
    frameworks: ['mocha', 'chai', 'chai-as-promised']

    # ...
```

Bundled plugins
---------------

* [chai](http://chaijs.com)
* [chai-as-promised](http://chaijs.com/plugins/chai-as-promised)
* [chai-jquery](http://chaijs.com/plugins/chai-jquery) (jQuery should be included manually)
* [sinon-chai](http://chaijs.com/plugins/sinon-chai) (sinon will be included automatically)
* [chai-things](http://chaijs.com/plugins/chai-things)

Browser support
---------------

Same as [Chai.js](http://chaijs.com/guide/installation/#browser-section): IE 9+, Chrome 7+, FireFox 4+, Safari 5+ except `should` style that is currently not compatible with IE 9.

Consider [karma-expect](https://github.com/princed/karma-expect), if you need run tests in IE8 and lower.

#### Fair Warning

Currently, in order to use Chai-as-Promised when running tests within PhantomJS, a polyfill for `Function.prototype.bind` must be supplied.  This plugin includes such a polyfill.  If your code under test is intended to be run under PhantomJS *in production*, bear this in mind!  **You may need to supply your *own* polyfill in your project.**  

*The `Function.prototype.bind` polyfill will be removed in the future v1.0 release of karma-chai-plugins.*

Limited require.js support
--------------------------

`karma-chai-plugins` supports `requirejs` in tests, but for now it should be stated in frameworks before `chai` and other plugins:

```coffee
module.exports = (config) ->
  config.set

    # frameworks to use
    frameworks: ['mocha', 'requirejs', 'chai', 'chai-as-promised']

    # ...
```
