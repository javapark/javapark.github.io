---
title: "🎇 Next.js 미들웨어 설정하기 - 로그"
description: "Next.js 에 공통로그를 남기려고 Chat GPT 에게 물어보았다"
date: 2023-03-10
update: 2023-03-10
tags:
  - react
  - next
  - express
---

# 개요

SSR 에서 서버에서 공통 로그를 남기려고 하는데 어떻게 시작해야 하는지 Chat GPT 에게 물어보았다.

# 1. Next.js 를 이용한 React Application 샘플

다음은 Next.js를 사용하여 React 애플리케이션을 만드는 간단한 예제입니다.

먼저, Next.js를 설치해야합니다. **`npm`**을 사용하여 설치할 수 있습니다.

```
npm install next react react-dom
```

그리고 이제 다음과 같이 **`pages`** 폴더를 만들고 **`index.js`** 파일을 생성합니다.

```
// pages/index.js

function Home() {
  return <div>Welcome to Next.js!</div>;
}

export default Home;

```

그리고 마지막으로 다음과 같이 **`package.json`** 파일에 다음을 추가하여 애플리케이션을 실행합니다.

```
{
  "scripts": {
    "dev": "next dev"
  }
}
```

이제 터미널에서 **`npm run dev`** 명령을 실행하고 브라우저에서 **`http://localhost:3000`**으로 이동하면 "Welcome to Next.js!"라는 텍스트가 표시되는 것을 볼 수 있습니다.

이것은 Next.js를 사용하여 생성된 매우 간단한 React 애플리케이션입니다. 이제 Next.js를 더 깊이 이해하고 컴포넌트, 라우팅, 데이터 가져오기 등을 추가하여 애플리케이션을 더 발전시킬 수 있습니다.

# 2. 라우팅 추가

다음은 Next.js에서 라우팅을 추가하는 방법입니다.

1. **`pages`** 폴더 안에 새로운 파일을 생성하여 라우트를 추가합니다. 파일 이름은 라우트 경로와 일치해야합니다.

```
// pages/about.js

function About() {
  return <div>About us</div>;
}

export default About;

```

1. **`Link`** 컴포넌트를 사용하여 라우트로 이동할 수 있는 링크를 만듭니다.

```
// pages/index.js

import Link from 'next/link';

function Home() {
  return (
    <div>
      <div>Welcome to Next.js!</div>
      <Link href="/about">
        About us
      </Link>
    </div>
  );
}

export default Home;

```

1. **`next/router`** 모듈을 사용하여 프로그래밍 방식으로 라우팅을 수행할 수 있습니다.

```
jsxCopy code
// pages/index.js

import { useRouter } from 'next/router';

function Home() {
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    router.push('/about');
  };

  return (
    <div>
      <div>Welcome to Next.js!</div>
      <Link href="/about">
        About us
      </Link>
      <button onClick={handleClick}>Go to about page</button>
    </div>
  );
}

export default Home;

```

이제 **`http://localhost:3000`**에서 클릭 가능한 링크와 버튼이 있으며, 클릭하면 **`http://localhost:3000/about`** 페이지로 이동합니다.

# 3. 요청 마다 로그를 남기려면?

Next.js에서 각 요청마다 로그를 남기려면 미들웨어 함수를 사용할 수 있습니다. 미들웨어 함수는 요청과 응답에 대한 핸들러 함수로, 이를 사용하여 로그를 남기고 다음 미들웨어로 요청을 전달할 수 있습니다.

다음은 Next.js에서 미들웨어 함수를 사용하여 각 요청마다 로그를 남기는 방법입니다.

1. **`server.js`** 파일을 생성합니다. 이 파일은 Next.js에서 서버 측 렌더링을 구성하는 데 사용됩니다.

```
// server.js

const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // 미들웨어 함수를 등록합니다.
  server.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});

```

1. **`server.js`** 파일에서 등록한 미들웨어 함수는 각 요청마다 로그를 출력합니다. **`console.log`** 대신 파일에 로그를 기록하거나 로그 서버로 전송하는 등의 작업을 수행할 수도 있습니다.

이제 Next.js 애플리케이션을 시작하면 각 요청에 대한 로그가 콘솔에 출력됩니다. 미들웨어 함수를 사용하면 요청을 가로채고 필요한 작업을 수행할 수 있으므로, 요청을 기록하는 것 외에도 인증, 권한 부여, 캐싱 등의 작업을 수행할 수 있습니다.

# 4. 실행방법

**`server.js`** 파일을 만든 후에는 다음 명령어를 사용하여 Next.js 애플리케이션을 실행합니다.

```
node server.js
```

이 명령어는 Node.js로 **`server.js`** 파일을 실행합니다. **`server.js`** 파일은 Next.js에서 서버 측 렌더링을 구성하는 데 사용되므로, 이 파일을 실행하면 Next.js 애플리케이션이 서버에서 실행됩니다.

애플리케이션이 실행되면 브라우저에서 **`http://localhost:3000`**에 접속하여 애플리케이션을 확인할 수 있습니다. 이때 **`server.js`** 파일에서 등록한 미들웨어 함수가 요청을 가로채고 로그를 남길 것입니다.

서버에서 애플리케이션을 실행하려면 **`server.js`** 파일이 포함된 디렉토리에서 위 명령어를 실행해야 합니다.

# 결과

```yaml
[2023-03-08T08:03:00.827Z] GET /_next/static/chunks/webpack.js?ts=1678262580782
[2023-03-08T08:03:00.831Z] GET /_next/static/chunks/main.js?ts=1678262580782
[2023-03-08T08:03:00.834Z] GET /_next/static/chunks/react-refresh.js?ts=1678262580782
[2023-03-08T08:03:00.837Z] GET /_next/static/chunks/pages/_app.js?ts=1678262580782
[2023-03-08T08:03:00.841Z] GET /_next/static/chunks/pages/index.js?ts=1678262580782
[2023-03-08T08:03:00.842Z] GET /_next/static/development/_buildManifest.js?ts=1678262580782
[2023-03-08T08:03:00.848Z] GET /_next/static/development/_ssgManifest.js?ts=1678262580782
[2023-03-08T08:03:01.055Z] GET /_next/static/development/_devMiddlewareManifest.json
[2023-03-08T08:03:03.658Z] GET /
[2023-03-08T08:03:03.682Z] GET /_next/static/chunks/webpack.js?ts=1678262583664
[2023-03-08T08:03:03.683Z] GET /_next/static/chunks/main.js?ts=1678262583664
[2023-03-08T08:03:03.684Z] GET /_next/static/chunks/react-refresh.js?ts=1678262583664
[2023-03-08T08:03:03.688Z] GET /_next/static/chunks/pages/_app.js?ts=1678262583664
[2023-03-08T08:03:03.689Z] GET /_next/static/chunks/pages/index.js?ts=1678262583664
[2023-03-08T08:03:03.690Z] GET /_next/static/development/_buildManifest.js?ts=1678262583664
[2023-03-08T08:03:03.693Z] GET /_next/static/development/_ssgManifest.js?ts=1678262583664
[2023-03-08T08:03:03.885Z] GET /_next/static/development/_devMiddlewareManifest.json
[2023-03-08T08:03:05.912Z] GET /_next/static/development/_devPagesManifest.json
[2023-03-08T08:03:05.920Z] GET /_next/static/chunks/pages/about.js
wait  - compiling /about...
```
