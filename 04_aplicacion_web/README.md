# Aplicación web

El ejercicio consiste en crear una aplicación web que contenga un videojuego.

## Enunciado

Realiza el trabajo de forma individual.

Elige qué juego implementar y comunícamelo, respondiendo al hilo creado en el foro de la asignatura para ese propósito. Dos alumnos no pueden implementar el mismo juego.

Modifica los archivos `index.js` y `create_server.js` y crea tantos archivos nuevos como sea necesario para que el servidor creado sirva la aplicación web.

Por último, despliega el servidor de tal forma que sea accesible públicamente.

## Entrega

La entrega del proyecto consta de:

- Un _pull request_ a la rama _master_ del alumno (`nombre.apellido/master`). El PR debe contener únicamente los archivos correspondientes al proyecto, contenidos en la carpeta `04_aplicacion_web/`.
- El despliegue del proyecto en algún servidor accesible públicamente. Por ejemplo, utilizando [glitch](glitch.com). La URL del servidor debe reflejarse en el archivo `despliegue.txt`.
- La demostración durante las clases dispuestas para seminarios tutoriales del funcionamiento del proyecto.

El _pull request_ y el despliegue para la entrega del ejercicio debe realizarse antes de `2021-01-17T23:00:00+01:00`.

## Tecnologías

El servidor debe implementarse utilizando el _framework_ creado por el alumno en la práctica `02_framework_backend`.

La página web puede implementarse utilizando el _framework_ creado por el alumno en la práctica `03_framework_frontend`. También es posible utilizar la versión ampliada del _framework_, [publicada en Glitch](https://glitch.com/edit/#!/04-ejemplo-framework-frontend-aumentado?path=framework.js%3A1%3A4633).

Sin perjuicio de lo anterior, el ejercicio se debe realizar sin utilizar librerías externas. Se entiende por librería externa aquella que no esté incluida entre las APIs del navegador o de NodeJS.

Extraordinariamente, el alumno podría solicitar utilizar alguna librería externa si ésta implementara conceptos no trabajados en la asignatura (por ejemplo, [D3](https://d3js.org/)).

## Calificación

Para que el trabajo sea calificado debe cumplir con lo dispuesto en las secciones anteriores.

La calificación del trabajo se calculará a partir de una nota de dificultad. A esta nota de dificultad se le descontará, si procede, puntos por los errores cometidos.

La nota de dificultad se calculará de la siguiente manera:

Cinco puntos si el juego incluye las siguientes características:

- Manejo de eventos, ya sean de teclado, ratón, intervalos de tiempo, etc.
- Los archivos que componen la página web (HTML, CSS, etc.) son servidos por un servidor web a través del protocolo HTTP.

Siete puntos si, además, utiliza el servidor para implementar alguna otra funcionalidad de la aplicación web que no sería posible implementar utilizando solamente tecnologías de _frontend_. Por ejemplo, persistencia de la puntuación de los jugadores o modo de juego multijugador.

Ocho puntos si, además, incluye elementos que se desplazan en la interfaz gráfica. El desplazamiento puede ser un efecto visual y no implica, necesariamente, que se modifique la posición de algún elemento del DOM.

Hasta diez puntos si, además, incluye otros elementos implementados con tecnologías web que aumenten la dificultad del trabajo. Por ejemplo, uso de otras APIs de navegador, elementos estéticos, etc.

## Recomendaciones

- Crea la rama para este trabajo a partir de la rama `master` del repositorio de la asignatura.
- Utiliza tu propio _fork_.
- Comienza por implementar una versión del juego tan simplificada como te sea posible. Después, añádele el resto de características de forma iterativa.
