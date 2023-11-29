# React Hooks进阶

- [ ] useContext
- [ ] useRef操作DOM


## 回顾Context

**目标：回顾context跨级组件通讯的使用**

**内容：**

使用场景：跨组件共享数据

Context 作用：实现跨组件传递数据，而不必在每个级别手动传递 props，简化组件之间的数据传递过程

![image-20210901215518365](images/image-20210901215518365-16347403277492-16362080009754.png)

Context 对象包含了两个组件

+ <Context.Provider value>：通过 value 属性提供数据。

+ <Context.Consumer>：通过 render-props 模式，在 JSX 中获取 Context 中提供的数据。

```jsx
const ColorContext = createContext()

// 没有默认值：
const { Provider, Consumer } = createContext()
// 有默认值的情况：
const { Provider, Consumer } = createContext('pink')

// 父组件：
<Provider value="blue"></Provider>
  
// 子组件：
<Consumer>
	{color => <span style={{ color }}>文字</span>}
</Consumer>
```

注意：

1. 如果提供了 Provider 组件，Consumer 获取到的是 Provider 中 value 属性的值
2. 如果没有提供 Provider 组件，Consumer 获取到的是 createContext(defaultValue) 的 defaultValue 值

## useContext-使用

**目标：**能够通过useContext hooks实现跨级组件通讯

**内容：**

作用：在**函数组件**中，获取 Context 中的值。要配合 Context 一起使用。

语法：

+ useContext 的参数：Context 对象，即：通过 createContext 函数创建的对象
+ useContext 的返回值：Context.Provider 中提供的 value 数据

```js
import { useContext } from 'react'

const { color } = useContext(ColorContext)
```

`useContext Hook` 与` <Context.Consumer>` 的区别：获取数据的位置不同

+ `<Context.Consumer>`：在 JSX 中获取 Context 共享的数据
+ useContext：在 JS 代码 或者 JSX 中获取 Context 的数据

```jsx
const ColorContext = createContext()

const Child = () => {
  // 在普通的 JS 代码中：
  const { color } = useContext(ColorContext)

  return (
    <div>
      useContext 获取到的 color 值：{ color }
      {/* 在 JSX 中： */}
    	<ColorContext.Consumer>
        {color => <span>共享的数据为：{color}</span>}
      </ColorContext.Consumer>
    </div>
  )
}
```

## useRef-操作DOM

**目标：**能够使用useRef操作DOM

**内容：** 

使用场景：在 React 中进行 DOM 操作时，用来获取 DOM

作用：**返回一个带有 current 属性的可变对象，通过该对象就可以进行 DOM 操作了。**

```jsx
// inputRef => { current }
const inputRef = useRef(null)
```

解释：

+ 参数：在获取 DOM 时，一般都设置为 null（获取 DOM 对象时，如果拿不到 DOM 对象，此时，获取到的值就是 null）
+ 返回值：包含 current 属性的对象。

+ 注意：只要在 React 中进行 DOM 操作，都可以通过 useRef Hook 来获取 DOM（比如，获取 DOM 的宽高等）

+ 注意：useRef不仅仅可以用于操作DOM，还可以操作组件

**核心代码：**

```JSX
import { useRef } from 'react'

const App = () => {
  // 1 使用useRef能够创建一个ref对象
  const inputRef = useRef(null)

  const add = () => {
    // 3 通过 inputRef.current 来访问对应的 DOM
    console.log(inputRef.current.value)
    inputRef.current.focus()
  }
  
  return (
    <section className="todoapp">
      {/* 2 将 ref 对象设置为 input 的 ref 属性值。目的：将 ref 对象关联到 input 对应的 DOM 对象上 */}
      <input type="text" placeholder="请输入内容" ref={inputRef} />
      <button onClick={add}>添加</button>
    </section>
  )
}

export default App
```