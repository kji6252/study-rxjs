const {Subject} = require('rxjs')
const url$ = new Subject()

url$.next(`${__filename}에서 쏘는거임`)
url$.next(`${__filename}에서 쏘는거임`)
url$.next(`${__filename}에서 쏘는거임`)

url$.complete(`${__filename}에서 쏘는거임`)

module.exports = url$