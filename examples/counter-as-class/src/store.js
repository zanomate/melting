import { createStore } from 'melting'

const reducer = (state = 0, action) => {
  switch(action.type) {
    case 'INCREMENT':
      return state + 1
    default:
      return state
  }
}

export const [ Store, useStore ] = createStore(reducer)
