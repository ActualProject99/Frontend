const http = require("http");
const chalk = require("chalk");
const config = require("./proxy.config.json");
const app = require("./app");

const port = Number(config.port) || 18000;

http.createServer(app).listen(port, () => {
  console.log("");
  console.log(chalk.blue("proxy server start"));
  console.log(chalk.blue(`> http://127.0.0.1:${port}`));
  console.log("");
});
