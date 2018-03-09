---
layout: post
title: post 계정 만료일 지정
categories: [postgres]
tags: [postgres]
description: postgres 계정 만료일 지정하기
---

postgres 사용자 계정 만료일 확인
=> select usename, valuntil from pg_user;

만료일 변경
=> ALTER USER 사용자명 valid until ‘jan 1 2038’;

