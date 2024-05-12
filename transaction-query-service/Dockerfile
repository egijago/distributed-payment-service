FROM node:22

WORKDIR /app

RUN rm -rf node_modules

COPY package*.json ./


RUN npm install

COPY . .

EXPOSE 8000
