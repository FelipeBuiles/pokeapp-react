var dist, ghpages, handle_error, path;

ghpages = require('gh-pages');

path = require('path');

handle_error = function(error) {
  if (error) {
    console.error(error);
    return process.exit(error.code || 1);
  }
};

dist = path.join(__dirname, '..', 'dist');

ghpages.publish(dist, handle_error);