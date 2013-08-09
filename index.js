var path = require('path');

// TODO Do not expect require to be included before plugins
var requireUsed = function(files) {
    if (files) {
        for (var i = files.length, pattern; i > 0; i--) {
            pattern = files[i] && files[i].pattern;

            if (typeof pattern === 'string' && pattern.indexOf('/karma-requirejs/') !== -1) {
                return true;
            }
        }
    }

    return false;
};

var pattern = function(file, files) {
    return {pattern: file, included: !requireUsed(files), served: true, watched: false};
};

var plugins = {
    'chai': function(files) {
        if(!requireUsed(files)) {
            files.unshift(pattern(path.join(__dirname, 'chai-adapter.js')));
        }
        files.unshift(pattern(path.resolve(require.resolve('chai'), '../chai.js'), files));
    },
    'chai-as-promised': function(files) {
        files.unshift(pattern(path.join(__dirname, 'expect-deferred.js')));
        files.push(pattern(require.resolve('chai-as-promised'), files));
    },
    'sinon-chai': function(files) {
        files.unshift(pattern(path.resolve(require.resolve('sinon'), '../../pkg/sinon.js')));
        files.push(pattern(require.resolve('sinon-chai'), files));
    },
    'chai-jquery': function(files) {
        files.push(pattern(require.resolve('chai-jquery'), files));
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