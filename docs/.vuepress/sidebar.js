module.exports = [
  {
    title: "VuePress",
    children: [
        { title: "VuePress 시작하기", path: `/vuepress/vuepress_started` }
        ,{ title: "VuePress Plugins", path: `/vuepress/vuepress_plugins` }
    ],
  },
  {
    title: "Svelte",
    children: [
        { title: "Svelte 따라하기", path: `/svelte/` }
        ,{ title: "Todo 예제", path: `/svelte/todo` }
    ],
  },
  {
    title: "VS Code",
    children: [
        { title: "VS code 환경설정", path: `/vscode/vscode_config` }
    ],
  },
  {
    title: "ETC",
    children: [
        { title: "DB 접근제어", path: `/security/db_access_control` }
        ,{ title: "배포 전략", path: `/deployment/strategy` }
        ,{ title: "중복 로그인", path: `/security/duplicated_login` }
        ,{ title: "MSA 란?", path: `/msa/msa_intro` }
    ],
  },
];
