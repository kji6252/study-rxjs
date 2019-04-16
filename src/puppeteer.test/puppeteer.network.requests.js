const puppeteer = require('puppeteer');
const rxjs = require('rxjs')
const rxjsOperators = require('rxjs/operators')
const requestUrls = [];
const responseUrls = [];

puppeteer.launch({headless: false}).then(async browser => {
    const page = await browser.newPage();
    await page.setRequestInterception(true);

    rxjs.fromEvent(page, 'request')
        .pipe(
            rxjsOperators.filter(value => value) //null 체크
           // ,rxjsOperators.bufferTime(3000) // 3초 동안 모음
            //,rxjsOperators.flatMap(value => value)  // 리스트를 개별 객체로 바꿈
        )
        .subscribe(interceptedRequest => {
            requestUrls.push(interceptedRequest.url())
            if (interceptedRequest.url().endsWith('.png') || interceptedRequest.url().endsWith('.jpg'))
                interceptedRequest.abort();
            else
                interceptedRequest.continue();
        })

    rxjs.fromEvent(page, 'response')
        .pipe(
            rxjsOperators.filter(value => value) //null 체크
            // ,rxjsOperators.bufferTime(3000) // 3초 동안 모음
            //,rxjsOperators.flatMap(value => value)  // 리스트를 개별 객체로 바꿈
        )
        .subscribe(response => {
            responseUrls.push(response.url())
        })

    await page.goto('http://www.11st.co.kr/html/main.html', {waitUntil: "networkidle2"});

    console.log(requestUrls.length)
    console.log(responseUrls.length)
    await browser.close();
});