# Melting

> Global state manager for React, made with hooks and context

[![NPM](https://img.shields.io/npm/v/melting.svg)](https://www.npmjs.com/package/melting) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save melting
```

## Usage

### Create provider

Create your provider component based on your main reducer

```jsx
    import { createStore } from 'useglobalstore'
    import { myReducer } from 'my/reducer'
    
    export const Store = createStore(myReducer)
```

### Provide the store

Just wrap your main component with the provider created before

```jsx
    import React from 'react'
    import { Store } from 'my/store'
    import { MyComponent1, MyComponent2 } from 'my/components'
    
    export const App = () => {
        return (
            <Store>
                <MyComponent1 />
                <MyComponent2 />
            </Store>
        )
    }
```

### Use store locally

Finally use `useStore` hook to access global store data and dispatch method

```jsx
    import React from 'react'
    import { useStore } from 'useglobalstore'
        
    export const MyInnerComponent = () => {
    
        const { data, dispatch } = useStore()
    
        const onClick = () => {
            dispatch({ type: 'MY_ACTION' })
        }
    
        return (
            <span onClick={onClick}>{data}</span>
        )
    }
```

## License

MIT © [https://github.com/zanomate](https://github.com/https://github.com/zanomate)
