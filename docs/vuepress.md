# VuePress로 TIL 을 시작하기
## 시작하기

1. Initialize with preferred package manager
```
yarn init
```

2. Install VuePress locally
```
yarn add -D vuepress
```

3. Create first document
```
mkdir docs && echo '# Hello VuePress' > docs/README.md
```

4. Add some `scripts` to `package.json`
```
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
```

5. Serve the documentation site in the local server
```
yarn docs:dev
```

## TIL 접속
[https://javapark-til.netlify.app](https://javapark-til.netlify.app)

## Ref
- [Vuepress 로 기술문서 빠르게 만들어보자](https://limdongjin.github.io/vuejs/vuepress/#table-of-contents)
- [VuePress Getting Started](https://vuepress.vuejs.org/guide/getting-started.html#manual-installation)
- [VuePress Deploying](https://vuepress.vuejs.org/guide/deploy.html)