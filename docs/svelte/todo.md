# Todo 예제 만들기
svelte/store 를 이용하여 todo 예제를 만들기
## App.svelte
``` js
<script>
	import { writable } from 'svelte/store'
	import Todo from './Todo.svelte'

	let title = ''
	let todos = writable([])
	let id = 0

	function createTodo(){
		if (!title.trim()){
			title = ''
			return
		}
		
		// 'crypto-random-string', 'uuid' 등의 외부라이브러리를 통해 id 생성 가능
		$todos.push({
			id,
			title
		})
		// 할당은 통해 반응성 유지
		$todos = $todos

		title = ''
		id += 1
	}
	
	// 조건일때 실행하는 방법
	// if ( e.key === 'Enter' ) { createTodo() }
	// e.key === 'Enter' ? createTodo() : undefined
	// e.key === 'Enter' && createTodo()
</script>
```
```html
<input type="text" 
			 bind:value={title} 
			 on:keydown={(e)=>{e.key === 'Enter' && createTodo()}}
			 />
<button on:click={createTodo}>
	Create Todo
</button>

{#each $todos as todo}
	<Todo {todos} {todo}/>
{/each}
```

## Todo.svelte
``` js 
<script>
	export let todo
	export let todos
	
	let isEdit = false
	let title = ''
	
	function onEdit(){
		isEdit = true
		title = todo.title
	}
	
	function offEdit(){
		isEdit = false
	}
	function updateTodo(){
		todo.title = title
		offEdit()
	}
	function deleteTodo(){
		$todos = $todos.filter( t => t.id !== todo.id )
	}
	
</script>
```

``` html
{#if isEdit}
	<div>
		<input type="text" 
					 bind:value={title}
					 on:keydown={(e)=>{e.key === 'Enter' && updateTodo()}}
					 />
		<button on:click={updateTodo}>
			OK
		</button>
		<button on:click={offEdit}>
			Cancel
		</button>
	</div>
{:else}
	<div>
		{todo.title}
		<button on:click={onEdit}>
			Edit
		</button>
		<button on:click={deleteTodo}>
			Delete
		</button>
	</div>
{/if}

```

<Comment />