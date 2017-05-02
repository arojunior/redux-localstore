const isNull = value => value === 'undefined' || value === null

export const getLocalStore = () =>
  JSON.parse(localStorage.getItem('reduxStore'))

export const checkChanges = store => getLocalStore() !== store.getState()

export const setLocalStore = store =>
  localStorage.setItem('reduxStore', JSON.stringify(store.getState()))

export const getState = () => (!isNull(getLocalStore()) ? getLocalStore() : {})

export const defineState = (defaultState, reducer) =>
  (getState().hasOwnProperty(reducer) ? getState()[reducer] : defaultState)

export const resetState = () => localStorage.removeItem('reduxStore')

export default store => store.subscribe(() => setLocalStore(store))
