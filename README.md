# 개요
Node.js기반 Rxjs와 redis client학습하기 위한 스터디


# 준비
npm packages, redis 설치 해야함

```sh
npm i
```
redis를 127.0.0.1:6379로 실행

# 샘플 실행

## redis의 pub/sub (sub을 rxjs Observable로 구현)

```sh
npm run start:redis:pubsub
``` 

## redis의 rpush/lpop (lpop시 rxjs Observable로 구현)
```sh
npm run start:redis:rpushlpop
```