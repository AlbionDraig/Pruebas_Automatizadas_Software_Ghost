# Instrucciones para Ejecutar Proyecto de Resemble.js

A continuación, se detallan los pasos necesarios para ejecutar el proyecto de Resemble.js una vez que se ha descargado el repositorio:

1. Asegúrate de tener Node.js instalado en tu sistema. Si no lo tienes, puedes descargarlo e instalarlo desde [Node.js](https://nodejs.org/).

2. Abre una terminal o línea de comandos y navega hasta la ruta del proyecto `./Regresion/Resemble`.

3. Ejecuta el siguiente comando para instalar las dependencias del proyecto:

```bash
npm install
```

4. Una vez completada la instalación de las dependencias, copia la carpeta de screenshots desde `./Regresion/Cypress/cypress/screenshots` a `./Regresion/Resemble`. Esto es necesario para que Resemble.js pueda comparar las imágenes.

5. Ahora estás listo para ejecutar las pruebas de regresión. Utiliza el siguiente comando:

```bash
node index.js
```

6. Una vez que las pruebas hayan finalizado, los resultados estarán disponibles en la carpeta `./Regresion/Resemble/results` en formato HTML.