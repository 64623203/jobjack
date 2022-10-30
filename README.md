# Getting Started

A simple folder crawler

## Container start command

This program runs in a container, and a volume needs to be mounted to the `mount` folder of the application.

### `docker build -t crawler .`

### `docker run -v /:/app/mount -p 3000:3000 crawler`

[Browser: http://localhost:3000](http://localhost:3000)

## Caveats

For ease of use, the Angular files are statically hosted through NodeJS. In a production environment I would have it
in its own container with nginx

Logging is set to 'info' instead of 'error'

Docker compose would be used for container deploy, instead of just Dockerfiles
