# useGlobalStore

Global state management with hooks and Context API

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
