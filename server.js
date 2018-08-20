var http = require('http');
var fs = require('fs');
var router = require('router-stupid');
var harp = require('harp');
var moment = require('moment');
var Highlights = require('highlights');
var cheerio = require('cheerio');
var S = require('string');
var serveHandler = require('serve-handler');
var marked = require('marked');
var route = router();
var outputPath = __dirname + '/www';
var port = process.env.PORT || 9000;
var pkg = require('./package');

global.moment = moment;
global.highlighter = new Highlights();
global.cheerio = cheerio;
global.S = S;
global.marked = marked;
global.version = pkg.version.split('.').slice(0, 2).join('.');

function redirect(res, url) {
  res.writeHead(302, { location: url });
  res.end();
}

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

var server = function (root) {
  // use st module for static cached routing
  mount = st({
    path: root,
    url: '/',
    index: 'index.html', // server index.html for directories
    passthrough: true // pass through if not found, so we can send 404
  });
  console.log('compilation complete');
};

function run() {
  if (process.env.NODE_ENV === 'production') {
    var fourohfour = fs.readFileSync(outputPath + '/404.html');

    route.get('*', function (req, res, next) {
      serveHandler(req, res, {
        cleanUrls: true,
        public: outputPath,
        headers: [
          {
            "source" : "**/*.*",
            "headers" : [{
              "key" : "Cache-Control",
              "value" : "public, max-age=7200"
            }]
          }
        ],
      }, function sendError(absolutePath, response, acceptsJSON, current, handlers, config, error) {
        if (error.statusCode === 404) {
          res.writeHead(404);
          res.end(fourohfour);
        }
      });
    });

    http.createServer(route).listen(port);
    console.log('Running harp-static (production) on ' + port);
  } else {
    var normalizeDirectories = function (req, res, next) {
      req.url += '/';
      next();
    };

    route.get(/^\/(notes|logs|logs(\/(.*)+[^\/]$)|lab|projects|tags(\/(.*))?)$/, normalizeDirectories);

    route.all('*', harp.mount(__dirname));
    route.all('*', function (req, res, next) {
      req.url = '/404';
      harp.mount(__dirname)(req, res);
    });

    console.log('Running harp-static (development) on ' + port);
    http.createServer(route).listen(port);
  }
}

if (process.argv[2] === 'compile') {
  harp.compile(__dirname, outputPath, function(errors){
    if (errors) {
      console.log(JSON.stringify(errors, null, 2));
      process.exit(1);
    }

    process.exit(0);
  });
} else {
  run();
}
