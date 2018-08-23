---
layout: post
title: DataTables warning: table id=sample_table - Cannot reinitialise DataTable ~ 
categories: [jquery, dataTable]
tags: [jquery, dataTable]
description: DataTables warning: table id=sample_table - Cannot reinitialise DataTable. For more information about this error, please see http://datatables.net/tn/3
---

### 현상
아래와 같은 절차로 컬럼값을 동적으로 변경하고자 할 경우에 3번의 메세지를 확인할 수 있다.
1. DataTable init  

   ```javascript
   table = $('#sample_table').dataTable({
       scrollY: 350,
       searching: false,
       data: [
             {'col1': 'data1', 'col2': 'data2', 'col3': 'data3','col4': 'data4', 'col5': 'data5', 'col6': 'data6' },
             {'col1': 'data1', 'col2': 'data2', 'col3': 'data3','col4': 'data4', 'col5': 'data5', 'col6': 'data6' },
             {'col1': 'data1', 'col2': 'data2', 'col3': 'data3','col4': 'data4', 'col5': 'data5', 'col6': 'data6' },
             {'col1': 'data1', 'col2': 'data2', 'col3': 'data3','col4': 'data4', 'col5': 'data5', 'col6': 'data6' }
             ],
       columns: [
                { title: 'head1', data: 'col1' },
                { title: 'head2',data: 'col2' },
                { title: 'head3',data: 'col3' },
                { title: 'head4',data: 'col4' },
                { title: 'head5',data: 'col5' },
                { title: 'head6',data: 'col6' }
       ]
   });

   ```
2. 표시 컬럼 변경한 후
    
   ``` javascript
   table = $('#sample_table').dataTable({
      scrollY: 350,
      searching: false,
      data: [
               {'col1': 'data1', 'col2': 'data2', 'col3': 'data3','col4': 'data4', 'col5': 'data5', 'col6': 'data6' },
               {'col1': 'data1', 'col2': 'data2', 'col3': 'data3','col4': 'data4', 'col5': 'data5', 'col6': 'data6' },
               {'col1': 'data1', 'col2': 'data2', 'col3': 'data3','col4': 'data4', 'col5': 'data5', 'col6': 'data6' },
               {'col1': 'data1', 'col2': 'data2', 'col3': 'data3','col4': 'data4', 'col5': 'data5', 'col6': 'data6' }
               ],
         columns: [
                  { title: 'head1', data: 'col1' },
                  { title: 'head2',data: 'col2' }
         ]
   });
   ```
3. Message
   ```
   DataTables warning: table id=sample_table - Cannot reinitialise DataTable. For more information about this error, please see http://datatables.net/tn/3
   ```

### 해결

초기화 후 컬럼, 데이터 갱신전에 destory, empty 작업을 해줘야 합니다. 

DataTable 의 library 적용 방법엔 두가지가 있습니다. 
1. $('#sample_table').dataTable({ blabla~~})
2. $('#sample_table').DataTable({ blabla~~})

이 두가지에 따라 destroy 하는 방법 역시 다르구요.

1. $('#sample_table').dataTable().fnDestroy();
2. $('#sample_table').DataTable().destroy();

이후 $('#sample_table').empty() 를 적용 한 후 컬럼, 데이터를 update 하면 변경된 컬럼이 화면에 출력됩니다. 