FROM node:14

WORKDIR /usr/src/app

COPY app/package*.json ./
RUN npm install
COPY app/ .
