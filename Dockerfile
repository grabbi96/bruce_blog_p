FROM node:12-slim

# where our app will live in container
WORKDIR /app

#  api
COPY  ./packages/api/package.json ./packages/api/package.json
#  dashboard
COPY  ./packages/dashboard/package.json ./packages/dashboard/package.json

# root package file
COPY package.json package.json
COPY yarn.lock yarn.lock
COPY lerna.json lerna.json
RUN yarn

# copy whatever is here into container
# copy everything except packages
COPY . .

ENTRYPOINT ["/usr/bin/dumb-init", "--"]