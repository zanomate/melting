import {useStore} from './store'
import {StoreConsumer} from 'melting'
import React from 'react'

export const Counter = () => {

    const {data, dispatch} = useStore()

    const increment = () => {
        dispatch({type: 'INCREMENT'})
    }

    return (
        <>
            <span>{data}</span>
            &nbsp;
            <button onClick={increment}>clich here</button>
        </>
    )
}

