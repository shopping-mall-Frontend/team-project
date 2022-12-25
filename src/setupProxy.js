//setupProxy.js

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api', {
      target: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api',
      pathRewrite: {
        '^/api': '',
      },
      changeOrigin: true,
    })
  );
};
