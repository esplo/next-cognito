ARG NODE_VERSION=15.5.0-alpine3.12
FROM node:${NODE_VERSION} as dev
LABEL maintainer="esplo@users.noreply.github.com"

WORKDIR /app

CMD ["sh", "-c", "npm install && npm run dev"]


FROM node:${NODE_VERSION} as prod
LABEL maintainer="esplo@users.noreply.github.com"

# to ignore dirty node_modules
COPY . /app
WORKDIR /app

RUN ls -la

RUN npm install \
    && npm run build

CMD ["npm", "run", "start"]
