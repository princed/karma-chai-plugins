karma-chai-plugins
==================

> [Chai](http://chaijs.com) browser plugins set for [Karma](http://karma-runner.github.io)


Requirements
------------

This module currently requires the `canary` version of Karma:

```sh
$ npm install 'karma@canary' --save-dev
```

Note that the Karma configuration file format has changed since `v0.8`. Use 
`karma init` to generate a fresh config.


Installation
------------

Install the `karma-chai` from Github:

```sh
$ npm install 'git+https://github.com/xdissent/karma-chai.git' --save-dev
```

Install the `karma-chai-plugins`:

```sh
$ npm install karma-chai-plugins --save-dev
```

Add `chai` and plugins you need to the `frameworks` key in your Karma configuration:

```coffee
module.exports = (karma) ->
  karma.configure

    # frameworks to use
    frameworks: ['mocha', 'chai', 'chai-as-promised']

    # ...
```

Bundled plugins
---------------

* chai-as-promised
* chai-jquery (you need to include your copy of jQuery)
* sinon-chai (sinon includes automatically)

Additional features
-------------------

`chai-as-promised` plugin also provides global `expectDeferred` function that allows to test ‘jQuery-style promises’ as other promsises implementation.

```coffee
expectDeferred(somePromise).to.become(someValue)
```
