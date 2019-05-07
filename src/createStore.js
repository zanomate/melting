import * as React from 'react'

export const StoreContext = React.createContext(undefined)

export const createStore = (reducer, preloadedState, enhancers) => {

    const initialState = preloadedState
        ? preloadedState
        : reducer(undefined, {type: undefined})

    const enhance = (dispatch) => {
        return (enhancers || []).slice().reverse().reduce(
            (dispatchToEnhance, enhancer) => {
                return enhancer(dispatchToEnhance)
            },
            dispatch
        )
    }

    return (props) => {
        const [data, dispatch] = React.useReducer(reducer, initialState)
        const enhancedDispatch = enhance(dispatch)

        const value = React.useMemo(() => ({
            data,
            dispatch: enhancedDispatch
        }), [data, enhancedDispatch])

        return React.createElement(StoreContext.Provider, {
            value, ...props
        })
    }
}

export const useStore = (selector) => {
    const {data, dispatch} = React.useContext(StoreContext)
    if (selector && typeof selector === 'function') {
        return {data: selector(data), dispatch}
    }
    return {data, dispatch}
}
