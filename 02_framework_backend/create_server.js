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
        getHeader: (header)=>{
            return this.headers[header.toLowerCase()]
        }
      }

      //Dividir el string por CRLF
      reqArray = bufferString.split('\r\n');
      let hasAllHeaders = false;
      let hasMethodAndPath= false;
      reqArray.map((element, index) => {
        let lastIndex = reqArray.length - 1;
        //La primera línea: method SP request-target SP HTTP-version
        if (index === 0 && !hasMethodAndPath) {
          //Se dividen por SP para encontrar los valores
          request.method = element.split(' ')[0]
          request.path = element.split(' ')[1]
          hasMethodAndPath= true;
        }
        else if (element === '') { //Detectamos el doble CRLF cuando terminan los headers
          hasAllHeaders = true
        }
        //Si no tiene todos los headers añade el elemento como header
        else if (!hasAllHeaders) {
          //Un header está formado por field-name ":" OWS field-value OWS
          const headersSplited = element.split(': ');
          const [first, ...rest] = headersSplited;
          //Todo lo que va a antes de los dos puntos lo pasamos a minúsculas y lo almacenamos como una propiedad del objeto header
          //lo demás es el valor de esa propiedad
          request.headers[first.toLowerCase()] = rest.join();
        }
        //Si hay un body y si el body que tenemos es menor que el content length
        else if (request.headers["content-length"] != 0 && (request.body.length < request.headers["content-length"]) ) {
          if (((body.length+element.length) < request.headers["content-length"] )) { //esto detecta si no es el ultimo elemento
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

    //Dejamos de aceptar nuevas conexiones
    server.close();
    //Permite salir en caso de que solo haya una conexion activa
    server.unref();
    //Nos aseguramos de que se cierren todas las conexiones
    server.destroy();
  });

  return {
    listen: (portNumber) => {
      console.log("listening port " + portNumber); 
    }
  };
};

module.exports = createServer;
