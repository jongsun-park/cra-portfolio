# 22 this

## 22.1 this 키워드

객체 리터럴로 생성되는 객체는 메서드가 호출되는 시점에 이미 객체 리터럴이 평가되어 객체가 생성되어 식별자에 할당된 이후이기 때문에 메서드 내부에서 객체 자신을 참조할 수 있다.

하지만 생성자 함수로 인스턴스를 생성하는 경우, 생성자 함수 내부의 메서드에서 미래에 생성될 인스턴스 객체 자체를 참조 할 수 없다.

this는 자신이 속한 객체 또는 자신이 생성할 인스턴스를 가리키는 자기 참조 변수(self-referencing variable)다. this를 통해 자신이 속한 객체 또는 자신이 생성할 인스턴스의 프로퍼티나 메서드를 참조할 수 있다.

this가 가리키는 값은 함수 호출 방식에 의해 동적으로 결정된다.

- 전역 스코프 this: window
- 일반 함수: window / strict mode가 적용된 일반 함수 내부의 this에는 undefined가 바인딩된다.
- 객체 리터럴 (메서드 내부): 메서드를 호출한 객체
- 생성자 함수: 생성자 함수가 생성할 인스턴스

## 22.2 함수 호출 방식과 this 바인딩

함수의 상위 스코프를 결정하는 방식인 렉시컬 스코프(lexical scope)는 함수 정의가 평가되어 객체가 생성되는 시점에 상위 스코프를 결정한다. 하지만 this 바인딩은 함수 호출 시점에 결정된다.

1. 일반 함수 호출 -> window
2. 메서드 호출 -> 메서드를 호출한 객체
3. 생성자 함수 호출 -> 생성자 함수가 생성한 인스턴스
4. Function.prototype.apply/call/bind 메서드에 의한 간접 호출 -> 바인딩 된 객체

### 일반 함수 호출

기본적으로 this는 전역 객체(global object)가 바인딩된다. this는 객체의 프로퍼티나 메서드를 참조하기 위한 자기 참조 변수 이므로 일반 함수에서는 역할이 없다. strict mode 에서는 this는 undefined에 바인딩 된다.

메서드 내부의 중첩 함수나 콜백 함수의 this 바인딩을 메서드의 this 바인딩과 일치시키는 방법

```js
var value = 1;
const obj = {
  value: 100,
  foo() {
    // this 바인딩(obj)을 변수 that에 할당한다.
    const that = this;

    // 콜백 핢수 내부에서 this 대신 that을 참조한다.
    setTimeout(function () {
      console.log(that.value); // 100;
    }, 100);
  },
};

obj.foo();
```

`Funciton.prototype.apply`, `Funciton.prototype.call`, `Funciton.prototype.bind`
을 사용해서 명시적으로 this를 바인딩할 수 있다.

```js
var value = 1;
const obj = {
  value: 100,
  foo() {
    setTimeout(
      function () {
        console.log(this.value)); // 100;
      }.bind(this),
      100
    );
  },
};

obj.foo();
```

화살표 함수를 사용해서 this 바인딩을 일치 시킬 수도 있다.

```js
var value = 1;
const obj = {
  value: 100,
  foo() {
    setTimeout(() => console.log(this.value), 100);
  },
};

obj.foo();
```

### 메서드 호출

메서드 내부의 this는 메서드를 소유한 객체가 아니라 메서드를 호출한 객체에 바인딩된다.

```js
const person = {
  name: "Lee",
  getName() {
    // 메서드 내부의 this는 메서드를 호출한 객체에 바인딩된다.
    return this.name;
  },
};

// 메서드 getName을 호출한 객체는 person이다
console.log(person.gerName()); // Lee

const anotherPerson = {
  name: "Kim",
};
// getName 메서드를 anotehrPerson 객체의 메서드로 할당
anotherPerson.getName = person.getName;

// getName 메서드를 호출한 객체는 anotherPerson이다
console.log(anotherPerson.getName()); // Kim

// getName 메서드를 변수에 할당
const getName = person.getName;

// getName 메서드를 일반 함수로 호출
// 일반함수의 this는 전역 객체를 참조한다.
// window.name: 브라우저 창의 이름을 나타내는 빌트인 프로퍼티
console.log(getName()); // ''
```

프로토타입 메서드 내부에서 사용된 this도 일반 메서드와 마찬가지로 해당 메서드를 호출한 객쳉 바인딩된다

