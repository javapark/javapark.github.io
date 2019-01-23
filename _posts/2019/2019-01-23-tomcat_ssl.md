---
layout: post
title: 톰캣 SSL 구성
categories: [https]
tags: [https, tomcat, ssl]
description: 톰캣 SSL 구성에 대해 간단하게 알아본다.
comments: true
---

# 개요
- jdk 에 포함된 keytool 을 이용하여 tomcat 의 SSL 을 적용하는 방법을 공유한다. 
- keytool 은 키 및 인증서 관리 유틸리티이다. 이를 통해 사용자는 디지털 서명을 사용하여 자체 인증 또는 데이터 무결성 및 인증 서비스에 사용할 공용/개인 키 쌍 및 인증서를 관리할 수 있다. [링크](https://docs.oracle.com/javase/8/docs/technotes/tools/windows/keytool.html)

# keystore 생성
keytool -genkey 를 이용하여 키 쌍을 생성한다. 이때 부가정보를 추가 입력해야 한다.

<pre>
C:\data\ssl>keytool -genkey -help
keytool -genkeypair [OPTION]...

키 쌍을 생성합니다.

옵션:

 -alias <alias>                  처리할 항목의 별칭 이름
 -keyalg <keyalg>                키 알고리즘 이름
 -keysize <keysize>              키 비트 크기
 -sigalg <sigalg>                서명 알고리즘 이름
 -destalias <destalias>          대상 별칭
 -dname <dname>                  식별 이름
 -startdate <startdate>          인증서 유효 기간 시작 날짜/시간
 -ext <value>                    X.509 확장
 -validity <valDays>             유효 기간 일 수
 -keypass <arg>                  키 비밀번호
 -keystore <keystore>            키 저장소 이름
 -storepass <arg>                키 저장소 비밀번호
 -storetype <storetype>          키 저장소 유형
 -providername <providername>    제공자 이름
 -providerclass <providerclass>  제공자 클래스 이름
 -providerarg <arg>              제공자 인수
 -providerpath <pathlist>        제공자 클래스 경로
 -v                              상세 정보 출력
 -protected                      보호되는 메커니즘을 통한 비밀번호

사용 가능한 모든 명령에 "keytool -help" 사용

C:\data\ssl>keytool -genkey -validity 365 -alias tomcat -keyalg RSA -keystore .keystore
키 저장소 비밀번호 입력:
새 비밀번호 다시 입력:
이름과 성을 입력하십시오.
  [Unknown]:  javapark
조직 단위 이름을 입력하십시오.
  [Unknown]:  javapark
조직 이름을 입력하십시오.
  [Unknown]:  javapark
구/군/시 이름을 입력하십시오?
  [Unknown]:  javapark
시/도 이름을 입력하십시오.
  [Unknown]:  javapark
이 조직의 두 자리 국가 코드를 입력하십시오.
  [Unknown]:  KR
CN=javapark, OU=javapark, O=javapark, L=javapark, ST=javapark, C=KR이(가) 맞습니까?
  [아니오]:  예

<tomcat>에 대한 키 비밀번호를 입력하십시오.
        (키 저장소 비밀번호와 동일한 경우 Enter 키를 누름):

Warning:
JKS 키 저장소는 고유 형식을 사용합니다. "keytool -importkeystore -srckeystore .keystore -destkeystore .keystore -deststoretype pkcs12"를 사용하는 산업 표준 형식인 PKCS12로 이전하는 것이 좋습니다.

C:\data\ssl>keytool -importkeystore -srckeystore .keystore -destkeystore .keystore -deststoretype pkcs12
소스 키 저장소 비밀번호 입력:
tomcat 별칭에 대한 항목이 성공적으로 임포트되었습니다.
임포트 명령 완료: 성공적으로 임포트된 항목은 1개, 실패하거나 취소된 항목은 0개입니다.

Warning:
".keystore"을(를) Non JKS/JCEKS(으)로 이전했습니다. JKS 키 저장소가 ".keystore.old"(으)로 백업되었습니다.
</pre>

# tomcat server.xml 수정

<pre>
<Connector SSLEnabled="true" clientAuth="false" keystoreFile="/data/ssl/.keystore" keystorePass="changeit" maxThreads="200" port="443" protocol="org.apache.coyote.http11.Http11NioProtocol" scheme="https" secure="true" sslProtocol="TLS"/>
</pre>


# 참고자료
- https://opentutorials.org/course/228/4894
- http://tomcat.apache.org/tomcat-8.5-doc/ssl-howto.html#Introduction_to_SSL