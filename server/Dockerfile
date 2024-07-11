# server
FROM node:20.15

RUN apt-get update && apt-get install -y \
    netcat-openbsd

WORKDIR /usr/src/app

COPY ../package*.json ./

RUN npm install

COPY ./server .

EXPOSE 50051
CMD [ "node", "./index.js" ]
