const isNull = value => value === 'undefined' || value === null

const hasSameProps = (obj1, obj2) =>
  Object.keys(obj1).every(prop => obj2.hasOwnProperty(prop))

export const getLocalStore = () =>
  JSON.parse(localStorage.getItem('reduxStore'))

export const checkChanges = store => getLocalStore() !== store.getState()

export const setLocalStore = store =>
  localStorage.setItem('reduxStore', JSON.stringify(store.getState()))

export const getState = () => (!isNull(getLocalStore()) ? getLocalStore() : {})

export const defineState = (defaultState, reducer) => {
  if (getState().hasOwnProperty(reducer)) {
    const localReducer = getState()[reducer]
    return hasSameProps(defaultState, localReducer)
      ? localReducer
      : defaultState
  }
  return defaultState
}

export default store => store.subscribe(() => setLocalStore(store))
