var path = require('path');
var fs = require('fs');

// TODO Do not expect require to be included before plugins
function requireUsed(files) {
  if (files) {
    var filePattern;

    for (var i = files.length; i > 0; i--) {
      filePattern = files[i] && files[i].pattern;

      if (typeof filePattern === 'string' && (filePattern.indexOf('\\karma-requirejs\\') !== -1 || filePattern.indexOf('/karma-requirejs/') !== -1)) {
        return true;
      }
      if (typeof filePattern === 'string' && (filePattern.indexOf('\\karma-cajon\\') !== -1 || filePattern.indexOf('/karma-cajon/') !== -1)) {
        return true;
      }
    }
  }

  return false;
}

function pattern(file, exclude) {
  return {pattern: file, included: !exclude, served: true, watched: false};
}

function requireAdapter(plugin, filePath, files, use) {
  var name = path.join(__dirname, '_' + plugin + '-require-adapter.js');
  filePath = path.resolve(filePath).replace(/\.js$/, '');

  // Fix path in windows environment
  filePath = filePath.split('\\').join('/');

  var content = 'requirejs.config({\n' +
      '  "paths": {\n' +
      '    "' + plugin + '": "/absolute' + filePath + '"\n' +
      '  }\n' +
      '});\n\n';
  if (use) {
    content += 'require(["chai", "' + plugin + '"], function(chai, plugin){\n' +
    '    chai.use(plugin);\n' +
    '});';
  } else {
    content += 'require(["chai"], function(chai){\n' +
    '    chai.should();\n' +
    '});';
  }

  fs.writeFileSync(name, content);

  files.push(pattern(name));
}

var frameworks = {
  'chai': function (name, files) {
    var filePath = path.resolve(require.resolve('chai'), '../chai.js');
    var required = requireUsed(files);

    // RequireJS environment also need chai-adapter, as in most other karma-chai-*
    files.unshift(pattern(path.join(__dirname, 'chai-adapter.js')));
    if (required) {
      requireAdapter(name, filePath, files);
    }

    files.unshift(pattern(filePath));
  },
  'chai-as-promised': function (name, files) {
    var filePath = require.resolve(name);
    var required = requireUsed(files);

    if (!required) {
      files.unshift(pattern(path.join(__dirname, 'function-bind-polyfill.js')));
    } else {
      requireAdapter(name, filePath, files, true);
    }

    files.push(pattern(filePath, required));
  },
  'sinon-chai': function (name, files) {
    var filePath = require.resolve(name);
    var required = requireUsed(files);

    if (required) {
      requireAdapter(name, filePath, files, true);
    }

    files.push(pattern(filePath, required));
    files.unshift(pattern(path.resolve(require.resolve('sinon'), '../../pkg/sinon.js')));
  },
  'chai-dom': function (name, files) {
    var filePath = require.resolve(name);
    var required = requireUsed(files);

    if (required) {
      requireAdapter(name, filePath, files, true);
    }

    files.push(pattern(filePath, required));
  },
  'chai-jquery': function (name, files) {
    var filePath = require.resolve(name);
    var required = requireUsed(files);

    if (required) {
      requireAdapter(name, filePath, files, true);
    }

    files.push(pattern(filePath, required));
  },
  'chai-things': function (name, files) {
    var filePath = require.resolve(name);
    var required = requireUsed(files);

    if (required) {
      requireAdapter(name, filePath, files, true);
    }

    files.push(pattern(filePath, required));
  }
};

function generateInjects(plugins) {
  var $inject = ['config.files'];
  var exports = {};
  var plugin;

  for (var label in plugins) {
    plugin = plugins[label].bind(null, label);
    plugin.$inject = $inject;

    exports['framework:' + label] = ['factory', plugin];
  }

  return exports;
}

module.exports = generateInjects(frameworks);
