import { createStore, combineReducers } from 'redux';
import storeSynchronize, {
  storeConfig,
  getState,
  defineState,
  resetState
} from './main';

const testReducer = (state = {}, action) => {
  if (action.type === 'test') {
    return {
      data: action.payload
    };
  }
  return state;
};

const rootReducer = combineReducers({
  testReducer
});

const store = createStore(rootReducer);
storeSynchronize(store);

describe('redux-localstore', () => {
  it('Should return the default storage name', () => {
    expect(storeConfig().storage).toBe('localStorage');
  });

  it('Should return the correct storage name after change', () => {
    storeSynchronize(store, {
      storage: 'sessionStorage'
    });
    expect(storeConfig().storage).toBe('sessionStorage');
  });

  it('Should return the store content after dispatch', () => {
    store.dispatch({
      type: 'test',
      payload: 'testing'
    });

    expect(getState()).toEqual({
      testReducer: {
        data: 'testing'
      }
    });
  });

  it('Should pass initial state to reducer from localStore', () => {
    const defaultState = {
      data: 'Test'
    };

    const initialState = defineState(defaultState)('testReducer');

    const newReducer = (state = initialState, action) => {
      if (action.type === 'test') {
        return {
          data: action.payload
        };
      }
      return state;
    };

    const newRootReducer = combineReducers({
      newReducer
    });

    const newStore = createStore(newRootReducer);

    const newReducerState = {
      testReducer: newStore.getState().newReducer
    };

    expect(getState()).not.toEqual(defaultState);
    expect(getState()).toEqual(newReducerState);
  });

  it('Should return the store empty after reset', () => {
    resetState();

    expect(getState()).toEqual({});
  });

  it(`Should not persist reducer in the blacklist`, () => {
    const newReducer = (state = {}, action) => {
      if (action.type === 'newReducer') {
        return Object.assign({}, state, { data: action.payload });
      }
      return state;
    };

    const blacklistReducer = (state = {}, action) => {
      if (action.type === 'blacklist') {
        return Object.assign({}, state, { data: action.payload });
      }
      return state;
    };

    const newRootReducer = combineReducers({
      newReducer,
      blacklistReducer
    });

    const newStore = createStore(newRootReducer);

    storeSynchronize(newStore, {
      blacklist: ['blacklistReducer'],
      storage: 'localStorage'
    });

    newStore.dispatch({
      type: 'newReducer',
      payload: 'newReducer'
    });

    newStore.dispatch({
      type: 'blacklist',
      payload: 'blacklistReducer'
    });

    expect(getState().newReducer.data).toBe('newReducer');
    expect(getState().blacklistReducer).toBeUndefined();
  });

  it(`Should persist only reducers in the whitelist`, () => {
    const newReducer = (state = {}, action) => {
      if (action.type === 'newReducer') {
        return Object.assign({}, state, { data: action.payload });
      }
      return state;
    };

    const whitelistReducer = (state = {}, action) => {
      if (action.type === 'whitelist') {
        return Object.assign({}, state, { data: action.payload });
      }
      return state;
    };

    const newRootReducer = combineReducers({
      newReducer,
      whitelistReducer
    });

    const newStore = createStore(newRootReducer);

    storeSynchronize(newStore, {
      whitelist: ['whitelistReducer'],
      storage: 'localStorage'
    });

    newStore.dispatch({
      type: 'newReducer',
      payload: 'newReducer'
    });

    newStore.dispatch({
      type: 'whitelist',
      payload: 'whitelistReducer'
    });

    expect(getState().whitelistReducer.data).toBe('whitelistReducer');
    expect(getState().newReducer).toBeUndefined();
  });  
});
