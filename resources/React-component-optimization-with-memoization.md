---
title: 'Memoization으로 React component 최적화하기'
description: 'React.memo'
year: '2023'
month: '3'
day: '14'
hour: '5'
minute: '52'
---

Nonogram 퍼즐을 구현 하던 중, 문제에 부딪혔다.

퍼즐의 크기가 커질 수록 눈에 띄게 성능이 저하되는 것이었다.

# 원인

React component가 렌더링되는 조건이 몇 가지 있는데, 그 중 하나는 상위 component가 렌더링 될 때 이고 또 다른 하나는 자신의 state가 변경될 때 이다.

그런데 내 component가 이 두 조건을 다 지니고 있었다.

```jsx
// [id].tsx

export default function Game(resData: IResourceData) {

  const [status, setStatus] = useState<number[][]>(Array.from({length: resData.rowSize}, () => Array.from({length: resData.colSize}, () => 0)));

	/* ... */

  return (
    <>
    {/* ... */}
      <Board 
        rowSize={resData.rowSize} 
        colSize={resData.colSize} 
        hint={resData.hint}
        status={status}
        fillCell={fillCell}
        checkCell={checkCell}
        eraseCell={eraseCell}
        dragStatus={dragStatus}
      />
		{/* ... */}
    </>
  )
}
```

상위 component인 Game component에서 각 Cell의 상태를 관리하는 state를 선언한 후 Board component로 전달한다.

그 다음 Board component에서 Cell component를 n x n개 렌더링하는 방법으로 구현하였는데, n이 커질수록 렌더링하는 Cell이 많아지고, Cell에 전달된 onClick event를 통해 Game의 state가 변경되면 위 조건에 따라 모든 Cell이 다시 렌더링되는 것이었다.

당연히 성능이 기하급수적으로 저하될 수밖에 없었고, 최적화 방법을 찾아야 했다.

# 해결 방법

React.memo의 component memoization을 통해 최적화하였다.

> [https://ko.reactjs.org/docs/react-api.html#reactmemo](https://ko.reactjs.org/docs/react-api.html#reactmemo)
> 

> [https://beta.reactjs.org/reference/react/memo](https://beta.reactjs.org/reference/react/memo) (new documentation)
> 

간단히 말하면, React.memo로 감싸준 component는 상위 component의 렌더링이 발생하더라도 전달받은 이전 props와 현재 props를 비교하여 변화가 없다면 이전 렌더링 결과를 재사용하여 성능 최적화를 꾀할 수 있다.

```jsx
// cell.tsx

interface ICellProps {
  status: number;
  fillCell: () => void;
  checkCell: () => void;
  eraseCell: () => void;
  color: string;
  dragStatus: React.MutableRefObject<number>;
}

// ...
```

Cell이 전달받는 props가 위와 같고, 다른 props에 관계 없이 status가 변경될 때만 렌더링하도록 memo의 두 번째 인자에 비교함수를 설정해줄 수도 있다.

```jsx
// cell.tsx

function Cell(props: ICellProps) {

	// ...

  return (
    // ...
  )
}

function isStatusEqual(prevProps: ICellProps, nextProps: ICellProps) {
  return prevProps.status === nextProps.status;
}

export default React.memo(Cell, isStatusEqual);
```

# 결과

성능이 비약적으로 향상되었다.

[React Developer Tools](https://beta.reactjs.org/learn/react-developer-tools)를 통해 렌더링에 소요된 시간을 측정해 보니 다음과 같았다.

<aside>
💡 배포 환경이 아닌 npm run dev에서 측정하였기 때문에 실제 성능과는 차이가 있을 수 있습니다. Cell 한 개를 클릭 시 렌더링에 소요되는 시간을 측정하였습니다.

</aside>

- **50x50 without memo**

<img src="/posts/React-component-optimization-with-memoization/cell_50x50.jpg" alt="err" width="70%" height="70%">

- **50x50 with memo**

<img src="/posts/React-component-optimization-with-memoization/cell_memo_50x50.jpg" alt="err" width="70%" height="70%">

- **100x100 without memo**

<img src="/posts/React-component-optimization-with-memoization/cell_100x100.jpg" alt="err" width="70%" height="70%">

- **100x100 with memo**

<img src="/posts/React-component-optimization-with-memoization/cell_memo_100x100.jpg" alt="err" width="70%" height="70%">

각 측정에서 5~10% 정도 오차가 있었지만 그걸 감안하고라도 2배에서 3배까지 렌더링 시간이 단축된 것을 확인할 수 있다.