const events = require("events");
const net = require("net");

const createServer = (requestHandler) => {
  const server = net.createServer((socket) => {
    console.log("new connection");

    //Objeto request
    var request = {
      method: '',
      path: '',
      headers: new Object(),
      body: '',
      hasAllHeaders: false,
      hasMethodAndPath: false,
      getHeader: (header)=>{
        return ((request.headers[header.toLowerCase()] === undefined) ?  null :  request.headers[header.toLowerCase()]);
      }
    }

    let buffer = [];
    socket.setEncoding("utf-8");
    
    
    socket.on("data", (data) => {
      buffer.push(data);
      //Convertir buffer de array a string
      bufferString = buffer.toString();

      //Dividir el string por CRLF
      reqArray = bufferString.split('\r\n');
      reqArray.map((element, index) => {
        //La primera línea: method SP request-target SP HTTP-version
        if (!request.hasMethodAndPath) {
          //Se dividen por SP para encontrar los valores
          request.method = element.split(' ')[0]
          request.path = element.split(' ')[1]
          request.hasMethodAndPath= true;
        }
        else if (element === '') { //Detectamos el doble CRLF cuando terminan los headers
          request.hasAllHeaders = true
        }
        //Si no tiene todos los headers añade el elemento como header
        else if (!request.hasAllHeaders) {
          //Un header está formado por field-name ":" OWS field-value OWS
          const headersSplited = element.split(': ');
          const [first, ...rest] = headersSplited;
          //Todo lo que va a antes de los dos puntos lo pasamos a minúsculas y lo almacenamos como una propiedad del objeto header
          //lo demás es el valor de esa propiedad
          request.headers[first.toLowerCase()] = rest.join();
        }
        //Si hay un body y si el body que tenemos es menor que el content length
        else if (request.getHeader("content-length") != 0 && (request.body.length < request.getHeader("content-length")) ) {
          if (((request.body.length+element.length) < request.getHeader("content-length"))) { //esto detecta si no es el ultimo elemento
            //Debido a que el string se separa por CRLF, este elimina los CRLF del body entonces lo añadimos manualmente
            request.body = request.body + element + '\r\n';
          } else {
            request.body = request.body + element
          }
        }
      });
      //Detectamos que el mensaje ya este completo para hacer el request handler
      if(request.getHeader("content-length") === null|| request.body.length == request.getHeader("content-length")) {
        requestHandler(request, response)
        clearRequestData();
      }
    });

    const response = { 
      //metodo send que recibe los tres parametros del response                  
      send: (code, headers, body) => {
        //Punto 7 = agregamos la longitud de la respuesta
        headers['Content-Length'] = body.length
        //agregamos la fecha de la peticion
        headers['Date'] = (new Date()).toUTCString()

        //Escribimos la primera linea indicando que estamos enviando una peticion http con el codigo que manden
        socket.write(`HTTP/1.1 ${code} Message\r\n`)
        //vamos a iterar el objeto header y vamos a escribir en el socket los headers encontrados 
        for (const [key, value] of Object.entries(headers)) {
          socket.write(`${key}: ${value}\r\n`);
        }
        //ahora escribimos en la cabecera el contenido del mensaje
        socket.write(`\r\n${body}\r\n`)
      }  
    }

    const clearRequestData = ()=>{
      request.hasMethodAndPath = false;
      request.hasAllHeaders = false;
      // request.body = '';
    }

    socket.on("end", () => {
      buffer.join();   
      console.log("connection ended");
    });
  });

  return {
    listen: (portNumber) => {
      server.listen(portNumber);
      console.log("listening port " + portNumber); 
    }, 
    close: () => {
      server.close();
    }
  };
};

module.exports = createServer;
