(async () => {
    const {Observable, Subject} = require('rxjs')
    const rxjsOperators = require('rxjs/operators')
    const redis = require('redis')
    const sleep = require('../util/sleep')
    const redisKey = require('../share/redis-key')

    const url$ = new Subject()
    const redisClient = redis.createClient()

    while (true) {
        console.log('1초마다 실행하나?')
        redisClient.lpop(redisKey.redis_sample_key, (err, reply) => {
            if (err) url$.error(err)

            url$.next(reply)
        })


        url$.pipe(
            rxjsOperators.bufferTime(3000)
        )
            .subscribe(value => console.log(`subscribe value is `, value))

        await sleep(1000)
    }
})()