# Synchronize Redux Store with localStorage

Subscribe Redux Store and replicate to `localStorage`, so user will can refresh page and keep the App state

### Store example

Just import the ***default method*** (you can call storeSynchronize as the example above) from `'redux-localstore'` and pass store as parameter

```javascript
import {createStore, combineReducers} from 'redux'
import storeSynchronize from 'redux-localstore'

const combineReducer = combineReducers({
  Reducer1,
  Reducer2
})

export const store = createStore(combineReducer)

storeSynchronize(store)
```
To populate the initalState from localStorage, import ***defineState*** method from `'redux-localstore'`, pass your `defaultState` as first parameter and the reducer key as second.

### Reducer example
```javascript
import {defineState} from 'redux-localstore'

const defaultState = {
  data: null
}

const initialState = defineState(defaultState, 'Reducer1')

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ACTION1':
      return {
        ...state,
        data: action.payload
      }
    case 'ACTION2':
      return {
        ...state,
        data: null
      }
    default:
      return state
  }
}
```
