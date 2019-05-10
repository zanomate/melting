import React from 'react'
import {useStore} from './store'

export const Counter = () => {
  const { data, dispatch } = useStore()

  const increment = () => {
    dispatch({ type: 'INCREMENT' })
  }

  return (
    <>
      <span>{data}</span>
      &nbsp;
      <button onClick={increment}>clich here</button>
    </>
  )
}
