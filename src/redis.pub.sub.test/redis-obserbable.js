const {Observable} = require('rxjs')
const redis = require('redis')
const redisKey = require('../share/redis-key')

const url$ = new Observable(subscriber => {
    const redisClient = redis.createClient()

    redisClient.on('message', (channel, message) => {
        //console.log(`redisClient message event on >> channel=${channel} message=${message}`)
        subscriber.next({channel, message})
    })
    redisClient.on('error', (channel, message) => {
        //console.log(`redisClient message event on >> channel=${channel} message=${message}`)
        subscriber.error({channel, message})
    })
    redisClient.on
    redisClient.subscribe(redisKey.redis_sample_key)

})

url$.subscribe(value => console.log(value))


//module.exports = url$