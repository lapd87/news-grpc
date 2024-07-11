# client
FROM node:20.15

WORKDIR /usr/src/app

COPY ../package*.json ./

RUN npm install

COPY ./client .

COPY ./server/protos ../server/protos

CMD [ "node", "./index.js" ]
