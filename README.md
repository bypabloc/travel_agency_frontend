## Entorno de desarrollo

### docker --version
    Docker version 20.10.11, build dea9396

### docker-compose --version
    docker-compose version 1.27.4, build 40524192

## Comandos para ejecutar el contenedor:
    sudo docker-compose build --no-cache
    sudo docker-compose up -d --build bypabloc_agency_travel_vue

## Para ver las imagenes creadas:
    sudo docker-compose ps

## Para ver los logs de la aplicación:
    sudo docker-compose logs -t -f bypabloc_agency_travel_vue

## Nota:
Por defecto la URL del endpoint es "http://127.0.0.1:8080/api/", si desea especificar una solo debe agregar un archivo ".env" indicando la llave "VUE_ENDPOINT_URL". En la raiz del proyecto hay un archivo ".env.example" con la configuracion por defecto.