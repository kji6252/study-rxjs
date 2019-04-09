(async () => {
    const redis = require('redis')
    const redisClient = redis.createClient()
    const sleep = require('../util/sleep')
    const redisKey = require('../share/redis-key')

    while (true) {
        console.log('1초마다 실행하나?')
        redisClient.rpush(
            redisKey.redis_sample_key
            , '{"json_data_key":"json_data_value"}'
            , redis.print)
        await sleep(1000)
    }
})()