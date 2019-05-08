import React, {createContext, useContext, useMemo, useReducer} from 'react'

export const StoreContext = createContext(undefined)

export const createStore = (reducer, preloadedState, enhancers) => {
    const initialState = preloadedState || reducer(undefined, {type: undefined})

    return (props) => {
        const [data, dispatch] = useReducer(reducer, initialState)

        const enhancedDispatch = (enhancers || []).slice().reverse().reduce(
            (dispatchToEnhance, enhancer) => {
                return enhancer(dispatchToEnhance)
            },
            dispatch
        )

        const value = useMemo(() => ({
            data,
            dispatch: enhancedDispatch
        }), [data, enhancedDispatch])

        return <StoreContext.Provider value={value} {...props} />
    }
}

export const useStore = (selector) => {
    const {data, dispatch} = useContext(StoreContext)
    if (selector && typeof selector === 'function') {
        return {data: selector(data), dispatch}
    }
    return {data, dispatch}
}
