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

   Si deseas ejecutar una prueba específica, utiliza el siguiente comando y reemplaza `<nombre_de_prueba>` con el nombre de tu archivo de prueba:

   ```
   npx cypress run --spec .\Pruebas E2E\Cypress\cypress\e2e\<nombre_de_prueba>.spec.js
   ```

   Por ejemplo:

   ```
   npx cypress run --spec .\Pruebas E2E\Cypress\cypress\e2e\nombre_de_prueba.spec.js
   ```

Esto ejecutará la prueba especificada en modo headless.

## Ajuste de valores paramétricos (URL, Credenciales, Valores)

Desde los archivos `.\Pruebas E2E\Cypress\cypress\fixtures` se pueden modificar las variables que se usan en el proceso. Se recomienda modificar los valores en caso de ser necesario, como por ejemplo:
- Cuando se cambia la URL.
- Cuando se manejan credenciales de acceso diferentes.