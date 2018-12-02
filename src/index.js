const isNull = value => value === 'undefined' || value === null;

const hasSameProps = (obj1, obj2) =>
  Object.keys(obj1).every(prop => obj2.hasOwnProperty(prop));

const defaults = {
  storage: 'localStorage',
  blacklist: []
};

export const storeConfig = () => defaults;

const setStorage = config => {
  if (config.hasOwnProperty('storage')) {
    defaults.storage = config.storage;
  }
  if (config.hasOwnProperty('blacklist')) {
    defaults.blacklist = config.blacklist;
  }
};

const getStorage = () => {
  return window[defaults.storage];
};

const getLocalStore = () => {
  try {
    return JSON.parse(getStorage().getItem('reduxStore'));
  } catch (e) {
    return {};
  }
};

const filterBlackList = state => {
  Object.keys(state).forEach(value => {
    if (defaults.blacklist.indexOf(value) !== -1) {
      state[value] = undefined;
    }
  });
  return state;
};

const setLocalStore = store => {
  try {
    return getStorage().setItem(
      'reduxStore',
      JSON.stringify(filterBlackList(store.getState()))
    );
  } catch (e) {
    return {};
  }
};

export const defineState = defaultState => reducer => {
  if (getState().hasOwnProperty(reducer)) {
    const localReducer = getState()[reducer];
    return hasSameProps(defaultState, localReducer)
      ? localReducer
      : defaultState;
  }
  return defaultState;
};

export const resetState = () => {
  return getStorage().removeItem('reduxStore');
};

export const getState = () => {
  return !isNull(getLocalStore()) ? getLocalStore() : {};
};

export default (store, config = null) => {
  if (config) {
    setStorage(config);
  }
  return store.subscribe(() => setLocalStore(store));
};
