'use strict'

const fp = require('fastify-plugin')
const path = require('path')
const { readdir, stat } = require('fs/promises')

const sizeOf = function (bytes) {
  if (bytes === 0) { return '0.00 B' }
  const e = Math.floor(Math.log(bytes) / Math.log(1024))
  return (bytes / Math.pow(1024, e)).toFixed(2) + ' ' + ' KMGTP'.charAt(e) + 'B'
}

const getPermissionString = function (mode) {
  let permissionString = ''
  permissionString += mode & 400 ? 'r' : '-'
  permissionString += mode & 200 ? 'w' : '-'
  permissionString += mode & 100 ? 'x' : '-'
  permissionString += mode & 40 ? 'r' : '-'
  permissionString += mode & 20 ? 'w' : '-'
  permissionString += mode & 10 ? 'x' : '-'
  permissionString += mode & 4 ? 'r' : '-'
  permissionString += mode & 2 ? 'w' : '-'
  permissionString += mode & 1 ? 'x' : '-'

  return permissionString
}

module.exports = fp(async function (fastify, opts) {
  fastify.decorate('getDirectoryDetails', async function (directoryPath = '/') {
    const resolvedPath = path.join(process.env.MOUNT_PATH, directoryPath)
    console.log(resolvedPath)

    try {
      let files = await readdir(resolvedPath)

      files = files.map((file) => {
        const filePath = path.join(resolvedPath, file)
        const parsedPath = path.parse(filePath)
        return new Promise(async (resolve) => {
          try {
            const fileStats = await stat(filePath)

            resolve({
              name: parsedPath.name,
              directory: fileStats.isDirectory(),
              path: filePath.replace(process.env.MOUNT_PATH, ''),
              extension: parsedPath.ext,
              size: sizeOf(fileStats.size),
              createdAt: fileStats.birthtime,
              permissions: getPermissionString(fileStats.mode)
            })
          } catch {
            resolve(false)
          }
        })
      })

      files = await Promise.all(files)

      return files.filter(file => !!file).sort((a, b) => {
        return Number(b.directory) - Number(a.directory)
      })
    } catch (e) {
      throw new Error(e.message)
    }

  })
})
