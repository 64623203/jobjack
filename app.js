'use strict'

const path = require('path')
const AutoLoad = require('@fastify/autoload')
const cors = require('@fastify/cors')
const fastifyStatic = require('@fastify/static')
if (!process.env.MOUNT_PATH) process.env.MOUNT_PATH = path.join(__dirname, 'mount')

// Pass --options via CLI arguments in command to enable these options.
module.exports.options = { host: '0.0.0.0' }

module.exports = async function (fastify, opts) {
  // Place here your custom code!
  fastify.register(cors, {
    origin: '*',
    methods: 'GET,PUT,POST,DELETE'
  })

  fastify.setErrorHandler(function (error, request, reply) {
    // Log error
    fastify.log.error(error)
    // Send error response
    reply.send({ success: false, message: e.message })
  })

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  await fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  await fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({ prefix: '/api' }, opts)
  })

  fastify.register(fastifyStatic, {
    root: path.join(__dirname, 'public'),
    index: 'index.html'
  })

  console.log(fastify.printRoutes())
}
