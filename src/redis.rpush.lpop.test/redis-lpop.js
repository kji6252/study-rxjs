const {Observable} = require('rxjs')
const rxjsOperators = require('rxjs/operators')
const redis = require('redis')
const sleep = require('../util/sleep')
const redisKey = require('../share/redis-key')

const url$ = new Observable(async subscriber => {
    const redisClient = redis.createClient()

    while (true) {
        console.log('1초마다 실행하나?')
        redisClient.lpop(redisKey.redis_sample_key, (err, reply) => {
            subscriber.next(reply)

            if(err) subscriber.error(err)
        })

        await sleep(1000)
    }

})

url$
    .pipe(
        rxjsOperators.bufferTime(3000)
    )
    .subscribe(value => console.log(`subscribe value is `,value))