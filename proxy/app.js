const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const { createProxyMiddleware } = require("http-proxy-middleware");
const config = require("./proxy.config.json");

const app = express();

app.use(logger("dev"));
app.use(cors());

config.list.forEach(({ key, target }) => {
  if (!/[a-zA-Z0-9_-]+/.test(key)) {
    throw new Error("key 는 알파벳, 숫자, 하이픈, 밑줄 조합 이어야 합니다.");
  }
  app.use(
    `/${key}`,
    createProxyMiddleware({
      target,
      pathRewrite: {
        [`^/${key}`]: "/",
      },
      xfwd: true,
    })
  );
});

module.exports = app;
