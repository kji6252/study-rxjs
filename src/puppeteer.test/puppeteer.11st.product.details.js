const puppeteer = require('puppeteer');
const rxjs = require('rxjs')
const rxjsOperators = require('rxjs/operators')

const productUrls = (productNo) => {
    return [`http://www.11st.co.kr/product/SellerProductDetail.tmall?method=getSellerProductDetail&prdNo=${productNo}`
        , `http://m.11st.co.kr/MW/Product/productBasicInfo.tmall?prdNo=${productNo}`]
}

(async () => {
    const productNo = Number(process.argv[2])

    if(Number.isNaN(productNo) || productNo <= 0){
        console.log('잘못된 상품번호가 들어왔습니다.', productNo)
        process.exit(1)
    }

    puppeteer.launch({ width: 1920
        , height: 1080, headless: false}).then(async browser => {

        rxjs.from(productUrls(productNo))
            .pipe(
                //rxjsOperators.flatMap(url => url)
            )
            .subscribe( async url => {
                console.log(url)
                const page = await browser.newPage()
                page.setViewport({
                    width: 1920
                    , height: 1080
                })
                const response = await page.goto(url,{waitUntil: 'networkidle2'})
                console.log('response is',response.headers())
            }, console.error, () => console.log('성공적으로 끝남'))
    });
})()

