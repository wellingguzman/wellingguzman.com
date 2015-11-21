var http = require('http');
var fs = require('fs');
var router = require('router-stupid');
var harp = require ('harp');
var moment = require('moment');
var Highlights = require('highlights');
var cheerio = require('cheerio');
var S = require('string');
var glob = require('glob');
var st = require('st');

var mount;
var route = router();
var outputPath = __dirname + '/www';
var port = process.env.PORT || 9000;
var pkg = require('./package');

global.moment = moment;
global.highlighter = new Highlights();
global.cheerio = cheerio;
global.S = S;
global.version = pkg.version.split('.').slice(0, 2).join('.');

route.all('/wp-content/uploads/{year}/{month}/{filename}', function (req, res, next) {
  res.writeHead(302, { 'location': '/images/' + req.params.filename });
  res.end();
});

route.all('/writing/{post_name}?', function (req, res, next) {
  var redirect = '';
  if(req.params.post_name) {
    redirect = '/' + req.params.post_name;
  }
  res.writeHead(302, { 'location': '/notes' + redirect });
  res.end();
});

var server = function (root) {
  // manually glob all the .html files so that we can navigate
  // without .html on the end of the urls
  glob('**/*.html', {
    cwd: root,
    dot: false
  }, function (er, files) {
    htmlFiles = files.map(function (file) {
      return '/' + file;
    });
  });

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
    route.get('*', function (req, res, next) {

      // simplify the url (remove the ?search) and test if
      // we have a file that exists (in `htmlFiles`)
      req.url = req.url.replace(/\?.*$/, '').replace(/(.)\/$/, '$1');
      if (htmlFiles.indexOf(req.url + '.html') !== -1) {
        // then we requested /foo/bar and we know there's a
        // generated file that matches
        req.url += '.html';
      }

      // if our server is ready, respond using the st module
      // and if it's a 404, respond with `serve404`.
      if (mount) {
        mount(req, res, function serve404() {
          res.writeHead(404);
          res.end(fourohfour);
        });
      } else {
        res.writeHead(404);
        res.end();
      }
    });

    console.log('Running harp-static (production) on ' + port);
    http.createServer(route).listen(port);

    fourohfour = fs.readFileSync(outputPath + '/404.html');
    server(outputPath, port);
  } else {
    route.all('*', function (req, res, next){
      //@todo fix this
      var directories = ['/notes', '/experiments'];
      if (directories.indexOf(req.url) >= 0) {
        req.url = req.url + '/';
      }
      next();
    });

    route.all('*', harp.mount(__dirname));
    route.all('*', function (req, res, next) {
      req.url = '/404';
      harp.mount(__dirname)(req, res);
    });

    console.log('Running harp-static (development) on ' + port);
    http.createServer(route).listen(port);
    server(__dirname + '/public');
  }
}

if (process.argv[2] === 'compile') {
  harp.compile(__dirname, outputPath, function(errors){
    if(errors) {
      console.log(JSON.stringify(errors, null, 2));
      process.exit(1);
    }

    process.exit(0);
  });
} else {
  run();
}
