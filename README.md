# Melting

> Global state manager for React, made with hooks and context

[![NPM](https://img.shields.io/npm/v/melting.svg)](https://www.npmjs.com/package/melting)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save melting
```

## Usage

Start using Melting in 3 simple steps:

1. Create your store and the corresponding hook

    ```js
    const [ Store, useStore ] = createStore(storeReducer);
    ```

2. Provide the store in your app

    ```js
    const App = () => {
        return (
            <Store>
                <MyComponent />
            </Store>
        );
    };
    ```

3. Use your custom hook to retrieve state and dispatch actions

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

### createStore

```js
createStore(reducer, [preloadedState], [enhancers])
```

Creates both a store and its corresponding hook for your app.

Arguments:
1. `reducer` (function): A reducing function that returns the next state, given the current state and an action.
2. [`preloadedState`] (any): The initial state. This parameter is **optional**. If not specify the initial state is automatically computed from reducers states default value.
3. [`enhancers`] (function): ... 

## License

MIT © [https://github.com/zanomate](https://github.com/https://github.com/zanomate)
