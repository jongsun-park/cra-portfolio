# 20 strict mode

## 20.1 strict mode란?

자바스크립트 언어의 문법을 좀 더 엄격히 적용하여 오류를 발생시킬 가능성이 높거나 자바스크립트 엔진의 최적화 작업에 문제를 일으킬 수 있는 코드에 대해 명시적인 에러를 발생시킨다.

ESlint 같은 린트 도구를 사용해도 strict mode와 유사한 효과를 얻을 수 있다.

## 20.2 strict mode의 적용

전역의 선두에 'use strict'; 을 추가하면 스크립트 전체에 strict mode가 적용된다.

```js
"use strict";

function foo() {
  x = 10; // ReferenceError: x is not defined
}

foo();
```

## 20.3 전역에 strict mode를 적용하는 것은 피하자

외부 라이브러리의 경우 non-strict mode인 경우도 있기 때문에 전역에 strict mode를 적용하는 것은 바람직하지 않다. 이러한 경우 즉시 실행 함수로 감싸서 스코프를 구분하고 즉시 실행 함수의 선두에 strict mode를 적용한다.

```js
// 즉시 실행 함수의 선두에 strict mode를 실행
(function () {
  "use strict";
  // Do something...
})();
```

## 20.4 함수 단위로 strict mode를 적용하는 것도 피하자

모든 함수에 일일이 strict mode를 적용하는 것은 번거로운 일이고, strict mode가 적용된 함수가 참조할 함수 외부의 컨텍스트에 strict mode를 적용하지 않는다면 문제가 발생할 수 있다.

strict mode는 즉시 함수로 감싼 스크립트 단위로 적용하는 것이 바람직하다

```js
(function () {
  // non-strict mode
  var let = 10;
  function foo() {
    "use strict";
    let = 20;
  }
  foo(); // SyntaxError: Unexpected strict mode reserved word
})();
```

## 20.5 strict mode가 발생시키는 에러

```js
(function () {
  "use strict";

  // 1. 암묵적 전역
  // 선언하지 않은 변수를 참조하면 ReferenceError가 발생한다.
  x = 1;
  console.log(x);
  // ReferenceError: x is not defiend

  // 2. 변수, 함수, 매개변수의 삭제
  // delete 연산자로 변수, 함수, 매개변수를 삭제하면 SyntraxError가 발생한다.// SyntaxError: Delete of an unqualified identifier in strict mode
  var y = 1;
  delete y;

  function foo(a){
    delete a;
  }
  delete foo;

  // 3. 매개변수 이름의 중복
  // 중복된 매개변수의 이름을 사용할면 SyntaxError가 발생한다.
  // SyntaxError: Duplicate parameter name not allowed in this context
  function baz(x, x){
    return x + x;
  }
  console.log(baz(1, 2));

  // 4. with문의 사용
  // with({key: value}}): with문은 전달된 객체를 스코프체인에 추가한다.
  with({x: 1}){
    console.log(x);
  }
})();
```

## 20.6 strict mode 적용에 의한 변화

### 일반 함수의 this

strict mode에서 함수를 일반 함수로서 호출하면 this에 undefined가 바인딩된다.

```js
(function () {
  "use strict";

  function foo() {
    console.log(this); // undefiend
  }

  function Foo() {
    console.log(this); // Foo
  }

  new Foo();
})();
```

### arguments 객체

strict mode에서 매개변수로 전달된 이수를 재할당하여 변경해도 arguments 객체에 반영되지 않는다.

```js
(function (a) {
  "use strict";
  // 매개변수에 전달된 인수를 재할당하여 변경
  a = 2;
  console.log(arguments); // { 0:1, length:1 }
})(1);
```
