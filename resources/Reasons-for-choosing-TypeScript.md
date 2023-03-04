---
title: 'TypeScript를 선택한 이유'
description: ''
year: '2023'
month: '3'
day: '4'
hour: '5'
minute: '39'
---

> **TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.** ([https://www.typescriptlang.org/](https://www.typescriptlang.org/))
> 

# 1. 타입

‘Type’Script니까 당연히 타입이 가장 큰 이유였다.

```jsx
const a = 1;
const b = '1';

console.log(a+b); // '11'
```

한번쯤은 다 봤을 그 코드.. TypeScript에서는 타입 검사를 통해 오류를 발견해 알려주기 때문에 저런 실수를 미리 방지할 수 있다. 물론 런타임에서는 컴파일러의 개입이 불가능하기 때문에 검사할 수 있는 코드를 직접 작성해 줘야 한다.

또, 아무래도 React를 배우면서 내가 작성하고 있는 코드들이 어떤 타입인지 알아가면서 배우면 좀 더 공부가 효율적으로 되겠다 하는 생각도 있었다.

# 2. 생산성

1번의 이유에서 오는 생산성도 중요했다.

JavaScript를 주로 사용한 적은 없어서 직접적인 비교는 할 수 없지만, 오류 수정은 물론이고 TypeScript를 사용하면서 React 컴포넌트들을 다룰 때 주고받는 props 라든지, event의 타입이라든지, 비동기 구문을 사용할 때 Promise가 반환되는 지점이 어디인지 등을 명시적으로 나타낼 수 있어 편리했다.

https://github.com/DefinitelyTyped/DefinitelyTyped를 통한 npm 패키지들의 type들도 손쉽게 적용이 가능한 점도 생산성 증가에 상당히 큰 도움을 주었다.

# 3. 결론: 굳이 JavaScript..?

TypeScript가 결국 컴파일을 통해 JavaScript코드로 변환되기 때문에 JavaScript가 동작하는 곳이면 어디든 사용할 수 있고, tsconfig의 target 설정을 통해 ECMAScript 버전에 맞는 JavaScript 코드로 추가적인 작업 없이 컴파일 할 수 있다.

<img src="/posts/Reasons-for-choosing-TypeScript/TypeScript.jpg" alt="err" width="100%" height="100%">

> [https://www.typescriptlang.org/](https://www.typescriptlang.org/)
> 

key 만 삭제하면 JavaScript로 변한다!

이렇다 보니 TypeScript를 두고 JavaScript를 먼저 배워야 할 이유를 느끼지 못했고, TypeScript를 지금까지 사용하면서 아주 잘 한 선택이라고 생각하고 있다.