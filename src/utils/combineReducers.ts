import {Reducer} from 'react'

export const combineReducers = <S,A>(
    reducers: { [key: string]: Reducer<S,A> },
    initialValue?: S
): Reducer<S,A> => {
    const defaultValue = initialValue
    Object.keys(reducers)
        .forEach((key) => {
            if (!defaultValue.hasOwnProperty(key)) {
                defaultValue[key] = reducers[key](undefined, undefined)
            }
        })
    return (state = defaultValue, action) => {
        return Object.keys(reducers).reduce(
            (nextState, key) => {
                nextState[key] = reducers[key](state[key], action)
                return nextState
            },
            {}
        ) as S
    }
}
