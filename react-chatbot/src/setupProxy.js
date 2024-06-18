const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use('/webhooks', createProxyMiddleware({
    target: 'http://localhost:5005',  // Replace with your Rasa server URL
    changeOrigin: true,
  }));
};
