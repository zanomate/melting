export const combineReducers = (reducers, initialValue) => {
    const defaultValue = initialValue || {}
    Object.keys(reducers)
        .filter(key => !initialValue.hasOwnProperty(key))
        .forEach((key) => {
                defaultValue[key] = reducers[key](undefined, {type: undefined})
            }
        )
    return (state, action) => {
        return Object.keys(reducers).reduce(
            (nextState, key) => {
                nextState[key] = reducers[key](state[key], action)
                return nextState
            },
            {}
        )
    }
}
