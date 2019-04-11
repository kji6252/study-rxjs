const rxjs = require('rxjs')
const rxjsOperators = require('rxjs/operators')
const redis = require('redis')
const redisClient = redis.createClient()
const redisKey = require('../share/redis-key')


const redisLpop$ = new rxjs.Observable(subscriber => {
    redisClient.lpop(redisKey.redis_sample_key, (err, reply) => {
        if(err) subscriber.error(err)

        subscriber.next(reply)
        subscriber.complete()
    })
})

rxjs.fromEvent(redisClient, 'connect')
    .pipe(
        rxjsOperators.bufferTime(3000),
        rxjsOperators.concatMap( () => redisLpop$)
    )
    .subscribe(console.log)
