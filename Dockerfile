FROM node:21-alpine3.17 AS base
USER node
WORKDIR /home/node/app

#EXPOSE 8080
#CMD [ "node", "server/server.js" ]

FROM base AS build
COPY --chown=node:node package.json ./
RUN npm install --legacy-peer-deps
EXPOSE 8080