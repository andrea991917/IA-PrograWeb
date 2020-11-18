const net = require("net");
const sleep = require("./sleep.js");

module.exports = (...segments) =>
  new Promise(async (resolve) => {
    const client = net.createConnection({ port: 8080 }, async () => {
      for (const segment of segments) {
        await sleep(50);
        client.write(segment.replace(/\n/g, "\r\n"));
      }
    });

    let buffer = "";

    client.on("data", (data) => {
      buffer += data.toString("utf8");
      client.end();
    });

    client.on("end", () => {
      resolve(buffer);
    });

    await sleep(500);
    client.end();
    resolve();
  });
