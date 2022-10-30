const PROXY_CONFIG = [
  {
    context: ['/api'],
    target: 'http://0.0.0.0:3000',
    secure: false,
    changeOrigin: true
  }
]

module.exports = PROXY_CONFIG
