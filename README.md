## Entorno de desarrollo
    
    S.O.: Linux Ubuntu 20.04.3 LTS
    npm version: 8.1.2
    node version: v16.13.1

## Comandos para ejecutar el contenedor:
    sudo docker-compose build --no-cache
    sudo docker-compose up -d --build bypabloc_agency_travel_vue
    sudo docker-compose ps
    sudo docker-compose logs -t -f bypabloc_agency_travel_vue

## Nota:
Por defecto la URL del endpoint es "http://127.0.0.1:8000/api/", si desea especificar una solo debe agregar un archivo ".env" indicando la llave "VUE_ENDPOINT_URL". En la raiz del proyecto hay un archivo ".env.example" con la configuracion por defecto.
Si cambia esta 
