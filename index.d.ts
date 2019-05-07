import * as React from 'react'

export interface State {
    [key: string]: any
}

export interface Action<T = any> {
    type: T

    [extraProps: string]: any
}

export type Reducer<S = any> = (
    state: S | undefined,
    action: Action
) => S

export interface Dispatch {
    <T extends Action>(action: T): T
}

export interface StoreContextValue<S extends State> {
    data: S,
    dispatch: Dispatch
}

export interface StoreEnhancer {
    (dispatch: Dispatch): Dispatch
}

export interface StoreProviderProps<S> {
    value: StoreContextValue<S>
}

export type StoreProvider<S> = React.FC<StoreProviderProps<S>>

export const createStore: <S>(
    reducer: Reducer<S>,
    enhancer?: StoreEnhancer
) => StoreProvider<S>

export type StoreSelector<S> = (store: S) => any

export const useStore: <S>(
    selector?: StoreSelector<S>
) => StoreContextValue<S>

export const combineReducers: <S extends State>(
    reducers: { [key: string]: Reducer },
    initialValue?: S
) => Reducer
