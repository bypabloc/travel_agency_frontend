FROM node:16.13.1 as build-stage

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

EXPOSE 8080

CMD ["npm", "run", "serve"]

# Config to test production https://www.middlewareinventory.com/blog/docker-vuejs/