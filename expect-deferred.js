  // Duct tape for jQuery promises
  window.expectDeferred = function(deferred) {
    if ('pipe' in deferred) {
      delete deferred.pipe;
    }

    return expect(deferred);
  };