import { ReducerAction } from 'react'
import * as React from 'react'
import {createContext, Dispatch, Reducer, useContext, useMemo, useReducer} from 'react'

export const createStore = <S,A extends Action>(
    reducer: Reducer<S, A>,
    preloadedState?: S,
    enhancer?: StoreEnhancer<S,A>
): [StoreProvider<S,A>, StoreHook<S,A>] => {

    if (enhancer) {
        return enhancer(createStore)(reducer, preloadedState)
    }

    // @ts-ignore
    const initialState = preloadedState || reducer(undefined, {type: undefined})

    // @ts-ignore
    const Context = createContext<S>(undefined)

    const Store: StoreProvider<S,A> = (props: StoreProviderProps<S,A>) => {
        const [store, dispatch] = useReducer(reducer, initialState)

        const { store: customStore, dispatch: customDispatch, ...otherProps } = props;

        const value: StoreContextValue<S,A> = useMemo(() => ({
            store: customStore || store,
            dispatch: customDispatch || dispatch
        }), [store, dispatch, customStore, customDispatch])

        return <Context.Provider value={value} {...otherProps} />
    }

    const useStore: StoreHook<S,A> = (selector) => {
        const {store, dispatch} = useContext(Context)
        if (typeof selector === 'function') {
            return {store: selector(store), dispatch}
        }
        return {store, dispatch}
    }

    return [Store, useStore]
}

export interface Action {
    type: string
}

export type StoreProvider<S,A extends Action> = React.FC<StoreProviderProps<S,A>>

export interface StoreProviderProps<S,A extends Action> {
    store?: S,
    dispatch?: Dispatch<ReducerAction<Reducer<S,A>>>
}

export interface StoreContextValue<S,A extends Action> {
    store: S,
    dispatch: Dispatch<ReducerAction<Reducer<S,A>>>
}

export type StoreSelector<S> = (store: S) => any

export interface StoreHook<S,A extends Action> {
    (selector?: StoreSelector<S>): StoreContextValue<S,A>
}

export interface StoreEnhancer<S,A extends Action> {
    (storeCreator: StoreCreatorToEnhance<S,A>): StoreCreatorToEnhance<S,A>
}

export interface StoreCreatorToEnhance<S,A extends Action> {
    (
        reducer: Reducer<S, A>,
        preloadedState?: S
    ): [StoreProvider<S,A>, StoreHook<S,A>]
}
