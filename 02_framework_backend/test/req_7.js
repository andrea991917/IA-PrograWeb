const assert = require("assert");
const request = require("./request_with_net.js");
const createServer = require("../create_server.js");

describe("7", () => {
  it("send should insert automatic headers", async () => {
    server = createServer((_, res) => {
      res.send(500, { "Content-Type": "text/plain" }, "Uncaught error");
    });

    server.listen(8080);

    const response = await request(
      `GET / HTTP/1.1
Host: localhost

`
    );

    server.close();
    assert(/content-length: *14/i.test(response));
  });
});
