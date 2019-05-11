import {Store} from './store'
import {StoreConsumer} from 'melting'
import React from 'react'

export class Counter extends React.Component {

    increment(dispatch) {
        dispatch({type: 'INCREMENT'})
    }

    render() {
        return (
            <StoreConsumer of={Store}>
                {({data, dispatch}) => {
                    return (
                        <>
                            <span>{data}</span>
                            &nbsp;
                            <button onClick={() => this.increment(dispatch)}>clich here</button>
                        </>
                    )
                }}
            </StoreConsumer>
        )
    }
}
