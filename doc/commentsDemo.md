# typescript 注释规范

# 头部注释

```json
/*
 * @Author: liyb
 * @Email: git config user.email
 * @Date: 2022-05-13 12:46:02
 * @LastEditTime: 2022-05-13 13:23:22
 * @LastEditors: your name
 * @Description: 
 */
```

# 函数注释

```jsx
/**
 * @description: calcalator total price
 * @param {number} price
 * @param {number} count
 * @return {number} total price
 */
function totalPrice(price: number, count: number): number {
    const calc = new Calculator(price)
    calc.add(10)
    calc.reduce(2)
    calc.divide(2)
    return calc.multiply(count)
}
```

# 代码示例块

```jsx
/**
 * Code blocks are great for examples
 *
 * ```typescript
 * // run typedoc --help for a list of supported languages
 * const instance = new MyClass();
 * ```
 */
export class MyClass {}
```

# 类注释

```jsx
/**
 * @name: Calculator
 * @description: 计算器
 * @implements {ICalculator}
 * ```调用示例
 * const instance = new MyClass();
 * ```
 */
```

# 接口注释

```jsx
/**
 * @name: ICalculator
 * @description: 计算器接口
 * @property {number} defaultValue 默认值
 * @property {function} sum 计算器的加法
 * @property {function} reduce 计算器的减法
 * @property {function} multiply 计算器的乘法
 * @property {function} divide 计算器的除法
 */
interface ICalculator {
    defaultValue:number;
    add: (a: number, b: number) => number;
    reduce: (a: number, b: number) => number;
    multiply: (a: number, b: number) => number;
    divide: (a: number, b: number) => number;
}
```

# 类型注释

```jsx
/**
 * @type '上衣' | '裤子' | '裙子'
 */
type CloseType = '上衣' | '裤子' | '裙子'

/**
 * @property {string} type  衣服类型
 * @property {string} price 衣服价格
 * @property {string} count 衣服数量
 */
type ClothInfo = {
    type: CloseType;
    price: number;
    count: number;
}
```

# 行注释

```jsx
//计算总计
totalPrice(10, 2)
```