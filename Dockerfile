FROM node:9.0.0-alpine as dev
LABEL maintainer="esplo@users.noreply.github.com"

WORKDIR /app

CMD ["sh", "-c", "npm install && npm run dev"]


FROM node:9.0.0-alpine as prod
LABEL maintainer="esplo@users.noreply.github.com"

# to ignore dirty node_modules
COPY . /app
WORKDIR /app

RUN ls -la

RUN npm install \
    && npm run build

CMD ["npm", "run", "start"]
