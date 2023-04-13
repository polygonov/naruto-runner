ARG NODE_VERSION=16
ARG SERVER_PORT=3001

FROM node:$NODE_VERSION-alpine as builder

WORKDIR /build

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

RUN yarn lerna bootstrap
RUN yarn build

# Server
FROM node:$NODE_VERSION-alpine as production

WORKDIR /app

COPY --from=builder /build/packages/server/dist/ /app/
COPY --from=builder /build/packages/server/package.json /app/package.json
COPY --from=builder /build/yarn.lock /app/yarn.lock

RUN yarn install --production=true --frozen-lockfile

# Link client
COPY --from=builder /build/packages/client /app/node_modules/client

EXPOSE $SERVER_PORT
CMD [ "node", "/app/index.js" ]