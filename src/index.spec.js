import { createStore, combineReducers } from 'redux'
import localStorage from 'mock-local-storage'
import LocalStore, {getState} from './index'

global.window = {}
window.localStorage = global.localStorage

const testReducer = (state = {}, action) => {
  if (action.type === 'test') {
    return {
      data: action.payload
    }
  }
  return state
}

const rootReducer = combineReducers({
  testReducer
})

const store = createStore(rootReducer)

describe('redux-localstore', () => {
  
  let localStore

  beforeEach(() => {
    localStore = new LocalStore(store)
  })

  it('Should not throw an error', () => {    
    expect(localStore).toBeDefined()
  })

  it('Should return the default storage name', () => {
    expect(localStore.defaults.storage).toBe('localStorage')
  })

  it('Should return the correct storage name after change', () => {
    localStore = new LocalStore(store, {
      storage: 'sessionStorage'
    })
    expect(localStore.defaults.storage).toBe('sessionStorage')
  })

  it('Should return the store content after dispatch', () => {
    store.dispatch({
      type: 'test',
      payload: 'testing'
    })

    expect(localStore.getState()).toEqual({
      testReducer: {
        data: 'testing'
      }
    })    
  })  

  it('Should pass initial state to reducer from localStore', () => {

    const defaultState = {
      data: 'Testando'
    }

    const initialState = localStore.defineState(defaultState)('testReducer')

    const newReducer = (state = initialState, action) => {
      if (action.type === 'test') {
        return {
          data: action.payload
        }
      }
      return state
    }
    
    const newRootReducer = combineReducers({
      newReducer
    })

    const newStore = createStore(newRootReducer)

    const newReducerState = {
      testReducer: newStore.getState().newReducer
    }

    expect(localStore.getState()).not.toEqual(defaultState)
    expect(localStore.getState()).toEqual(newReducerState)    
  })  

  it('Should return the store empty after reset', () => {
    localStore.resetState()

    expect(localStore.getState()).toEqual({})    
  })  
})

console.log(getState())
