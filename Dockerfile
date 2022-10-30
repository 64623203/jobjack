# Container 1: Build npm Dependencies
FROM node:16-alpine as npm
# App modules
WORKDIR /app
COPY package.json .
RUN npm i --production
# Web Modules
WORKDIR /web
COPY web/package.json .
RUN npm i && npm cache clean --force

# Container 2: Build Dist files
FROM node:16-alpine as builder
WORKDIR /web
COPY --from=npm /web/node_modules /web/node_modules
# Copy Files
COPY web .
# Build web files
RUN node_modules/.bin/ng build
RUN rm -rf node_modules

# Container 3: Start app
FROM node:16-alpine
WORKDIR /app

RUN addgroup -g 500 apps && \
    adduser -D -u 1500 -G apps app
COPY . .
COPY --from=npm /app/node_modules /app/node_modules
RUN mkdir -p /app/public
RUN mkdir -p /app/mount
COPY --from=builder /web/dist /app/public

USER app
CMD ["npm", "start"]
EXPOSE 3000
