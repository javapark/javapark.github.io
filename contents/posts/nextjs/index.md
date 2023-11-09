---
title: "🎇 Next.js 미들웨어 설정하기"
description: "Next.js 에 공통로그를 남기려고 Chat GPT 에게 물어보았다"
date: 2023-09-14
update: 2023-11-09
tags:
  - react
  - next
---

# next.js에서 미들웨어 사용하기

Next.js에서 미들웨어를 사용하려면 next.config.js 파일을 생성하고 next.config.js 파일에서 middleware를 설정해야 합니다. 미들웨어는 페이지의 요청을 처리하기 전에 실행되는 함수로, 요청을 가로채고 수정할 수 있는 기능을 제공합니다.

다음은 Next.js에서 미들웨어를 사용하는 방법입니다:

1. next.config.js 파일 생성: 프로젝트 루트 디렉토리에 next.config.js 파일을 생성합니다.

2. 미들웨어 함수 작성: 미들웨어 함수를 작성합니다. 미들웨어 함수는 요청(request), 응답(response), 그리고 next() 함수를 인자로 받습니다. 예를 들어, 간단한 로깅 미들웨어를 작성해보겠습니다.


```javascript
// middleware/logger.js

export default function logger(req, res, next) {
  console.log(`Request received for: ${req.url}`);
  next(); // 다음 미들웨어나 핸들러로 요청을 전달
}
```


3. `next.config.js`에서 미들웨어 설정: `next.config.js`` 파일에서 미들웨어를 설정합니다. 미들웨어를 적용할 페이지나 API 경로를 지정할 수 있습니다.

```javascript
// next.config.js

module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api-handler/:path*',
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/old-route',
        destination: '/new-route',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
  async middleware() {
    return [
      '~/middleware/logger.js', // 미들웨어 파일의 상대 경로나 모듈 경로를 지정
    ];
  },
};
```

위 예제에서는 logger.js 미들웨어를 설정에 추가하였습니다. 또한, rewrites, redirects, headers 섹션을 사용하여 리라이트, 리다이렉트, 헤더를 조작하는 미들웨어를 설정할 수도 있습니다.

이제 Next.js 애플리케이션에서 미들웨어를 사용할 수 있습니다. 만약 특정 페이지나 API 경로에만 미들웨어를 적용하고 싶다면, next.config.js에서 해당 경로에 대한 미들웨어를 설정할 수 있습니다.