const {Observable} = require('rxjs')
const redis = require('redis')

const url$ = new Observable(subscriber => {
    const redisClient = redis.createClient()

    redisClient.on('message', (channel, message) => {
        //console.log(`redisClient message event on >> channel=${channel} message=${message}`)
        subscriber.next({channel, message})
    })
    redisClient.subscribe('screenshot_url')

})

url$.subscribe(value => console.log(value))


module.exports = url$