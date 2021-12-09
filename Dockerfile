FROM node:16.13.1 as build-stage

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

EXPOSE 8080

CMD ["npm", "run", "serve"]

# blog guide to this config docker https://medium.com/bb-tutorials-and-thoughts/vue-js-local-development-with-docker-compose-275304534f7c

# Config to test production https://www.middlewareinventory.com/blog/docker-vuejs/