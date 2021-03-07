# VuePress 시작하기
VuePress 를 이용하여 TIL 을 작성하려고 한다. VuePress 를 이용하여 md 파일을 html 로 변환하고 이를 서비스 하려고 한다. 그럼 Vuepress 는 무엇인가?

## Vuepress 는 무엇?
1. Vuepress 는 Vue.js 로 개발되어진 정적 사이트 생성기이다
2. 기술문서 작성을 위해 최적화된 기본테마를 제공해준다
3. Plugin API를 제공해주어 플러그인을 제작하거나 적용할 수 있다. ( Google Analytics, PWA 를 손쉽게 적용가능함 )


## 기본 설치 및 빌드
``` sh
# global install
$ yarn global add vuepress

# install as a local dependency
$ yarn add -D vuepress

$ mkdir docs

# 마크다운 파일을 생성한다.
$ echo '# Hello VuePress' > docs/README.md
```

package.json 에 scripts 추가
``` js
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
```

``` sh
# Development Mode
$ yarn docs:dev

# build to static files
$ yarn docs:build
```

## Directory Structure
VuePress 에서 권장되는 구조는 아래와 같다
```
.
├── docs
│   ├── .vuepress (Optional)
│   │   ├── components (Optional)
│   │   ├── theme (Optional)
│   │   │   └── Layout.vue
│   │   ├── public (Optional)
│   │   ├── styles (Optional)
│   │   │   ├── index.styl
│   │   │   └── palette.styl
│   │   ├── templates (Optional, Danger Zone)
│   │   │   ├── dev.html
│   │   │   └── ssr.html
│   │   ├── config.js (Optional)
│   │   └── enhanceApp.js (Optional)
│   │ 
│   ├── README.md
│   ├── guide
│   │   └── README.md
│   └── config.md
│ 
└── package.json
```

:::warning Note
자세한 사항은 [VuePress 공식문서](https://vuepress.vuejs.org/guide/directory-structure.html#default-page-routing) 를 참고하길 바란다
:::   

## Default Page Routing
타겟 디렉토리로 `docs` 를 사용한다. 아래의 모든 '상대경로'는 `docs` 디렉토리에 상대적이다. 
기본 페이지 라우팅 경로는 다음과 같다
|경로|페이지 라우팅|
| :-- | :-- |
|`/README.md`|`/`|
|`/guide/README.md`|`/guide/`|
|`/config.md`|`/config.html`|


## Maekdown Extensions

### Syntax Highlighting in Code Blocks
input

<pre class="language-md">
``` js
export default {
  name: 'MyComponent',
  // ...
}
```
</pre>

output
``` js
export default {
  name: 'MyComponent',
  // ...
}
```

### Line Numbers
You can enable line numbers for each code blocks via config:
``` js
module.exports = {
  markdown: {
    lineNumbers: true
  }
}
```

## Deploying
### GitHub Pages
1. `docs/.vuepress/config.js` 에 base 설정
`https://github.com/<USERNAME>/<REPO>` 의 경우 base 는 "/<REPO>/" 가 됨

2. 프로젝트 내에 deploy.sh 설정
``` sh
#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run docs:build

# navigate into the build output directory
cd docs/.vuepress/dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f https://github.com/javapark/TIL.git master:gh-pages

cd -
```

3. `main.yaml` 설정
```
name: Build and Deploy
on: [push]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout
      uses: actions/checkout@main

    - name: Vuepress deploy
      uses: jenkey2011/vuepress-deploy@1.0.1
      env:
        ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}
        BUILD_SCRIPT: yarn && yarn docs:build
        TARGET_BRANCH: gh-pages
        BUILD_DIR: docs/.vuepress/dist
```

### [Netlify](https://vuepress.vuejs.org/guide/deploy.html#netlify)
1. [Netlify](https://www.netlify.com/) , setup up a new project from GitHub with the following settings:
- **Build Command:** vuepress build docs or yarn docs:build or npm run docs:build
- **Publish directory:** docs/.vuepress/dist
2. Hit the deploy button

## Ref
- [Vuepress 로 기술문서 빠르게 만들어보자](https://limdongjin.github.io/vuejs/vuepress/#table-of-contents)
- [VuePress](https://vuepress.vuejs.org/)