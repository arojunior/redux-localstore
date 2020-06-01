# Synchronize Redux Store with localStorage/sessionStorage

[![npm version](https://img.shields.io/npm/v/redux-localstore.svg)](https://www.npmjs.com/package/redux-localstore) [![npm downloads](https://img.shields.io/npm/dm/redux-localstore.svg)](https://www.npmjs.com/package/redux-localstore) [![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

Subscribe Redux Store and replicate to `localStorage`, so user will can refresh page and keep the App state

### Store example

Just import the **_default method_** (you can call storeSynchronize as the example above) from `'redux-localstore'` and pass store as parameter

```javascript
import { createStore, combineReducers } from 'redux';
import storeSynchronize from 'redux-localstore';

const combineReducer = combineReducers({
  Auth,
  Product
});

export const store = createStore(combineReducer);

storeSynchronize(store); // the default config synchronizes the whole store
```

### localStorage / sessionStorage

The default browser storage is the `localStorage` (persists until the **_browser_** is closed), but since version 0.3.0 you can change the default to `sessionStorage` (persists until the **_tab_** is closed).

```javascript
storeSynchronize(store, {
  storage: 'sessionStorage'
});
```

### Blacklist

If you need to ignore some reducer, you can use the **blacklist** configuration:

```javascript
storeSynchronize(store, {
  blacklist: ['Auth']
});
```

### Whitelist

If you want to sync just specific reducers, you can use the **whitelist** configuration:

```javascript
storeSynchronize(store, {
  whitelist: ['Product']
});
```

### Reducer example

To populate the initalState from browser storage, import **_defineState_** method from `'redux-localstore'`, pass your `defaultState` as first parameter and the reducer key as second. (note that it's using currying)

```javascript
import { defineState } from 'redux-localstore';

const defaultState = {
  data: null
};

const initialState = defineState(defaultState)('Product');

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ACTION1':
      return {
        ...state,
        data: action.payload
      };
    case 'ACTION2':
      return {
        ...state,
        data: null
      };
    default:
      return state;
  }
};
```

### Getting local state

This method gets the persisted state. It shouldn't be actually necessary, since the state from your redux store is supposed to be the same.

```javascript
import { getState } from 'redux-localstore';

const state = getState();
```

### If you need to reset the local store

```javascript
import { resetState } from 'redux-localstore';

resetState();
```
