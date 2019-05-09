# Melting

> Global state manager for React, made with hooks and context

[![NPM](https://img.shields.io/npm/v/melting.svg)](https://www.npmjs.com/package/melting)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-typescript-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save melting
```

## Usage

Start using *Melting* in 3 simple steps:

1. Create your own store provider and its corresponding hook with names you prefer.

    ```js
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
    
       const { store, dispatch } = useStore()
       
       const onClick = () => {
           dispatch({ type: 'YOUR_ACTION' })
       }
    
       return (
           <>
               <span>{store}</span>
               <button onClick={onClick}>
                   click here
               </button>
           </>
        )
    }
    ```

## API

#### createStore

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
1. The first element is a custom store provider (see Store Provider)
2. The second element is the corresponding custom hook. (see Store Consumer)

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

#### Store Consumer (hook)

The Store Consumer hook is used to retrieve both the actual store state
and the dispatch function.

```js
const { store, dispatch } = useStore()
```

Returns an object containing two properties:
- `store`: the actual store state or a selection of it (see below).
- `dispatch`: the dispatch function, used to dispatch actions.

Arguments:
1. \[`selector`\] (function): This parameter is **optional**. Used to
retrieve a custom section of the global store.

```js
const { store } = useStore(store => store.counter)

const { store } = useStore(store => ({
  counter: store.counter,
  foo: store.other.foo
}))
```

### Utility

Below the utilities provided with this library

#### combineReducers

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

## License

MIT © [https://github.com/zanomate](https://github.com/zanomate)
