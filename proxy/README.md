# api-proxy

프론트엔드 개발자가 개발환경에서 CORS이슈 등을 겪을때, 로컬에서 프록시를 제공해주는 간단한 nodejs 서버입니다.

## 설치 및 시작

1. nodejs 가 설치되어있어야 합니다.
2. 해당 repository를 clone 합니다.
3. `npm install`
4. `proxy.config.json` 을 알맞게 수정합니다.
5. `npm start`
6. `http://localhost:18000` 또는 `http://127.0.0.1:18000` 으로 api 호출합니다.

## 포트 변경

기본값으로 `18000` 포트를 사용하고 있지만, 로컬에 실행중인 다른 서버와 겹치지만 않는다면 얼마든지 다른 포트로 변경 가능합니다.
`proxy.config.js` 의 `port` 값을 변경하세요

## 프록시 추가

`proxy.config.js` 의 `list` 배열에 프록시할 설정을 객체로 넣으세요.
list 배열의 요소들은 다음과 같은 구조의 객체여야 합니다.

| key    | type   | format                          | description                   |
|--------|--------|---------------------------------|-------------------------------|
| key    | string | 알파벳, 숫자, 하이픈, 밑줄 조합        | 다른 요소와 구분가능한 유니크한 문자열 |
| target | string | url (protocol + host)       | 프록시 대상 서버의 URL            |

여러개의 api 서버를 동시에 프록시 할 수 있으며, 이때 `key`는 반드시 각각 구분되어야 합니다.

## Best Practice

프론트엔드 프로젝트에서 api 요청 주소는 하드코딩 하는것보다, 개발환경/프로덕션환경 별 기본 url을 맞출 수 있는 wrapper를 만들어서 쓰는게 제일 좋습니다.

예를 들어,
- create-react-app 으로 만들어진 프로젝트이고
- httpRequest 를 `axios` 를 통해서 하며
- `http://foo.com/api`, `https://api.bar.com`, `http://foobar.com:8000/api` 세 개의 api를 프록시 해야 한다면

1. 프록시서버의 `proxy.config.json` 는 이렇게 작성합니다.

```json
{
  "port": 18000,
  "list": [
    {
      "key": "foo-proxy",
      "target": "http://foo.com"
    },
    {
      "key": "bar-proxy-api",
      "target": "https://api.bar.com"
    },
    {
      "key": "foobar",
      "target": "http://foobar.com:8000"
    },
  ]
}
```

1. 작업중인 프론트엔드 프로젝트 폴더에서 `src/utils/api.js` 파일을 생성합니다.
2. 다음과 같이 해당 파일을 작성합니다.

```js
import axios from 'axios'

const isDev = ['localhost:3000', '127.0.0.1:3000'].includes(window.location.host)

export const fooApi = axios.create({
  baseURL: isDev ? 'http://127.0.0.1:18000/foo-proxy' : 'http://foo.com'
})

export const barApi = axios.create({
  baseURL: isDev ? 'http://127.0.0.1:18000/bar-proxy-api' : 'http://api.bar.com'
})

export const foobarApi = axios.create({
  baseURL: isDev ? 'http://127.0.0.1:18000/foobar' : 'http://foobar.com:8000'
})
```

3. 프론트엔드 프로젝트에서 api 호출을 해야할때 이렇게 사용합니다.

```js
import { fooApi, barApi } from './src/utils/api'

// 개발환경일땐, 프록시의 서버의 foo-proxy 키에 걸린 프록시 url을 거쳐서 요청이 갑니다.
// 개발환경이 아닐땐, http://foo.com/api/my-url/1234 로 요청이 갑니다.
fooApi.get('/api/my-url/1234')
```

## 기타 정보

- 버그 발견, 제보, 수정요청은 github issue 통해서 부탁드립니다.
- Lisence: MIT