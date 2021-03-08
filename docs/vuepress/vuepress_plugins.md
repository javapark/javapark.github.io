# VuePress Plugins

## Google Analytics
구글 애널리틱스는 현재 구글 마케팅 플랫폼 브랜드 내의 플랫폼으로서, 웹사이트 트래픽을 추적하고 보고하는 구글이 제공하는 웹 애널리틱스 서비스이다

- [@vuepress/plugin-google-analytics](https://vuepress.vuejs.org/plugin/official/plugin-google-analytics.html)

### Install
```sh
yarn add -D @vuepress/plugin-google-analytics
```

### Usage
``` js
module.exports = {
  plugins: [
    [
      '@vuepress/google-analytics',
      {
        'ga': '' // UA-00000000-0
      }
    ]
  ]
}
```

## Google Aadsense
구글 애드센스는 광고주를 위한 애드워즈와 대비되는 구글의 광고 프로그램이다. 웹사이트 소유자는 애드센스에 가입함으로써 광고 수익을 구글과 나눌 수 있다.
- [vuepress-plugin-google-adsense](https://www.npmjs.com/package/vuepress-plugin-google-adsense)

### Install
``` sh
yarn add -D vuepress-plugin-google-adsense
```

### Usage
``` js
module.exports = {
  plugins: [
    [
      "vuepress-plugin-google-adsense",
      {
        adClient: "ca-pub-2245427233262012", // replace it with your adClient
      },
    ],
  ],
};
```

<Comment/>