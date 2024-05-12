# Instrucciones de Ejecución de Pruebas de Regresión

1. Pararse sobre la ruta del proyecto `./Regresion/Backstop` y ejecutar el comando `npm install`.

2. Copiar la carpeta de screenshots `./Regresion/Cypress/cypress/screenshots` a `./Regresion/Backstop/backstop_data`.

## Comandos para ejecutar pruebas de regresión

```bash
npx backstop test --configPath=<File>New.json
npx backstop approve --configPath=<File>New.json
npx backstop test --configPath=<File>Old.json
```

Asegúrate de sustituir `<File>` con el nombre del archivo correspondiente.

## Comandos para ejecutar las pruebas de forma individual o general

```bash
npx backstop test --configPath=CreatePageNew.json
npx backstop approve --configPath=CreatePageNew.json
npx backstop test --configPath=CreatePageOld.json

npx backstop test --configPath=CreatePostNew.json
npx backstop approve --configPath=CreatePostNew.json
npx backstop test --configPath=CreatePostOld.json

npx backstop test --configPath=CreateTagNew.json
npx backstop approve --configPath=CreateTagNew.json
npx backstop test --configPath=CreateTagOld.json

npx backstop test --configPath=DeletePageNew.json
npx backstop approve --configPath=DeletePageNew.json
npx backstop test --configPath=DeletePageOld.json

npx backstop test --configPath=DeletePostNew.json
npx backstop approve --configPath=DeletePostNew.json
npx backstop test --configPath=DeletePostOld.json

npx backstop test --configPath=DeleteTagNew.json
npx backstop approve --configPath=DeleteTagNew.json
npx backstop test --configPath=DeleteTagOld.json

npx backstop test --configPath=EditPageNew.json
npx backstop approve --configPath=EditPageNew.json
npx backstop test --configPath=EditPageOld.json

npx backstop test --configPath=EditPostNew.json
npx backstop approve --configPath=EditPostNew.json
npx backstop test --configPath=EditPostOld.json

npx backstop test --configPath=EditTagNew.json
npx backstop approve --configPath=EditTagNew.json
npx backstop test --configPath=EditTagOld.json

npx backstop test --configPath=SearchNew.json
npx backstop approve --configPath=SearchNew.json
npx backstop test --configPath=SearchOld.json
```

Los resultados de las pruebas se encuentran en `./Regresion/Backstop/backstop_data/html_report` en formato HTML.