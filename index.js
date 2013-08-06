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
    }
};

var $inject = ['config.files'];
var exports = {};
var label, plugin;

for (label in plugins) {
    plugin = plugins[label];
    plugin.$inject = $inject;

    exports['framework:' + label] = ['factory', plugin];
}

module.exports = exports;
                                                                                           git