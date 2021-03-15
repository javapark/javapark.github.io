# FileUpload Unittest
MockMvc 을 이용한 파일업로드 테스트 코드 작성 방법이다. 파일 업로드 테스트 시 필요한 파일, 파라미터, 세션등에 정보를 넣어 테스트 하는 방법은 아래와 같다. 

```xml
<dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <version>4.12</version>
    <scope>test</scope>
</dependency>

<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-test</artifactId>
    <version>4.3.16.RELEASE</version>
    <scope>test</scope>
</dependency>
```

``` java
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.fileUpload;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({ "file:src/main/webapp/WEB-INF/config/egovframework/springmvc/dispatcher-servlet.xml",
		"file:src/main/resources/egovframework/spring/*.xml" })
@WebAppConfiguration // WebApplicationContext를 생성할 수 있도록 하는 어노테이션
public class FileUploadControllerTest {
	private MockMvc mockMvc;
	protected MockHttpSession session;

	@Autowired
	FileUploadController controller;

	@After
	public void clean() {
		session.clearAttributes();
	}

	@Before
	public void setUp() {
		this.mockMvc = MockMvcBuilders.standaloneSetup(controller).build(); // test를 위한 MockMvc 객체 생성. testController
		session = new MockHttpSession();

		session.setAttribute(WebConstant.WORKSPACE_ID, "workspace1");
	}

	@Test
	public void testFileUpload() throws Exception {
		MockMultipartFile firstFile = new MockMultipartFile("file", "test.txt", "text/plain", "some other type".getBytes());
		mockMvc.perform(fileUpload("/file_upload").file(firstFile)
				.session(session)
				.param("param_1", "9").param("param_2", "5"))
				.andExpect(MockMvcResultMatchers.status().isOk());
	}

}

```