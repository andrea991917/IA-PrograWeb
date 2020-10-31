const events = require("events");
const net = require("net");

const server = net.createServer((socket) => {
  console.log("new connection");

  let buffer = [];
  socket.on("data", (data) => {
    buffer.push(data);
    console.log("data received");

    // ...

    if (!hasAllHeaders) {
    return
    }

    // content-length ?

    if (!isThereBody) {
    // send response
    return
    }

    // ...

    if (!hasBody) {
    return
    }

    // send response

    const request = {
    method = '...',
    path = '...',
    headers = {
    //...
    },
    body = '...',
    }

    const response = {
    send: () => { ... }
    }

    requestHandler(request, response)
  });

  socket.on("end", () => {
    buffer.join();
    console.log("connection ended");
  });
});


module.exports = createServer;
