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

    const request = {   //Neto: hacer el request, para eso hay que recibir la data ponerla en un buffer y luego darle el formato.
    method = '...',
    path = '...',
    headers = {
    //...
    },
    body = '...',
    }

    const response = {  //Andréa: vos te encargarás de implementar el metodo send del objeto response, este send recibe
                        //los parámetros que ves en http_server.js y envía un mensaje en formato http como respuesta.
    send: () => { ... } // Saro: Después de hacer un response.send se tiene que cerrar la conexión, Saro tienes que investigar
                        // como cerrar la conexión e impementarlo luego que ya Andréa tenga completado el send lo podrás 
                        // unir pero ya tiene que estar hecho.
    }

    requestHandler(request, response)
  });

  socket.on("end", () => {
    buffer.join();
    console.log("connection ended");
  });
});


module.exports = createServer;
