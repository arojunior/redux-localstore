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

    const blackListReducer = (state = {}, action) => {
      if (action.type === 'blacklist') {
        return Object.assign({}, state, { data: action.payload });
      }
      return state;
    };

    const newRootReducer = combineReducers({
      newReducer,
      blackListReducer
    });

    const newStore = createStore(newRootReducer);

    storeSynchronize(newStore, {
      blacklist: ['blackListReducer'],
      storage: 'localStorage'
    });

    newStore.dispatch({
      type: 'newReducer',
      payload: 'newReducer'
    });

    newStore.dispatch({
      type: 'blacklist',
      payload: 'blackListReducer'
    });

    expect(getState().newReducer.data).toBe('newReducer');
    expect(getState().blackListReducer).toBeUndefined();
  });
});
