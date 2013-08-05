var path = require('path');

var pattern = function(file) {
  return {pattern: file, included: true, served: true, watched: false};
};

var plugins = {
    'chai-as-promised': function(files) {
        files.push(pattern(require.resolve('chai-as-promised')));
    },
    'sinon-chai': function(files) {
        files.unshift(pattern(path.resolve(require.resolve('sinon'), '../../pkg/sinon.js')));
        files.push(pattern(require.resolve('sinon-chai')));
    },
    'chai-jquery': function(files) {
        files.push(pattern(require.resolve('chai-jquery')));
    };
};

var $inject = ['config.files'];
var exports = {};
var name, plugin;

for (name in plugins) {
    plugin = plugins[name];
    plugin.$inject = $inject;

    exports['framework:' + name] = ['factory', plugin];
}

module.exports = exports;