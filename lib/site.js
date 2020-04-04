const harp = require('./harp');
const moment = require('moment');
const serveHandler = require('serve-handler');
const path = require('path');

// All time in UTC
global.moment = moment.utc;
global.ifDef = function (value, fallbackValue) {
  return typeof value === 'undefined' ? fallbackValue : value;
}

function redirect(res, url, permanent) {
  res.writeHead(
    permanent === false ? 302 : 301,
    { location: url }
  );

  res.end();
}

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
          'source': '**/*.*',
          'headers': [{
            'key': 'Cache-Control',
            'value': 'public, max-age=7200'
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

exports.redirects = function (route) {
  route.all('/hire-me', function (req, res) {
    redirect(res, '/about');
  });

  route.all('/wp-content/uploads/{year}/{month}/{filename}', function (req, res, next) {
    redirect(res, '/images/' + req.params.filename);
  });

  route.all('/writing/{post_name}?', function (req, res, next) {
    var url = '';

    if (req.params.post_name) {
      url = '/notes/' + req.params.post_name;
    }

    redirect(res, url);
  });
}
