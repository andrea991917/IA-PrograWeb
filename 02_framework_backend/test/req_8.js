const assert = require("assert");
const sleep = require("./sleep.js");
const request = require("./request_with_net.js");
const createServer = require("../create_server.js");

describe("8", () => {
  it("should be resilient to segmenting", async () => {
    const body = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, dolore fugit adipisci voluptatibus saepe dicta voluptatum temporibus modi eveniet nobis debitis inventore tenetur culpa a eius, libero tempore necessitatibus.`;

    let req;
    const server = createServer((_req) => {
      req = _req;
    });

    server.listen(8080);

    await request(
      `POST /path HTTP/1.1
Host: localhost
Content-Length: ${Buffer.byteLength(body)}

`,
      body.slice(0, 10),
      body.slice(10)
    );

    await sleep(100); // Give the server time to run the handler.

    server.close();
    assert.equal(typeof req, "object");
    assert.equal(req.body, body);
  });
});
