const assert = require("assert");
const request = require("./request_with_net.js");
const createServer = require("../create_server.js");

describe("5", () => {
  let server;

  afterEach(() => {
    if (server) server.close();
  });

  it("server should invoke handler once per request", async () => {
    let requestCount = 0;
    server = createServer(() => {
      requestCount++;
    });

    server.listen(8080);

    await request(
      `GET / HTTP/1.1
Host: localhost

`
    );

    await request(
      `GET / HTTP/1.1
Host: localhost

`
    );

    await request(
      `GET / HTTP/1.1
Host: localhost

`
    );

    server.close();
    assert.equal(requestCount, 3, "assertion failed");
  });

  it("server should invoke handler with GET request", async () => {
    let req;
    server = createServer((_req) => {
      req = _req;
    });

    server.listen(8080);

    await request(
      `GET / HTTP/1.1
Host: localhost

`
    );

    server.close();
    assert.equal(typeof req, "object");
    assert.equal(req.method, "GET");
    assert.equal(req.path, "/");
  });

  it("server should invoke handler with POST request", async () => {
    let req;
    server = createServer((_req) => {
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
    assert.equal(req.method, "POST");
    assert.equal(req.path, "/path");
  });

  it("server should invoke handler with response", async () => {
    let res;
    server = createServer((_, _res) => {
      res = _res;
    });

    server.listen(8080);

    await request(
      `GET / HTTP/1.1
Host: localhost

`
    );

    server.close();
    assert.equal(typeof res, "object");
    assert.equal(typeof res.send, "function");
  });

  it("getHeader should retrieve haders by case-insensitive name", async () => {
    let req;
    server = createServer((_req) => {
      req = _req;
    });

    server.listen(8080);

    await request(
      `GET / HTTP/1.1
Host: localhost

`
    );

    server.close();
    assert.equal(typeof req, "object");
    assert.equal(typeof req.getHeader, "function");
    assert.equal(req.getHeader("host"), "localhost");
    assert.equal(req.getHeader("Host"), "localhost");
    assert.equal(req.getHeader("HosT"), "localhost");
  });

  it("send should compose a valid HTTP message", async () => {
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
    assert.equal(typeof response, "string");
  });

  it("send should compose a valid HTTP message, including first line", async () => {
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
    assert(/HTTP\/1\.1 +500 +[ a-zA-Z]+\r\n/i.test(response));
  });

  it("send should compose a valid HTTP message, including headers", async () => {
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
    assert(
      /HTTP\/1\.1 +500 +[ a-zA-Z]+\r\n([a-zA-Z-]+: *[ a-zA-Z0-9/,:-]+\r\n)+\r\n/i.test(
        response
      )
    );
  });

  it("send should compose a valid HTTP message, including body", async () => {
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
    assert(
      /HTTP\/1\.1 +500 +[ a-zA-Z]+\r\n([a-zA-Z-]+: *[ a-zA-Z0-9/,:-]+\r\n)+\r\nUncaught error/i.test(
        response
      )
    );
  });
});
