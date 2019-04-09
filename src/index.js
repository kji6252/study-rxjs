const rxjs = require("rxjs")
const {Subject} = require("rxjs")
const rxjsOperatators = require("rxjs/operators")
const counter = require("./share/counter")



const oneTwoThree$ = rxjs.of(1,2,3,)
    .pipe(
        rxjsOperatators.map(value => value * 2)
        , rxjsOperatators.map(value => counter.count+=value)
    )
    .subscribe(value => console.log(`next is ${value}`)
        , error => console.error(error)
        , () => console.log(`complate is ${counter.count}`)
    );
oneTwoThree$.unsubscribe()

//forkJoin은 여러개의 Array중 각각의 마지막값만 가져와서 합침
rxjs.forkJoin([1,2,3,],[8,8,9])
    .pipe()
    //forkJoin observables 3,9
    .subscribe(x => console.log(`forkJoin observables ${x}`))


rxjs.range(1, 10).subscribe( x => console.log(x))

console.dir(counter)

module.exports = urlSubject = new Subject();

urlSubject.subscribe(x => console.log(`urlSubject Next is ${x}`)
, error => console.error(`urlSubject Error `, error)
,() => console.log('urlSubject를 성공함'))



urlSubject.next('값이 간다')



urlSubject.next('값이 간다너도 ')


urlSubject.next('값이 간다 쟤도 ')
urlSubject.error({a:2, b:3})
urlSubject.complete()


const another$ = require('./util/anotherSubject')
another$.subscribe(value => console.log(`${__filename}에서 next 출력중 >> require에서 받아온 데이터`,value)
, error => console.error(`${__filename}에서 error 출력중 >> require에서 받아온 데이터`, error)
, () => console.log(`${__filename}에서 complate 출력중`))