# Para tener en cuenta

Como se menciono en la sesion de [Hablemos del proyecto](https://www.coursera.org/learn/pruebas-automatizadas-software/lecture/b6RJI/hablemos-del-proyecto) en el minuto 2:16, se hace la entrega de los escenarios de forma proporcional (5 escenarios por cada integrante) en este caso los intengraten son:
- Rodrigo Bello
- Jerson Florez
- Sebastian Gutierrez B

# Ghost - Guía de instalación y uso con Docker

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

## Levantar Docker para el proyecto (PARA PRUEBAS DE REGRESION)
1. Abre una terminal o línea de comandos.
2. Navega al directorio raíz de tu proyecto utilizando el comando `cd`.
3. Asegurarse de no tener otras imagenes de docker instaladas, para ello ejecutar:
```
docker rm -f some-ghost0
docker rm -f some-ghost1
```
4. Ejecutar los siguientes comandos para levantar Ghost en los puertos 8080 (`ghost:5.82.2`) y 8081 (`ghost:3.42.9`):
```
docker run -d --name some-ghost0 -e NODE_ENV=development -e url=http://localhost:8080 -p 8080:2368 ghost:5.82.2
docker run -d --name some-ghost1 -e NODE_ENV=development -e url=http://localhost:8081 -p 8081:2368 ghost:3.42.9
```
5. Revisar en la url `http://localhost:8080` y `http://localhost:8081` que se haya desplegado Ghost y se crearan las credenciales de acceso (`Correo` y `Contraseña`;  El `Nombre de usuario` debe ser le mismo `Correo`) que seran necesarias mas adelante para la configuracion de las pruebas automatizadas (Se recomienda usar las mismas que el archivo de configuracion en `./Regresion/Cypress/cypress/fixtures/credentials.json` pero se pueden elegiree otras y se deben actualizar en el archivo JSON).
6. Para bajar las instancias de Docker una vez terminado de utilizar el proyecto se ejecutan las mismas instrucciones que en el paso 3.


## Levantar Docker para el proyecto (PARA PRUEBAS E2E)

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