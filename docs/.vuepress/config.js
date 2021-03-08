const sidebar = require("./sidebar");

module.exports = {
  title: "Today I Learned",
  description: "Javapark",
  themeConfig: {
    logo: "https://avatars.githubusercontent.com/u/288315?s=400&v=4", // 로고 이미지
    // sidebar :'auto'
    nav: [
      {text: 'Home', link : '/'},
      {text: 'About', link : '/about/'},
      {text: 'Tags', link : '/tag/'},
      {text: 'Repo', link : 'https://github.com/javapark/javapark.github.io'},
    ],
    sidebar,
    // ,nav: [
    //   { text: 'Home', link: '/' },
    //   {
    //     text: 'About',
    //     items: [
    //        { text: 'About Me', link: '/about/me' },
    //        { text: 'About Blog', link: '/about/blog' }
    //     ]
    //   }
    // ]
  },
  // head: [
  //   [
  //     "script",
  //     {
  //       "data-ad-client": "ca-pub-4039568972335207",
  //       async: true,
  //       src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js",
  //     },
  //   ],
  // ],
  markdown: {
    lineNumbers: true,
  },

  plugins: [
    ["@vuepress/blog"],
    ["@vuepress/nprogress"],
    [
      "vuepress-plugin-google-adsense",
      {
        adClient: "ca-pub-4039568972335207", // replace it with your adClient
      },
    ],
    [
      "@vuepress/google-analytics",
      {
        ga: "UA-38514061-2", // UA-00000000-0
      },
    ],
    ['@vuepress/back-to-top', true],
    ["@vuepress/last-updated"],
    ['@vuepress/register-components'],
    ["sitemap", { hostname: "https://javapark.github.io/" }],
  ],
  // themeConfig: {
  //   nav: [
  //     {text: 'Home', link : '/'},
  //   ],
  //   sidebar: [
  //     ['/about', 'about']
  //   ]
  // },
  //   ,plugins: [
  //     ['@vuepress/last-updated'],//git에 마지막 커밋
  //     ['@vuepress/back-to-top', true],//위로 올라가기
  //     '@vuepress/pagination',//다음글, 이전글
  //     ['@vuepress/search', {//검색창
  //         searchMaxSuggestions: 10
  //     }],
  //     ['@vuepress/active-header-links', {//헤더 바로가기
  //         sidebarLinkSelector: '.sidebar-link',
  //         headerAnchorSelector: '.header-anchor',
  //         headerTopOffset: 120
  //     }]
  // ]
};