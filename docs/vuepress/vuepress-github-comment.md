# Github + Utterances 연동
- 1. Utterances [설치](https://github.com/apps/utterances) : Github repo 지정 후 설치
- 2. 댓글 컴포넌트 추가 (`.vuepress/components/Comment.vue`)
```
<template>
  <div ref="comment"></div>
</template>
<script>
export default {
  mounted() {
    // script tag 생성
    const utterances = document.createElement("script");
    utterances.type = "text/javascript";
    utterances.async = true;
    utterances.crossorigin = "anonymous";
    utterances.src = "https://utteranc.es/client.js";

    utterances.setAttribute("issue-term", "pathname");
    utterances.setAttribute("theme", "github-light"); 
    utterances.setAttribute("repo", `javapark/til-comment`); 
    this.$refs.comment.appendChild(utterances);
  }
};
</script>
```
- 3. 댓글 넣기
원하는 곳에 `<Comment />` 를 넣어야 하고 원하지 않는 곳에 댓글을 사용하지 않을 수 있다
```
# 제목
내용

<Comment />
```

## Ref
- [기억보다 기록을](https://kyounghwan01.github.io/blog/Vue/vuepress/vuepress-github-comment/#utterances-%EB%A7%81%ED%81%AC-%EA%B1%B8-%EA%B9%83%ED%97%99-%EB%A6%AC%ED%8F%AC-%EC%83%9D%EC%84%B1)