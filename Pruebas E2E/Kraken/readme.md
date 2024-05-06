# Pruebas End-to-End con Kraken-Node

Este repositorio contiene pruebas end-to-end utilizando Kraken para garantizar la calidad del software.

## Requisitos Previos

Antes de comenzar, asegúrate de tener Node.js y npm instalados en tu sistema.

- **Node.js:** Puedes descargar e instalar Node.js desde [nodejs.org](https://nodejs.org/). Se recomienda utilizar la versión 18.20.0.
- **npm:** npm se instala automáticamente junto con Node.js. Se recomienda utilizar la versión 10.5.2.

## Configuración

1. **Navegar a la ruta del proyecto**

   Antes de instalar las dependencias, asegúrate de estar en la ruta correcta del proyecto. Abre una terminal y navega hasta la carpeta `root/Pruebas E2E/Kraken` utilizando el siguiente comando:

   ```bash
   cd 'root/Pruebas E2E/Kraken'
   ```

2. **Instalación de dependencias**

   Una vez en la ruta del proyecto, instala las dependencias ejecutando el siguiente comando:

   ```bash
   npm install
   ```

## Ejecución de las pruebas

Para poder ejecutar los escenarios de pruebas, sigue estos pasos:

1. Asegúrate de estar en la ruta `.\Pruebas E2E\Kraken` desde la terminal.
2. Copia o mueve cualquier archivo `.feature` de la carpeta `.\Pruebas E2E\Kraken\features\featuresStorage` y pégalo en `.\Pruebas E2E\Kraken\features`. 
**Nota:** Solo mueve un archivo a la vez, ya que Kraken espera un único archivo, de haber mas tomara el primero que encuentre ordenado alfabéticamente.
3. **Ejecuta las pruebas**

   Utiliza el siguiente comando para ejecutar todas las pruebas:

   ```bash
   npx kraken-node run
   ```

4. Una vez ejecutada la prueba, puedes mover el archivo de vuelta a la carpeta `.\Pruebas E2E\Kraken\features\featuresStorage` y mover otro archivo a `.\Pruebas E2E\Kraken\features` para continuar con las ejecuciones.

## Ajuste de valores paramétricos (URL, Credenciales, Valores)

Desde el archivo `.\Pruebas E2E\Kraken\properties.json` se pueden modificar las variables que se usan en el proceso. Se recomienda modificar los valores en caso de ser necesario, como por ejemplo:
- Cuando se cambia la URL.
- Cuando se manejan credenciales de acceso diferentes.

# Notas de los desarrolladores:
Se recomienda antes de cada ejecucion validar que en los apartados de `Posts`, `Pages` y `Tags` se encuentre un solo elemento y que `no contenga` ningun nombre de los que aparecen en los valores paramétricos; En el caso de `members` no debe haber `ninguno`.