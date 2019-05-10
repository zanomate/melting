import { Counter } from './Counter'
import React from 'react'
import {Store} from './store'

export const App = () => {
  return (
    <Store>
      <Counter/>
    </Store>
  )
}
