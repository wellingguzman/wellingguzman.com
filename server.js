const http = require('http');
const router = require('router-stupid');
const site = require('./lib/site');
const route = router();

function run(port, options) {
  options = (options || {});
  const host = options.host || '127.0.0.1';
  const url = 'http://' + host + ':' + port;
  const env = options.env === 'development' ? 'development' : 'production';

  site.redirects(route);

  if (env === 'development') {
    site.development(route, __dirname);
  } else {
    site.production(route, __dirname);
  }

  http.createServer(route).listen(port, host);
  console.log('Running harp-static (' + env + ') on ' + url);
}

run(process.env.PORT || 9000, {
  env: process.argv[2] === 'dev' || process.env.NODE_ENV === 'development'
    ? 'development'
    : 'production',
    host: process.argv[3] || process.env.HOST,
});
