const isNull = value => value === 'undefined' || value === null

const hasSameProps = (obj1, obj2) =>
  Object.keys(obj1).every(prop => obj2.hasOwnProperty(prop))

const setStorage = (
  config = {
    storage: 'localStorage'
  }
) => config

store.subscribe(() => this.setLocalStore(store))

export default class LocalStore {
  constructor(store, config = null) {
    this.store = store

    this.defaults = {
      storage: 'localStorage'
    }

    if (config) {
      this.defaults = config
    }

    store.subscribe(() => this.setLocalStore(store))
  }

  getStorage() {
    return window[this.defaults.storage]
  }

  getState() {
    return !isNull(this.getLocalStore()) ? this.getLocalStore() : {}
  }

  getLocalStore() {
    try {
      return JSON.parse(this.getStorage().getItem('reduxStore'))
    } catch (e) {
      return {}
    }
  }

  setLocalStore(store) {
    try {
      return this.getStorage().setItem(
        'reduxStore',
        JSON.stringify(this.store.getState())
      )
    } catch (e) {
      return {}
    }
  }

  defineState(defaultState) {
    return reducer => {
      if (this.getState().hasOwnProperty(reducer)) {
        const localReducer = this.getState()[reducer]
        return hasSameProps(defaultState, localReducer)
          ? localReducer
          : defaultState
      }
      return defaultState
    }
  }

  resetState() {
    return this.getStorage().removeItem('reduxStore')
  }
}
