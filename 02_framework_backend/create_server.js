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
    //metodo send que recibe los tres parametros del response                  
    send: (code,headers,body) => { 
      //Punto 7 = agregamos la longitud de la respuesta
      headers['Content-Length'] = body.length()
      //agregamos la fecha de la peticion
      headers['Date'] = (new Date()).toUTCString()

    //Escribimos la primera linea indicando que estamos enviando una peticion http con el codigo que manden
      socket.write(`HTTP/1.1 ${code}\r\n`)
    //vamos a iterar el objeto header y vamos a escribir en el socket los headers encontrados 
      for (const property in headers) {
        socket.write(`${property}: ${object[property]}\r\n`);
      }
    //ahora escribimos en la cabecera el contenido del mensaje
      socket.write(`\r\n${body}\r\n`)
    }

    }

    requestHandler(request, response)
  });

  socket.on("end", () => {
    buffer.join();
    console.log("connection ended");
  });
});


module.exports = createServer;
