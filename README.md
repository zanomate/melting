# Melting

Global state manager for React, made with hooks and context

[![NPM](https://img.shields.io/npm/v/melting.svg)](https://www.npmjs.com/package/melting)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-typescript-brightgreen.svg)](https://standardjs.com)

- [Install](#install)
- [Usage](#usage)
- [API](#api)
- [Migrate from Redux](#migrate-from-redux)

## Install

```bash
npm install --save melting
```

## Usage

Start using *Melting* in 3 simple steps:

1. Create your own store provider and its corresponding hook with names you prefer.

    ```js
    import { createStore } from 'melting'   
 
    const [ Store, useStore ] = createStore(storeReducer);
    ```

2. Provide the store down to your app

    ```js
    const App = () => {
        return (
            <Store>
                <MyComponent />
            </Store>
        );
    };
    ```

3. Use your custom hook to retrieve store data and dispatch actions

    ```js
    const MyInnerComponent = () => {
    
       const { data, dispatch } = useStore()
       
       const onClick = () => {
           dispatch({ type: 'YOUR_ACTION' })
       }
    
       return (
           <>
               <span>{data}</span>
               <button onClick={onClick}>
                   click here
               </button>
           </>
        )
    }
    ```

## API

#### createStore()

Creates both a store provider and its corresponding hook.

Depending on the type of state management you want to implement,you can decide to keep
a single global store (means an unique provider and a single custom hook), rather than
creates multiple stores and provide them down to different sections of your application.

```js
createStore(reducer, [preloadedState], [enhancers])
```

Arguments:
1. `reducer` (function): A reducing function that returns the next state, given the current state and an action.
2. \[`preloadedState`\] (any): The initial state. This parameter is **optional**. If not specify the initial state is automatically computed from reducers state default value.
3. \[`enhancers`\] (function): The store enhancer. This parameter is **optional**. You may optionally specify it to enhance the store with third-party capabilities.

Return an array containing 2 different objects:
1. The first element is a custom store provider (see [Store Provider](#store-provider))
2. The second element is the corresponding custom hook. (see [Consumer Hook](#consumer-hook))

You can name them as you prefer.

```js
const [ MyStore, useMyStore ] = createStore(myReducer);
```

#### Store Provider

The Store Provider is used to provide global store to the entire application.
It is most commonly used inside app main component.

```js
const App = () => {
    return (
        <Store>
            <MyComponent />
        </Store>
    );
};
```

Props:
- \[`store`\] (any): the store object. This prop is **optional**.
You can use this prop to force the providing of a specific store state.
It is most commonly used for **testing** purpose.
- \[`dispatch`\] (function): the dispatch function. This prop is **optional**.
You can use this prop to force the providing of a custom dispatch function.
It is most commonly used for **testing** purpose.

#### Consumer Hook

The Consumer Hook is used to retrieve both the actual store state
and the dispatch function.

```js
const { data, dispatch } = useStore()
```

Returns an object containing two properties:
- `data`: the actual store state or a selection of it (see below).
- `dispatch`: the dispatch function, used to dispatch actions.

Arguments:
1. \[`selector`\] (function): This parameter is **optional**. Used to
retrieve a custom section of the global store.

```js
const { data } = useStore(store => store.counter)

const { data } = useStore(store => ({
  counter: store.counter,
  foo: store.other.foo
}))
```

### Utility

Below the utilities provided with this library

#### combineReducers()

Similar to Redux's combineReducers, it creates a new reducer starting from
a map of reducers. The resulting function will be able to reduce a state
with the same shape of the map of reducers passed to it.

Arguments:
1. `reducers` (object): the map of reducers to be combined together.
2. \[`initialValue`\] (any): This parameter is **optional**. If not specify
the state default value is automatically computed from reducers state default
state value inside the passed map.

```js
const todos = combineReducers({
  all: allReducer,
  checked: checkedReducer
})
```

## Migrate from *'Redux'*

If you want to rewrite your redux-based code using *Melting*, just take a look at
the following:

- **connect():** Forget it. You don't need to use any higher-order-component.
    - mapStateToProps: this function is replaced by the selector parameter
    of the consumer hook.
        ```js
        // retrieve the entire global store data
        const { data } = useStore()
      
        // selector is like mapStateToProps
        const selector = store => ({
          foo: store.foo,
          other: store.other.foo
        })
        // retrieve only selected data
        const { data } = useStore(selector)
        ```
    - mapDispatchToProps: instead of creating this mapping, just use the dispatch function
    retrieved from the consumer hook.
        ```js
        const { disaptch } = useStore()
      
        // this methods are like mapDispatchToProps
        const action1 = () => {
          dispatch({ type: 'ACTION 1' })
        }
  
        const action2 = () => {
          dispatch({ type: 'ACTION 2' })
        }
        ```

- **Provider:** Just use the custom provider created by `createStore` without additional props (see [Store Provider](#store-provider)).

- **createStore()**: This method has its homonym inside Melting, with exactly the same signature.
Just remember that the *Melting* version returns two different objects instead the store (see [createStore](#create-store))

- **Functional components:** Melting is based on hooks, so avoid writing components
as class. If you need to write class components, probably *Melting* is not what you
are looking for.

    However, If you don't want to rewrite your existing class components, you can
    use `StoreConsumer` component to manually retrieve the state inside render function.
    
    ```js
    import { StoreConsumer } from 'melting'
    import { MyStore } from 'my/store'  
  
    class MyClassComponent extends React.Component {
      
      onClick(dispatch) {
        dispatch({ type: 'YOUR_ACTION' })
      }
  
      render() {
        return (
          <StoreConsumer of={MyStore}>
            {({ data, dispatch }) => {
              return (
                <>
                  <span>{data}</span>
                  <button onClick={() => this.onClick(dispatch)}>
                    click here
                  </button>
                </>
              )
            }}
          </StoreConsumer>
        )
      }
    }
    ```

    Arguments:
    
    1\. `of` (object): The Store Provider for which we want to have a Consumer.  
    2\. [`selector`\] (function): This parameter is **optional**. As for the
    hook version this parameter is used to retrieve a custom section of the
    global store.

## License

MIT © [https://github.com/zanomate](https://github.com/zanomate)
