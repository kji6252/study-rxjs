"use strict"

const Observable = require('rxjs').Observable
const redis = require('redis')

module.exports = function OORedis (redisCmdName, redisParams, redisConfig={host: 'localhost', port: 6379}) {
    return new Observable(function (observer) {
        const rclient = redis.createClient(redisConfig.port, redisConfig.host)
        rclient.on('connect', function () {
            if ( !typeof rclient[redisCmdName] === 'function' )  {
                observer.error( redisCmdName + ' not valid redis cmd')
            }

            rclient[redisCmdName](redisParams, (err, result) => {
                if (err) observer.error(err)

                observer.next(result)
                observer.complete()
            })
        })
        return {
            unsubscribe: () => {
                rclient.quit()
            }
        }
    })
}
