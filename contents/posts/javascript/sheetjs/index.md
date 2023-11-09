---
title: "SheetJS"
description: "스프레드 시트 파일 ( 예. Excel, CSV 및 기타 스프레드시트 ) 을 읽고 쓸수 있는 Javascript 라이브러리"
date: 2023-11-09
update: 2023-11-09
tags:
  - javascript
  - sheetjs
---

SheetJS는 다양한 형식의 스프레드시트 파일, 예를 들면 Excel (XLSX 및 XLS), CSV 및 기타 스프레드시트 형식을 읽고 쓸 수 있는 JavaScript 라이브러리입니다. 이 라이브러리를 사용하면 웹 애플리케이션에서 스프레드시트 데이터를 처리할 수 있는 강력한 API를 제공합니다.

SheetJS를 사용하면 서버 측 처리 없이도 브라우저에서 스프레드시트 데이터를 직접 조작할 수 있습니다. 이 라이브러리는 주로 웹 애플리케이션에서 Excel 파일 업로드, 데이터 내보내기 및 기타 스프레드시트 관련 작업을 처리하는 데 사용됩니다.

SheetJS를 사용하려면 스크립트 태그를 사용하거나 npm 또는 yarn과 같은 패키지 관리자를 사용하여 라이브러리를 프로젝트에 포함시킬 수 있습니다. 다음은 JavaScript에서 Excel 파일을 읽는 예제입니다:

1. 먼저 SheetJS 라이브러리를 HTML 파일에 포함시킵니다:
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.0/xlsx.full.min.js"></script>
```

2. 파일 업로드를 처리할 HTML 입력 요소를 만듭니다:
```html
<input type="file" id="file-input" />
<div id="output"></div>
```

3. 파일 업로드를 처리하고 Excel 데이터를 읽는 JavaScript 코드를 추가합니다:

```javascript
document.getElementById('file-input').addEventListener('change', handleFile, false);
function handleFile(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    const data = e.target.result;
    const workbook = XLSX.read(data, { type: 'binary' });

    // 첫 번째 시트를 읽고자 한다고 가정합니다
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // 시트 데이터를 객체 배열로 파싱합니다
    const jsonData = XLSX.utils.sheet_to_json(sheet);

    // 파싱된 데이터를 사용합니다
    displayData(jsonData);
  };

  reader.readAsBinaryString(file);
}

function displayData(data) {
  const outputDiv = document.getElementById('output');
  outputDiv.innerHTML = JSON.stringify(data, null, 2);
}
```

이 예제에서는 사용자가 파일을 선택하면 Excel 데이터를 읽고 파싱하여 화면에 표시하는 기본적인 동작을 구현한 것입니다.