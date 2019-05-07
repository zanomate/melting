import * as React from 'react'
import {StoreContext} from 'utils/StoreContext'

export const useStore = (selector) => {
    const {data, dispatch} = React.useContext(StoreContext)
    if (selector && typeof selector === 'function') {
        return {data: selector(data), dispatch}
    }
    return {data, dispatch}
}
