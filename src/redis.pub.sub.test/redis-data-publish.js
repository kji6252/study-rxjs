(async () => {
    const redisServer = require('../share/redis-server-stator')
    const redisClient = require('redis').createClient()
    const sleep = require('../util/sleep')
    const redisKey = require('../share/redis-key')

    while (true) {
        console.log('1초마다 실행하나?')
        redisClient.publish(redisKey.redis_sample_key, `http://www.11st.co.kr?t=${new Date().toISOString()}`)
        redisClient.publish(redisKey.redis_sample_key, `http://www.11st.co.kr?t=${new Date().toISOString()}`)
        redisClient.publish(redisKey.redis_sample_key, `http://www.11st.co.kr?t=${new Date().toISOString()}`)
        await sleep(1000)
    }
})()