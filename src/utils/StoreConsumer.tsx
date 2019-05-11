import * as React from 'react'
import {Action, StoreContextValue, StoreProvider, StoreSelector} from '../createStore'
import {ReactElement} from 'react'

export interface StoreConsumerProps<S,A extends Action> {
  of: StoreProvider<S,A>
  selector?: StoreSelector<S>
  children: (context: StoreContextValue<S,A>) => React.ReactChildren
}

export const StoreConsumer = <S,A extends Action>(props: StoreConsumerProps<S,A>): ReactElement => {

    const StoreContext = props.of.context

    return (
        <StoreContext.Consumer>
            {(context) => {
                return props.children(context)
            }}
        </StoreContext.Consumer>
    )
}
