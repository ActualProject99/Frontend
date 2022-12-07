const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://tgle.ml/",
      pathRewrite: {
        "^/api/": "/", // remove base path
      },
      changeOrigin: false,
    })
  );
};
