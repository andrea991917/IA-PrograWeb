# Framework de frontend

El ejercicio consiste en implementar un framework que permita crear applicaciones web.

## Fecha de entrega

El _pull request_ para la entrega del ejercicio debe crearse antes de `2020-12-20T23:00:00+01:00`.

## Enunciado

Modifica únicamente el archivo `index.html` para que la función `createApp` pueda ser utilizada de la manera demostrada en el propio archivo. Puedes ver una demo de la aplicación funcionando en el siguiente enlace: [https://03-framework-frontend.glitch.me](https://03-framework-frontend.glitch.me/).

Nótese que los atributos `fw-if`, `fw-content`, `fw-attr:*` y `fw-on:*` son atributos no estándar que el framework debe interpretar:

- `fw-if` se utiliza para mostrar u ocultar un elemento (y sus descendientes) en función de un booleano.
- `fw-content` se utiliza para controlar el texto contenido por un elemento.
- `fw-attr:*` se utiliza para controlar el valor de un atributo del elemento. El nombre del atributo controlado se especifica a partir de los dos puntos.
- `fw-on:*` se utiliza para asignar un handler de evento al elemento. El nombre del evento para el que se registra el handler se especifica a partir de los dos puntos.

Los valores de estos atributos deben ser nombres de propiedades del estado de la aplicación o nombres de handlers. Tanto las propiedades del estado como los handlers son especificados como parámetros de la función `createApp`.

## Tecnologías

El ejercicio se debe realizar sin utilizar librerías externas.

## Método de entrega

El método de entrega será, para cada alumno, un _pull request_ a su rama _master_ (`/nombre.apellido/master`). El nombre del _pull request_ debe ser "entrega práctica 03".

## Calificación

Para que el trabajo sea calificado debe cumplir con lo dispuesto en las secciones anteriores.

La nota se calculará de la siguiente manera:

Cinco puntos si funcionan los atributos `fw-if` y `fw-content`.

Seis puntos si, además, funciona el atributo `fw-attr:*`.

Ocho puntos si, además, funciona el atributo `fw-on:*`.

Nueve puntos si, además, el framework soporta algún otro atributo no estándar, creado por vosotros. En ese caso, debes describir brevemente en el pull request cómo hacer uso de esta característica del framework.

Diez puntos si, además, el framework implementa modularidad. En ese caso, debes describir brevemente en el pull request cómo hacer uso de esta característica del framework.
