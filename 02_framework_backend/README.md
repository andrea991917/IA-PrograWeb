# Framework de backend

El ejercicio consiste en implementar un framework que permita crear servidores HTTP en NodeJS.

## Fecha de entrega

El _pull request_ para la entrega del ejercicio debe crearse antes de `2020-11-16T23:00:00+01:00`.

## Enunciado

Modifica únicamente el archivo `create_server.js` para que la función exportada, `createServer`, pueda ser utilizada de la suguiente manera:

```javascript
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
```

Nótese que insertar los _headers_ "Content-Length", "Date", etc. es responsabilidad del framework.

Para simplificar el ejercicio, se debe asumir que las siguintes condiciones se aplican:

- Cada conexión se cerrará después de la primera respuesta HTTP.
- No es necesario que el servidor maneje más de una conexión concurrente.
- Todas los mensajes que contengan un BODY utilizarán la cabecera `Content-Length` para determinar su longitud.
- Sólo es necesario manejar los métodos GET y POST.

## Tecnologías

El ejercicio se debe realizar sin utilizar librerías externas.

El ejercicio se debe realizar importando únicamente los siguientes módulos de NodeJS:

- `events`
- `Buffer`
- `Stream`
- `net`

## Método de entrega

El método de entrega será, para cada alumno, un _pull request_ a su rama _master_ (`/nombre.apellido/master`). El nombre del _pull request_ debe ser "entrega práctica 02".

## Calificación

Para que el trabajo sea calificado debe cumplir con lo dispuesto en las secciones anteriores.

La nota se calculará de la siguiente manera:

Cinco puntos si `create_server.js` cumple con el funcionamiento básico:

- Crea un servidor que escucha conexiones,
- Invoca el manejador de las peticiones,
- Descompone peticiones HTTP en sus partes,
- Compone mensajes HTTP válidos.
- Permite obtener _headers_, ignorando el uso de mayúsculas en sus nombres, a través de la función `request.getHeader`.

Seis puntos si, además, utiliza el _header_ `Content-Length` para detectar el final del _body_.

Siete puntos si, además, inserta automáticamente las cabeceras correspondientes a la respuesta: `Content-Length`, `Date`, etc.

Ocho puntos si, además, es capaz de funcionar a pesar de que el mensaje HTTP esté segmentado.

Hasta diez puntos si, además, el equipo demuestra en clase la implementación de alguna característica adicional. Por ejemplo:

- [Negociación de contenido](https://developer.mozilla.org/en-US/docs/Web/HTTP/Content_negotiation).
- Peticiones concurrentes.
