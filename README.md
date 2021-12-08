## Environment development
    
    S.O.: Linux Ubuntu 20.04.3 LTS
    npm version: 8.1.2
    node version: v16.13.1

## Comandos para instalar todos los paquetes
    npm install

## Comando para ejecutar el proyecto
    npm run dev -> para ejecutar el proyecto en modo build y rebuild
    npm run devbw -> para ejecutar el proyecto en modo build con hot reload
    npm run devs -> para ejecutar el proyecto en modo server
    npm run devsw -> para ejecutar el proyecto en modo server con hot reload
    npm run build -> para ejecutar en modo produccion (build)
    
## Por defecto la URL del endpoint es "http://127.0.0.1:8000/api/", si desea especificar una solo debe agregar un archivo ".env" indicando la llave "VUE_ENDPOINT_URL". En la raiz del proyecto hay un archivo ".env.example" con la configuracion por defecto.