# Pruebas End-to-End con Cypress

Este repositorio contiene pruebas end-to-end utilizando Cypress para garantizar la calidad del software.

## Requisitos Previos

Antes de comenzar, asegúrate de tener Node.js y npm instalados en tu sistema.

- **Node.js:** Puedes descargar e instalar Node.js desde [nodejs.org](https://nodejs.org/). Se recomienda utilizar la versión 18.20.0.
- **npm:** npm se instala automáticamente junto con Node.js. Se recomienda utilizar la versión 10.5.2.

## Configuración

1. **Navegar a la ruta del proyecto**

   Antes de instalar las dependencias, asegúrate de estar en la ruta correcta del proyecto. Abre una terminal y navega hasta la carpeta `./Pruebas E2E/Cypress` utilizando el siguiente comando:

   ```
   cd root/Pruebas E2E/Cypress
   ```

2. **Instalación de dependencias**

   Una vez en la ruta del proyecto, instala las dependencias ejecutando el siguiente comando:

   ```
   npm install
   ```

3. **Configuración de Cypress**

   Este repositorio incluye una configuración básica de Cypress. Si deseas personalizar la configuración, consulta la documentación oficial de Cypress en [Cypress Documentation](https://docs.cypress.io/).

## Ejecución de las pruebas

### Interfaz de usuario (UI)

Para ejecutar las pruebas a través de la interfaz de usuario de Cypress, utiliza el siguiente comando en la raíz del proyecto:

```
npx cypress open
```

Esto abrirá la interfaz de Cypress, desde donde podrás seleccionar y ejecutar las pruebas.

### Línea de comandos (CLI)

También puedes ejecutar las pruebas directamente desde la línea de comandos. Aquí hay dos formas de hacerlo:

1. **Ejecutar todas las pruebas**

   Utiliza el siguiente comando para ejecutar todas las pruebas en modo headless (sin interfaz gráfica):

   ```
   npx cypress run
   ```

2. **Ejecutar una prueba específica**

   Si deseas ejecutar una prueba específica, utiliza el siguiente comando; reemplaza `<nombre_de_carpeta>` con el nombre de la capeta a ejecutar y `<nombre_de_prueba>` con el nombre de tu archivo de prueba:

   ```
   npx cypress run --spec .\cypress\e2e\<nombre_de_carpeta>\<nombre_de_prueba>.cy.js
   ```

   Por ejemplo:

   ```
   npx cypress run --spec .\cypress\e2e\nombre_de_carpeta\nombre_de_prueba.cy.js
   ```

Esto ejecutará la prueba especificada en modo headless.

## Ajuste de valores paramétricos (URL, Credenciales, Valores)

Desde los archivos `.\Pruebas E2E\Cypress\cypress\fixtures` se pueden modificar las variables que se usan en el proceso. Se recomienda modificar los valores en caso de ser necesario, como por ejemplo:
- Cuando se cambia la URL.
- Cuando se manejan credenciales de acceso diferentes.

# Notas de los desarrolladores:
1. Las ejecuciones de los escenarios se realizaron usando la interfaz grafica de cypress con el navegador Electron V18.
2. Se recomienda antes de cada ejecucion validar que en los apartados de `Posts`, `Pages` y `Tags` se encuentre un solo elemento y que `no contenga` ningun nombre de los que aparecen en los valores paramétricos; En el caso de `members` no debe haber `ninguno`.
3. En ocasiones, se genera un fallo por realizar una gran cantidad de inicios de sesión por hora. Se recomienda validar si los fallos se deben a esta casuística. Recomendamos desplegar nuevamente Ghost para evitar el tiempo de espera que establece Ghost para volver a acceder.
4. Algunos casos pueden fallar por la naturaleza dinámica de la información o del proceso, por lo que se recomienda ejecutar la prueba varias veces.
5. La información utilizada en los escenarios con datos a-priori se encuentra en `Generacion De Datos\Cypress\cypress\fixtures`.