const routes = module.exports = require('next-routes')();

routes
  .add('blog', '/blog/:slug');
