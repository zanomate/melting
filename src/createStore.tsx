import * as React from 'react'
import {createContext, Dispatch, Reducer, useContext, useMemo, useReducer} from 'react'

export interface StoreEnhancer<S,A> {
    (storeCreator: StoreCreatorToEnhance<S,A>): StoreCreatorToEnhance<S,A>
}

export interface StoreCreatorToEnhance<S,A> {
    (
        reducer: Reducer<S, A>,
        preloadedState?: S
    ): [StoreProvider<S,A>, StoreHook<S,A>]
}

export type StoreProvider<S,A> = React.FC<StoreProviderProps<S,A>>

export interface StoreProviderProps<S,A> {
    value: StoreContextValue<S,A>
}

export interface StoreContextValue<S,A> {
    store: S,
    dispatch: Dispatch<A>
}

export type StoreSelector<S> = (store: S) => any

export interface StoreHook<S,A> {
    (selector?: StoreSelector<S>): StoreContextValue<S,A>
}

export const createStore = <S,A>(
    reducer: Reducer<S,A>,
    preloadedState?: S,
    enhancer?: StoreEnhancer<S,A>
): [StoreProvider<S,A>, StoreHook<S,A>] => {

    if (enhancer) {
        return enhancer(createStore)(reducer, preloadedState)
    }

    const initialState = preloadedState || reducer(undefined, undefined)

    const Context = createContext(undefined)

    const Store: StoreProvider<S,A> = (props: StoreProviderProps<S,A>) => {
        const [store, dispatch] = useReducer(reducer, initialState)

        const value: StoreContextValue<S,A> = useMemo(() => ({
            store,
            dispatch
        }), [store])

        return <Context.Provider value={value} {...props} />
    }

    const useStore: StoreHook<S,A> = (selector) => {
        const {store, dispatch} = useContext(Context)
        if (selector && typeof selector === 'function') {
            return {store: selector(store), dispatch}
        }
        return {store, dispatch}
    }

    return [Store, useStore]
}
