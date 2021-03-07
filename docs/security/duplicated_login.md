# 중복로그인
Spring Security 를 사용하지 않고 순수 java 를 이용하여 중복 로그인을 처리하는 방법을 적용해 보았다. 

## javax.servlet.http.HttpSessionListener 와 javax.servlet.http.HttpSessionAttributeListener의 구현체를 만든다
```java
import java.util.concurrent.ConcurrentHashMap;
import javax.servlet.ServletConfig;
import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionAttributeListener;
import javax.servlet.http.HttpSessionBindingEvent;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextImpl;
import org.springframework.stereotype.Component;

@Component
public class SessionAttributeListener implements HttpSessionAttributeListener {
	public static ConcurrentHashMap<HttpSession, String> sessionMap = new ConcurrentHashMap<>();

	public void init(ServletConfig config) {
	}

	@Override
	public void attributeAdded(HttpSessionBindingEvent event) {
		HttpSession session = event.getSession();
		String attributeName = event.getName();
		if (attributeName.equals("SPRING_SECURITY_CONTEXT")) {
			if (event.getValue() instanceof SecurityContextImpl) {
				SecurityContextImpl securityContextImpl = (SecurityContextImpl) event.getValue();
				Authentication authentication = securityContextImpl.getAuthentication();
				String userId = authentication.getName();
				if (sessionMap.get(session) == null) {
					sessionMap.put(session, userId);
				}
			}
		}
	}

	@Override
	public void attributeRemoved(HttpSessionBindingEvent event) {
		String attributeName = event.getName();
		HttpSession session = event.getSession();
		if (attributeName.equals("SPRING_SECURITY_CONTEXT")) {
			if (event.getValue() instanceof SecurityContextImpl) {
				if (sessionMap.get(session) != null) {
					sessionMap.remove(session);
				}
			}
		}
	}

	@Override
	public void attributeReplaced(HttpSessionBindingEvent event) {
	}
}
```

## listener 적용 (web.xml)
```
<listener>
    <listener-class>xxx.login.SessionAttributeListener</listener-class>
</listener>
```

## 중복체크 로직 추가
```
private void duplicateCheck(String userId) {
    ConcurrentHashMap<HttpSession, String> sessionMap = SessionAttributeListener.sessionMap;
    Enumeration<HttpSession> keys = sessionMap.keys();
    while (keys.hasMoreElements()) {
        HttpSession session = (HttpSession) keys.nextElement();
        if(sessionMap.get(session).equals(userId)){
            session.invalidate();
        }
    }
}
```

## 마치며
- 멀티 인스턴스의 경우에도 잘 되지는 않을 것으로 보인다. 자체 인증 서버를 구축하여 우려되는 사항을 빠르게 해결할 수 있도록 해야 겠다

## Ref
https://oingdaddy.tistory.com/10

