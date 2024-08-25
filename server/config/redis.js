const Redis = require('ioredis')

const redis = new Redis({
    port: 12400,
    host: 'redis-12400.c334.asia-southeast2-1.gce.redns.redis-cloud.com',
    password: '3KawZI8GytRLEGd5dUcztIueScHVfau0'
})

module.exports = redis