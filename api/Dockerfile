ARG BUILDER_IMG=node:17.3.0-alpine

FROM ${BUILDER_IMG}

RUN apk update && apk --no-cache --update add build-base

RUN npm i npm@latest -g

RUN npm i -g @nestjs/cli

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

