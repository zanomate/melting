import {Reducer} from 'react'
import { Action } from '../createStore'

export const combineReducers = <S,A extends Action>(
    reducers: { [key: string]: Reducer<S,A> },
    initialValue?: S
): Reducer<S,A> => {
    const defaultValue = initialValue || {}
    Object.keys(reducers)
        .forEach((key) => {
            if (!defaultValue.hasOwnProperty(key)) {
                // @ts-ignore
                defaultValue[key] = reducers[key](undefined, {type: undefined})
            }
        })
    return (state = defaultValue as S, action) => {
        return Object.keys(reducers).reduce(
            (nextState, key) => {
                nextState[key] = reducers[key](state[key], action)
                return nextState
            },
            {}
        ) as S
    }
}
