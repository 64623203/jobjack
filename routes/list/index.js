'use strict'

module.exports = async function (fastify, opts) {

  fastify.post('/', async function (request, reply) {
    return {
      success: true,
      message: `Successfully retrieved listing for '${request.body?.path}'`,
      data: await fastify.getDirectoryDetails(request.body?.path)
    }
  })
}
