const assert = require("assert");
const sleep = require("./sleep.js");
const request = require("./request_with_net.js");
const createServer = require("../create_server.js");

describe("6", () => {
  it("server should invoke handler with body if present", async () => {
    let req;
    const server = createServer((_req) => {
      req = _req;
    });

    server.listen(8080);

    await request(
      `POST /path HTTP/1.1
Host: localhost
Content-Length: 11

hello world`
    );

    server.close();
    assert.equal(typeof req, "object");
    assert.equal(req.body, "hello world");
  });

  it("server should not invoke the handler if the connection is closed before receiving the number of bytes indicated by Content-Length", async () => {
    let wasInvoked = false;
    const server = createServer((_req) => {
      wasInvoked = true;
    });

    server.listen(8080);

    await request(
      `POST /path HTTP/1.1
Host: localhost
Content-Length: 11

hello`
    );

    server.close();
    assert(!wasInvoked);
  });
});
