const rxjs = require('rxjs')
const rxjsOperators = require('rxjs/operators')
const RedisServer = require('redis-server')
const redisServer = new RedisServer()

redisServer.open()
    .then(() => console.log(`Redis Server is Running`))
    .catch(reason => console.error('Redis Server 실행중 에러 발생',reason))

rxjs.fromEvent(process, 'SIGINT')
    .pipe(
        rxjsOperators.take(1)
    )
    .subscribe(value => {
        console.log('process SIGINT event 발생', value)
        if(redisServer.isRunning){
            redisServer.close()
                .then(() => (console.log('Redis Server Exit')))
                .catch(reason => console.log('Redis Server 종료중 에러 발생',reason))
        }
    })

module.exports = redisServer