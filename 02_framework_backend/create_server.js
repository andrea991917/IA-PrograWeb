const events = require("events");
const net = require("net");

const createServer = (requestHandler) => {
  const server = net.createServer((socket) => {
    console.log("new connection");

    let buffer = [];
    socket.setEncoding("utf-8");
    socket.on("data", (data) => {
      buffer.push(data);
      console.log(data);
      //Convertir buffer de array a string
      bufferString = buffer.toString();
      //Objeto request
      const request = {
        method: '',
        path: '',
        headers: {},
        body: '',
      }

      //Dividir el string por CRLF
      reqArray = bufferString.split('\r\n');
      let hasAllHeaders = false;
      reqArray.map((element, index) => {
        let lastIndex = reqArray.length - 1;
        //Detectamos el doble CRLF cuando terminan los headers
        if (element === '') {
          hasAllHeaders = true
        }

        //La primera línea: method SP request-target SP HTTP-version
        if (index === 0) {
          //Se dividen por SP para encontrar los valores
          request.method = element.split(' ')[0]
          request.path = element.split(' ')[1]
        }
        //Si no tiene todos los headers añade todos los elementos como headers
        else if (!hasAllHeaders) {
          //Un header está formado por field-name ":" OWS field-value OWS
          const headersSplited = element.split(': ');
          const [first, ...rest] = headersSplited;
          //Todo lo que va a antes de los dos puntos lo pasamos a minúsculas y lo almacenamos como una propiedad del objeto header
          //lo demás es el valor de esa propiedad
          request.headers[first.toLowerCase()] = rest.join();
        }
        //Si hay un body y no es el whitespace que queda por el doble CRLF antes del body
        else if (request.headers["content-length"] != 0 && element !== '') {
          if (index !== lastIndex) {
            //Debido a que el string se separa por CRLF, este elimina los CRLF del body entonces lo añadimos manualmente
            request.body = request.body + element + '\r\n';
          } else {
            request.body = request.body + element
          }
        }
      });
      console.log("data received");
    });

    const response = { 
      //metodo send que recibe los tres parametros del response                  
      send: (code, headers, body) => {
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

    socket.on("end", () => {
      buffer.join();
      console.log("connection ended");
    });

    requestHandler(request, response)
  });

  return {
    listen: (portNumber) => {
      // ... ✏️
    }
  };
};

module.exports = createServer;
