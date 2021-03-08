# Svelte
다음은 [스벨트 입문](https://www.inflearn.com/course/%EC%8A%A4%EB%B2%A8%ED%8A%B8-%EC%9E%85%EB%AC%B8-%EA%B0%80%EC%9D%B4%EB%93%9C) 강좌를 들으면서 내용을 정리한 것이다. 다른 UI 프레임워크를 알아보다가 [이제 React.js를 버릴 때가 왔다](https://seokjun.kim/time-to-stop-react/) 글을 보고 스벨트를 알았고, 무료 강좌까지 2시간을 따라하면서 듣게 되었다. 스벨트에 대해서 긍정적인 생각들을 많이 하게 된 알찬 강의 였다. 

## 개요
> Rich Harris가 제작한 새로운 접근 방식의 Font-End Framework

- [2020 Front-end-Framework](https://2020.stateofjs.com/en-US/technologies/front-end-frameworks/)

## 특징 분석
### Write less code
- 높은 가독성 유지
- 개발 시간 단축
- 쉬운 리팩토링
- 쉬운 디버깅
- 더 작은 번들 (SPA 최적화)
- 낮은 러닝 커브

### No virtual DOM!
- No Diffing : Virtual DOM 을 통해 비교할 대상을 만들고 비교하는 것이 Diffing 이다
- No Overhead : 가상돔을 생성하고 비교할 필요가 없어서 기회비용(Overhead)이 없어진다
- 빠른 성능(퍼포먼스) : 그로인해 성능도 개선된다

### Truly reactive ( 반응성 )
반응성이란 애플리케이션 상태(데이터)의 변화가, DOM에 자동으로 반영되는 현상
- Framework-less VanillaJS
- Only use `devDependencies`
- 명시적 설계(창의적 작업)

### 단점 (2019.4 v3)
- 낮은 성숙도(작은 생태계)
- CDN 미제공
- IE 지원 X

## REPL 사용법
REPL(read-eval-print loop) 사용자에게 데이터를 입력받고 이를 평가(실행)하고 결과를 반환하는 단순한 상호작용 컴퓨터 프로그래밍 환경
- svelte 를 이용한 테스트가 가능하고 사이드에서 생성된 프로젝트에서는 rollup 을 이용하여 구성이 되어 있는 것도 특징이다. 첫느낌은 단순하면서도 js 기본기를 알아야 한다는 점에서 괜찮으면서도 아직은 생태계가 작아서 진행 시 어려움이 있을 것 같아 걱정이 되기도 한다


```
<script>
let name = 'World';
</script>
<h1>Hello {name}!</h1>
<button on:click={()=>{name='Javapark'}}>
 Change
</button>
```


## VS Code 에서 Svelte 프로젝트 시작하기
- node, npm 버전 확인
- LTS(Long Term Supported)는 장기적으로 안정되고 신뢰도가 높은 지원이 보장되는 버전으로, 유지보수와 보안(서버운영등)에 초점을 맞춰 대부분 사용자에게 추천되는 버전
- 검색 `svelte template github` (https://github.com/sveltejs/template)


## 선언적 렌더링
`{}` 를 이용한 선언적 랜더링 방식과 단방향을 양방향으로 바꾸기 위해서는 bind 라는 prefix 를 이용하는 방식이 있다
- ex) 
```
<input type="text" bind:value={name}/>
```

## 조건문과 반복문
### 조건문
```
<script>
	let name = 'world';
	let toggle = false;
	if ( toggle ){
		
	} else {

	}
	// 시작 : `#`, 중간 : `:` 끝 : `/`
</script>

<button on:click={() => {toggle = !toggle}}>
	Toggle
</button> {toggle}

{#if toggle}
	<h1>Hello {name}!</h1>
{:else}
	<div>No name !</div>
{/if}
```
### 반복문
```
<script>
	let name = 'world';
	let fruits = ['Apple', 'banana', 'Cherry', 'Orange', 'Mango']
	
	function deleteFruit(){
		console.log(fruits)
		fruits = fruits.slice(1)
	}
</script>

<h1>Hello {name}!</h1>

<ul>
{#each fruits as fruit}
	<li>{fruit}</li>
{/each}
</ul>

<button on:click={deleteFruit}>Eat it!</button>
```

## 이벤트 핸드링
### Sample 1
```
<script>
// 	import {onMount} from 'svelte'
	let name = 'world';
	let isRed = false
// 	onMount(()=>{
// 		const box = document.querySelector('.box')
// 		box.addEventListener('click', ()=>{
// 			isRed = !isRed
// 		})
// 	})
	
	function enter(){
		name='enter'
	}
	
	function leave(){
		name='leave'
	}

	
</script>

<h1>Hello {name}!</h1>
<div class="box" style="background-color: {isRed ?'red':'orange'}" on:click={()=>{isRed=!isRed}}  on:mouseenter={()=>{name='enter'}} 
on:mouseleave={()=>{name='leave'}}
>
	Box!
</div>

<style>
	.box{
		width: 300px;
		height: 150px;
		background-color:orange;
	}
</style>
```

### Sample 2
```
<script>
	let text = ''
</script>

<h1>
	{text}
</h1>

<input type="text" on:input={(e)=>{text=e.target.value}}
value={text}
/>
<input type="text"
			 bind:value={text} />
<button on:click={()=>{ text = 'Javapark' } }>
	Click
</button>
```

## 컴포넌트
### sample 1
```
<script>
let fruits = ['Apple', 'Banana', 'Cherry','Orange', 'Mango']
</script>

<h2>
	Fruits
</h2>

<ul>
	{#each fruits as fruit}
	<li>{fruit}</li>
	{/each}
</ul>

<h2>
	Fruits reverse
</h2>

<ul>
	<!-- 전개연산자
	...['Apple', 'Banana', 'Cherry','Orange', 'Mango'] 
'Apple', 'Banana', 'Cherry','Orange', 'Mango'
['Apple', 'Banana', 'Cherry','Orange', 'Mango']
-->
	{#each [...fruits].reverse() as fruit}
	<li>{fruit}</li>
	{/each}
</ul>

<h2>
	Fruits slice - 2
</h2>

<ul>
	{#each fruits.slice(-2) as fruit}
	<li>{fruit}</li>
	{/each}
</ul>
```

### sample2
```App.svelte
<script>
	import Fruits from './Fruits.svelte'
	
	let fruits = ['Apple', 'Banana', 'Cherry','Orange', 'Mango']
</script>

<Fruits {fruits}/>
<Fruits {fruits} reverse/>
<Fruits {fruits} slice="-2"/>
<Fruits {fruits} slice="0, 3"/>
```

```Fruits.svelte
<script>
	// Props
	export let fruits
	export let reverse
	export let slice
	
	let computedFruits = []
	let name = ''
	
	if(reverse){
		computedFruits = [...fruits].reverse()
		name = 'reverse'
	}else if(slice){
		// slice => '-2', '0, 3'
		// slice.split(',') => ['-2'], ['0' , '3']
		// ['-2'] => '-2'
		// ['0', '3'] => '0' , '3'
		computedFruits = fruits.slice(...slice.split(','))
		// name = 'slice ' + slice
		name = `sclice ${slice}`
	}else{
		computedFruits = fruits
	}
</script>

<h2>
	Fruits {name}
</h2>

<ul>
	{#each computedFruits as fruit}
	<li>{fruit}</li>
	{/each}
</ul>
```

## Store
컴포넌트 외부에 데이터를 보내고 받는 방식. 자식의 자식 컴포넌트에게 전송하거나 다른 컴포넌트로 전송할때 사용

### Sample 1
```App.svelte
<script>
	import { storeName } from './store.js'
	import Parent from './Parent.svelte'
	
	let name = 'world';
	$storeName = name
</script>

<!-- 간단하게 $ 표시를 사용하는 것을 Auto-subscription(자동구독) 이라 함 -->
<h1>Hello {name}!</h1>
<Parent/>
```

```Parent.svelte
<script>
	import Child from './Child.svelte'
</script>

<div>
	Parent
</div>
<Child/>
```


```Child.svelte
<script>
	import { storeName } from './store.js'
</script>
<div>
	Child {$storeName}
</div>
```

```store.js
import { writable } from 'svelte/store'

// 쓰기 가능한 형태로 외부에 노출하는 것
export let storeName = writable('Javapark')
```

#### 주의 사항
- $ 는 svelte 에서 사용하는 예약어. 즉 store 에 사용하기 때문에 $로 시작하지 않게 해야 한다
- svelte 는 스토어를 내장하고 있어 별도로 추가할 필요가 없다

## Ref
- [Svelte](https://svelte.dev)
- [스벨트 입문](https://www.inflearn.com/course/%EC%8A%A4%EB%B2%A8%ED%8A%B8-%EC%9E%85%EB%AC%B8-%EA%B0%80%EC%9D%B4%EB%93%9C)

<Comment />