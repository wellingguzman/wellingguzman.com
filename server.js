const http = require('http');
const router = require('router-stupid');
const site = require('./lib/site');
const route = router();

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

function run(port, options) {
  const url = 'http://localhost:' + port;
  const env = (options || {}).env === 'development' ? 'development' : 'production';

  if (env === 'development') {
    site.development(route, __dirname);
  } else {
    site.production(route, __dirname);
  }

  http.createServer(route).listen(port);
  console.log('Running harp-static (' + env + ') on ' + url);
}

run(process.env.PORT || 9000, {
  env: process.argv[2] === 'dev' || process.env.NODE_ENV === 'development'
    ? 'development'
    : 'production'
});
