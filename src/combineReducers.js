export const combineReducers = (reducers, initialValue) => {
    const defaultValue = initialValue || {}
    Object.keys(reducers)
        .forEach((key) => {
                if(!defaultValue.hasOwnProperty(key)) {
                    defaultValue[key] = reducers[key](undefined, {type: undefined})
                }
            }
        )
    return (state = defaultValue, action) => {
        return Object.keys(reducers).reduce(
            (nextState, key) => {
                nextState[key] = reducers[key](state[key], action)
                return nextState
            },
            {}
        )
    }
}
