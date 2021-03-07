const vuepress = "/Vuepress";
const CodeSpitz = "/CodeSpitz";
const Javascript = "/Javascript";
const JavascriptDomain = `${Javascript}/Domain`;
const JavascriptDesign = `${Javascript}/Design`;
const CodeSpitzNBJS = `${CodeSpitz}/None-Blocking-Javascript`;
const CodeSpitzOOJS = `${CodeSpitz}/Object-Oriented-Javascript`;
const Book = `/Book`;
const OOPPrinciple = `${Book}/OOP-Principle`;
const Review2020 = `/Review/2020-year`;

module.exports = [
  {
    title: "VuePress",
    children: [
        { title: "VuePress 시작하기", path: `/vuepress/vuepress` }
        ,{ title: "VuePress Plugins", path: `/vuepress/vuepress_plugins` }
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
