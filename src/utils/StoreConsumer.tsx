import { ReactElement } from 'react'
import { Action, StoreContextValue, StoreHook, StoreSelector } from '../createStore'

export interface StoreConsumerProps<S,A extends Action> {
  of: StoreHook<S,A>
  selector?: StoreSelector<S>
  children: (context: StoreContextValue<S,A>) => any
}

export const StoreConsumer = <S,A extends Action>(props: StoreConsumerProps<S,A>): ReactElement => {

  const useStore = props.of
  const context = useStore(props.selector || undefined)

  return props.children(context)
}
