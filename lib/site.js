const harp = require('./harp');
const moment = require('moment');
const pkg = require('./../package');
const serveHandler = require('serve-handler');
const path = require('path');

global.moment = moment;
global.version = pkg.version.split('.').slice(0, 2).join('.');

exports.compile = function (root) {
  harp.compile(root, root + '/dist', function (errors) {
    if (errors) {
      console.log(JSON.stringify(errors, null, 2));
      process.exit(1);
    }

    process.exit(0);
  });
}

exports.production = function (route, root) {
  route.all('*', function (req, res, next) {
    serveHandler(req, res, {
        cleanUrls: true,
        directoryListing: false,
        public: path.resolve(root + '/dist'),
        headers: [
        {
            'source' : '**/*.*',
            'headers' : [{
            'key' : 'Cache-Control',
            'value' : 'public, max-age=7200'
            }]
        }
        ],
    });
  });
};

exports.development = function (route, root) {
  var normalizeDirectories = function (req, res, next) {
    req.url += '/';
    next();
  };

  var directoriesPattern = [
    'images',
    'notes',
    'tags'
  ].join('|');

  route.get(
    new RegExp('^\/(' + directoriesPattern + '?)$'),
    normalizeDirectories
  );

  route.all('*', harp.mount(root));
  route.all('*', function (req, res) {
    req.url = '/404';
    harp.mount(root)(req, res);
  });
}