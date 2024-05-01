# Guía de instalación y uso de Docker

Esta guía te ayudará a instalar Docker Desktop y a levantar y bajar los contenedores de Docker para este proyecto.

## Instalación de Docker Desktop

1. Descarga Docker Desktop desde [el sitio web oficial de Docker](https://www.docker.com/products/docker-desktop).
2. Sigue las instrucciones de instalación para tu sistema operativo.
3. Una vez instalado, abre Docker Desktop.

La versión utilizada para el desarrollo es Docker version 25.0.3, build 4debf41.

## Levantar Docker para el proyecto

1. Abre una terminal o línea de comandos.
2. Navega al directorio raíz de tu proyecto utilizando el comando `cd`.

    ```bash
    cd /ruta/del/proyecto
    ```

3. Una vez en el directorio del proyecto, ejecuta el siguiente comando para levantar los contenedores Docker en segundo plano:

    ```bash
    docker-compose up -d
    ```

    Esto iniciará los contenedores definidos en el archivo `docker-compose.yml` en modo detached (-d), lo que significa que se ejecutarán en segundo plano.

4. ¡Listo! Los contenedores Docker ahora están en funcionamiento y puedes comenzar a utilizar tu aplicación.

## Bajar Docker para el proyecto

1. Para detener y eliminar los contenedores Docker relacionados con este proyecto, ejecuta el siguiente comando desde el directorio del proyecto:

    ```bash
    docker-compose down
    ```

    Esto detendrá y eliminará los contenedores, pero mantendrá los datos persistentes almacenados en los volúmenes, a menos que especifiques lo contrario en tu archivo `docker-compose.yml`.

2. Docker se ha detenido y limpiado. Ahora puedes cerrar la terminal o continuar con otras tareas.