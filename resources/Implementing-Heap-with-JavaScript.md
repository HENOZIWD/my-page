---
title: 'JavaScript로 Heap 구현하기'
description: 'feat. TypeScript'
year: '2023'
month: '3'
day: '6'
hour: '0'
minute: '14'
---

> [https://school.programmers.co.kr/learn/courses/30/lessons/142085](https://school.programmers.co.kr/learn/courses/30/lessons/142085)
> 

프로그래머스 연습문제를 풀다가 Heap 자료구조를 사용해서 해결하는 녀석을 마주쳤다. 풀고 나서 다른 분들 풀이를 보니 이진탐색으로 해결할 수도 있는 것 같지만 그건 뒤로하고..

C++로 문제를 풀 때는 STL에서 우선순위 큐 가져와서 썼는데 JavaScript는 그런거 없으니까 당황했다. 앞으로 쓸 일이 꽤 많을 것 같으니 정리!

# 구현

<aside>
💡 부모 노드가 자식 노드보다 큰 Max heap을 기준으로 작성하였습니다.

</aside>

```jsx
const heap = [0, ];
```

자료를 저장할 배열이다. indexing의 편의를 위해 heap[0]에 더미 값을 넣는다.

```jsx
const swap = (aIdx, bIdx) => {
	const temp = heap[aIdx];
	heap[aIdx] = heap[bIdx];
	heap[bIdx] = temp;
}

const insertHeap = (num) => {
	heap.push(num);
	let i = heap.length - 1;
	while (i > 1 && heap[Math.floor(i / 2)] < heap[i]) {
			swap(Math.floor(i / 2), i);
			i = Math.floor(i / 2);
	}
}
```

heap에 값을 삽입할 때는 배열의 push()를 통해 가장 마지막 노드에 삽입 후, 자신보다 값이 크거나 같은 부모를 만나거나, 자신이 root 노드까지 올라갈 때 까지 부모 노드와 값을 비교하며 swap()을 진행한다.

```jsx
const deleteHeap = () => {
	if (heap.length > 1) {
		swap(1, heap.length - 1);
		heap.pop();
		
		let i = 1;
		while (true) {
			if (i * 2 + 1 < heap.length) { // Double child
				const [biggerNum, nextIdx] = heap[i * 2] < heap[i * 2 + 1] ?
																		[heap[i * 2 + 1], i * 2 + 1] : [heap[i * 2], i * 2];
	
				if (heap[i] < biggerNum) {
					swap(i, nextIdx);
					i = nextIdx;
				}
				else {
					break;
				}
			}
			else if (i * 2 < heap.length && heap[i] < heap[i * 2]) { // Single child
				swap(i, i * 2);
				i = i * 2;
			}
			else { // No child
				break;
			}
		}
	}
}
```

heap에서 값을 삭제할 때는 root 노드에 있는 최댓값과 heap의 마지막 노드의 값을 바꾼 후 배열의 pop()을 통해 최댓값을 삭제한다. 그 후 root 노드에 있는 값을 자신보다 큰 자식이 없거나 leaf 노드에 도달할 때 까지 자식노드와 비교하며 swap()을 진행한다. 자식 노드가 둘 이면 더 큰 자식 노드와 값을 바꾼다.

# Class + Generic

위 코드는 문제 해결 용으로 구현한 것을 바탕으로 작성하다 보니 그냥 막 늘어놓은 느낌이 강해서 Class와 TypeScript의 Generic으로 좀 더 자료구조답게 꾸며보았다.

Class와 Generic에 관해서는 TypeScript 공식 문서에 친절하게 나와있으니 읽으면 유익하다!

> Class [https://www.typescriptlang.org/docs/handbook/2/classes.html](https://www.typescriptlang.org/docs/handbook/2/classes.html) (English only)
> 

> Generic [https://www.typescriptlang.org/ko/docs/handbook/2/generics.html](https://www.typescriptlang.org/ko/docs/handbook/2/generics.html) (Korean)
> 

> Generic [https://www.typescriptlang.org/docs/handbook/2/generics.html](https://www.typescriptlang.org/docs/handbook/2/generics.html) (English)
> 

```jsx
class Heap<Type> {
  private datas: Type[];
  private compare: (a: Type, b: Type) => boolean;

  constructor(compare: (a: Type, b: Type) => boolean) {
    this.datas = [];
    this.compare = compare;
  }

  private swap(aIdx: number, bIdx: number) {
    const temp = this.datas[aIdx];
    this.datas[aIdx] = this.datas[bIdx];
    this.datas[bIdx] = temp;
  }

  public insert(data: Type) {
    this.datas.push(data);
    let i = this.datas.length - 1;
    while (i > 0 && !this.compare(this.datas[Math.floor((i - 1) / 2)], this.datas[i])) {
      this.swap(Math.floor((i - 1) / 2), i);
      i = Math.floor((i - 1) / 2);
    }
  }

  public remove() {
    if (this.datas.length > 0) {
      this.swap(0, this.datas.length - 1);
      this.datas.pop();

      let i = 0;
      while (true) {
        if ((i + 1) * 2 < this.datas.length) {
          const [compared, nextIdx] = 
						this.compare(this.datas[(i + 1) * 2 - 1], this.datas[(i + 1) * 2]) ?
							[this.datas[(i + 1) * 2 - 1], (i + 1) * 2 - 1] :
							[this.datas[(i + 1) * 2], (i + 1) * 2];

          if (!this.compare(this.datas[i], compared)) {
            this.swap(i, nextIdx);
            i = nextIdx;
          }
          else {
            break;
          }
        }
        else if ((i + 1) * 2 - 1 < this.datas.length && !this.compare(this.datas[i], this.datas[(i + 1) * 2 - 1])) {
          this.swap(i, (i + 1) * 2 - 1);
          i = (i + 1) * 2 - 1;
        }
        else {
          break;
        }
      }
    }
  }

}
```

Generic을 쓰다 보니 0번째 index에 더미 값을 넣는 데 어려움이 있어서 그냥 0번 부터 heap을 구현했다. 

indexing보다 더 어려웠던건 compare 함수인데, return 값이 true일 때 swap을 해야 하나? a와 b 중 index가 더 큰 쪽은 어디지? 등의 혼란이 마구 쏟아져서 기준을 잡기 위해 C++에서 쓰던 sort 함수의 reference를 보고 왔다.

> [https://en.cppreference.com/w/cpp/algorithm/sort](https://en.cppreference.com/w/cpp/algorithm/sort)
> 

sort() 함수의 parameter 중 비교 함수를 받는 comp에 대한 설명이 쓰여 있는데,

> comparison function object (i.e. an object that satisfies the requirements of *[Compare](https://en.cppreference.com/w/cpp/named_req/Compare)*) which returns true if the first argument is *less* than (i.e. is ordered *before*) the second.
> 

첫 번째 argument가 두 번째 argument 보다 작으면 true 라고 한다.

이 것만 봐서는 감이 잘 안 올 수도 있는데, 아래의 Example 칸을 보면 default로 operator<가 부여됨(오름차순)을 알 수 있고, 따라서 arg1과 arg2(arg1의 index가 arg2 보다 더 이전 index)가 정렬되어 있어 compare 함수의 return 조건과 일치하면(true를 반환한다면) swap을 하지 않고, 그렇지 않다면(false를 반환한다면) 정렬되어 있지 않다는 것이므로 swap을 해야 한다고 이해하고 구현하였다.

```jsx
const heap = new Heap<number>((a, b) => a < b);
```

선언은 이렇게! (Min heap)

설명이 좀 장황하긴 한데.. 아무튼 구현은 했고 문제 하나에서 나름 유익하게 공부한 것 같다.