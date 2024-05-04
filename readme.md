# Guía de instalación y uso de Docker

Esta guía te ayudará a instalar Docker Desktop y a levantar y bajar los contenedores de Docker para este proyecto.

## Instalación de Docker Desktop

0. Validar los requerimientos segun el OS ([Windows](https://docs.docker.com/desktop/install/windows-install/), [Linux](https://docs.docker.com/desktop/install/linux-install/), [Mac](https://docs.docker.com/desktop/install/mac-install/))
1. Descarga Docker Desktop desde [el sitio web oficial de Docker](https://www.docker.com/products/docker-desktop).
2. Sigue las instrucciones de instalación para tu sistema operativo.
3. Una vez instalado, abre Docker Desktop.

La versión utilizada para el desarrollo es:
```
Docker version 25.0.3, build 4debf41.
Procesador:	Intel(R) Core(TM) i5-9300H CPU @ 2.40GHz   2.40 GHz
RAM instalada:	16,0 GB
Tipo de sistema	Sistema operativo de 64 bits, procesador x64
OS:	Windows 11 Home Single Language
Versión:	23H2
Compilación del OS:	22631.3527
```

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

4. Validar en la aplicacion de docker que `some-ghost` y `ghost-db` se esten ejecutando (estas aparecen con un color `verde` cuando estan ejecutando y `gris` cuando no). En caso de que alguna no este ejecutando, lanzar la ejecucion manual haciendo click en la flecha de ejecutar.

5. ¡Listo! Los contenedores Docker ahora están en funcionamiento y puedes comenzar a utilizar tu aplicación.

## Creacion del usuario de la cuenta
Al ser la primera vez que instalamos Ghost cuando ingresamos a `http://localhost:8080/ghost/` nos va a solicitar la creacion del sitio y el usuario admistrador, para esto se deben llenar los campos y guardar las credenciales de acceso (`Correo` y `Contraseña`) que seran necesarias mas adelante para la configuracion de las pruebas automatizadas.

## Bajar Docker para el proyecto

1. Para detener y eliminar los contenedores Docker relacionados con este proyecto, ejecuta el siguiente comando desde el directorio del proyecto:

    ```bash
    docker-compose down
    ```

    Esto detendrá y eliminará los contenedores, pero mantendrá los datos persistentes almacenados en los volúmenes, a menos que especifiques lo contrario en tu archivo `docker-compose.yml`.

2. Docker se ha detenido y limpiado. Ahora puedes cerrar la terminal o continuar con otras tareas.