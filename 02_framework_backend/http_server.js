// El modulo importado en la suguiente línea es el que debes crear.
const createServer = require("./create_server.js");

const get = (request, response) => {
  const authorization = request.getHeader("Authorization");

  if (authorization == null) {
    response.send(
      "200",
      { "Content-Type": "application/json" },
      JSON.stringify({
        authenticated: true,
        message: "Hello World!",
      })
    );
  } else {
    response.send(
      "200",
      { "Content-Type": "application/json" },
      JSON.stringify({
        authenticated: false,
        message: "Hello World!",
      })
    );
  }
};

const requestListener = (request, response) => {
  console.log("received request", request);

  switch (request.method) {
    case "GET": {
      return get(request, response);
    }
    case "POST": {
      return response.send(
        202,
        { "Content-Type": "application/json" },
        request.body
      );
    }
    default: {
      return response.send(
        404,
        { "Content-Type": "text/plain" },
        "The server only supports HTTP method GET"
      );
    }
  }
};

const server = createServer((request, response) => {
  try {
    return requestListener(request, response);
  } catch (error) {
    console.error(error);
    response.send(500, { "Content-Type": "text/plain" }, "Uncaught error");
  }
});

server.listen(8080);