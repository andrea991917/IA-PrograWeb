const fs = require('fs');
const createServer = require("./create_server.js");
let _server = null;

response = (code, headers, body) => {
    _server.send(code, headers, body);
}

getHandlers = (request) => {

    switch (request.path) {

        case '/':
            response(
                "200", {
                    "content-type": "text/html"
                },
                fs.readFileSync('./index.html')
            );
            break;
        default:
            headers = {};
            switch (request.path.split('.').pop()){
                case 'svg':
                    headers['content-type'] = 'image/svg+xml';
                    break;
                case 'ico':
                    headers['content-type'] = 'image/x-icon'
                    break;
                case 'webp':
                    headers['content-type'] = 'image/webp'
                    break;
                case 'png':
                    headers['content-type'] = 'image'
                    break;
                case 'jpeg':
                    headers['content-type'] = 'image/jpeg'
                    break;
                case 'jpg':
                    headers['content-type'] = 'image/jpeg'
                    break;
                case 'css':
                    headers['content-type'] = 'text/css'
                    break;
                case 'js':
                    headers['content-type'] = 'text/javascript'
                    break;
            }
            response(
                200, headers,
                fs.readFileSync('.'+request.path)
            );
            break;
    }
}

postHandlers = (request) => {

}


this.reqHandler = (request, server) => {
    _server = server;

    switch (request.method) {
        case "GET": {
            getHandlers(request);
            break;
        }
        case "POST": {
            postHandlers(request);
            break;
        }
        default: {
            return response(
                404, {
                    "Content-Type": "text/plain"
                },
                "The server only supports HTTP methods GET and POST"
            );
        }
    }
}

const requestListener = (request, response) => {
  if(request === undefined){
    return response.send(
      500,
      { "Content-Type": "text/plain" },
      "Server Error\nRequest Undefined"
    );
  } 
  this.reqHandler(request,response);
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