```js
function Person(name) {
  this.name = name;
}

Person.prototype.getName = function () {
  return this.name;
};

const me = new Person("Lee");

// getName 메서드를 호출한 객체는 me다
console.log(me.getName()); // Lee

Person.prototype.name = "Kim";

// getName 메서드를 호출한 객체는 Person.prototype이다
console.log(Person.prototype.getName()); // Kim
```

### 생성자 함수 호출

생성자 함수 내부의 this는 생성자 함수가 (미래에) 생성할 인스턴스가 바인딩 된다.

new 연산자를 사용하지 않고 함수를 호출하면 일반함수로 동작한다. 일반함수로 호출될 경우 this는 전역객체를 가리킨다.

### Function.prototype.apply/call/bind 메서드에 의한 간접 호출

this로 사용할 객체와 인수 리스트를 인수로 전달받아 함수를 호출한다.

```js
/**
 * 주어진 this 바인딩과 인수 리스트 배열을 사용하여 함수를 호출한다.
 * @param thisArg - this로 사용할 객체
 * @param argsArray - 함수에 전달할 인수 리스트의 배열 또는 유사 배열 객체
 * @returns 호출된 함수의 반환값
 */
Function.prototype.apply(thisArg[, argsArray])

/**
 * 주어진 this 바인딩과 ,로 구분된 인수 리스트를 사용하여 함수를 호출한다.
 * @param thisArg - this로 사용할 객체
 * @param arg1, arg2, ... - 함수에 전달할 인수 리스트
 * @returns 호출된 함수의 반환값
 */
Function.prototype.call(thisArg[, arg1[, arg2[, ...]]])
```

```js
function getThisBinding() {
  console.log(arguments);
  return this;
}

// this로 사용할 객체
const thisArg = { a: 1 };

console.log(getThisBinding.apply(thisArg, [1, 2, 3]));
// Arguments(3) [1, 2, 3, callee: ƒ, Symbol(Symbol.iterator): ƒ]
// {a: 1}

console.log(getThisBinding.call(thisArg, 1, 2, 3));
// Arguments(3) [1, 2, 3, callee: ƒ, Symbol(Symbol.iterator): ƒ]
// {a: 1}
```

apply, call 메서드는 함수에 사용할 객체에 인수를 전달하는 역할만 한다. 이를 통해 유사 배열 객체에 배열 메서드를 사용할 수 있다.

```js
function convertArgsToArray() {
  console.log(arguments);

  // Array.prototype.slice를 인수 없이 호출하면 배열 복사본을 생성한다.
  const arr = Array.prototype.slice.call(arguments);
  // const arr = Array.prototype.slice.apply(arguments);
  console.log(arr);
  return arr;
}

convertArgsToArray(1, 2, 3);
// Arguments(3) [1, 2, 3, callee: ƒ, Symbol(Symbol.iterator): ƒ]
// [1, 2, 3]
// [1, 2, 3]
```

Function.prototype.bind 는 함수를 호출하지 않고 this로 사용할 객체만 전달한다

```js
function getThisBinding() {
  return this;
}

// this 로 사용할 객체
const thisArg = { a: 1 };

// bind 메서드는 함수에 this로 사용할 객체를 전달한다.
// bind 메서드는 함수를 호출하지는 않는다.
// 명시적으로 호출해야한다.
console.log(getThisBinding.bind(thisArg));
// getThisBinding() { return this; }
console.log(getThisBinding.bind(thisArg)());
// {a: 1}
```

메서드가 일반 함수로 호출되 면 this는 전역 객체를 참조 한다. bind 메서드를 사용해서 콜백 함수 내부의 this와 외부 함수 내부의 this와 일치시킨다.

```js
const person = {
  name: "Lee",
  foo(callback) {
    setTimeout(callback.bind(this), 100);
  },
};

person.foo(function () {
  console.log(`Hi, my name is ${this.name}.`);
});
```

| 함수 호출 방식                                   | this 바인딩                                            |
| ------------------------------------------------ | ------------------------------------------------------ |
| 일반 함수 호출                                   | 전역 객체                                              |
| 메서드 호출                                      | 메서드를 호출한 객체                                   |
| 생성자 함수 호출                                 | 생성자 함수가 (미래에) 생성할 인스턴스                 |
| Function#apply/call/bind 메서드에 의한 간접 호출 | Function#apply/call/bind ㅇ[ 첫번째 인수로 전달한 객체 |
