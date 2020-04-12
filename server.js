const http = require('http');
const router = require('router-stupid');
const site = require('./lib/site');
const route = router();

function run(port, options) {
  const url = 'http://localhost:' + port;
  const env = (options || {}).env === 'development' ? 'development' : 'production';

  site.redirects(route);

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
