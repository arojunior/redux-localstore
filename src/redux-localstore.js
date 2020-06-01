const isNull = value => value === 'undefined' || value === null;

const hasSameProps = (obj1, obj2) => {
  return Object.keys(obj1).every(prop => obj2.hasOwnProperty(prop));
};

const hasValidItemsType = (array = []) => array.every(item => typeof item === 'string');

const convertArrayToObject = (array = []) => {
  return array.reduce((obj, item) => {
    return {
      ...obj,
      [item]: item,
    };
  }, {});
};

const defaults = {
  storage: 'localStorage',
  blacklist: {}
};

export const storeConfig = () => defaults;

const setStorage = config => {
  if (config.hasOwnProperty('storage')) {
    defaults.storage = config.storage;
  }
  if (config.hasOwnProperty('blacklist')) {
    if (!hasValidItemsType(config.blacklist)) {
      throw new Error('Backlist item type should be string');
    }
    defaults.blacklist = convertArrayToObject(config.blacklist);
  }
  if (config.hasOwnProperty('whitelist')) {
    if (!hasValidItemsType(config.whitelist)) {
      throw new Error('Whitelist item type should be string');
    }
    defaults.whitelist = convertArrayToObject(config.whitelist);
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

const filterBlacklist = state => {
  const localState = { ...state };
  const { blacklist } = storeConfig();
  Object.keys(state).forEach(value => {
    if (blacklist[value]) {
      localState[value] = undefined;
    }
  });
  return localState;
};

const filterWhitelist = state => {
  const localState = {};
  const { whitelist } = storeConfig();
  Object.keys(state).forEach(value => {
    if (whitelist[value]) {
      localState[value] = state[value];
    }
  });
  return localState;
};

const getStoreToPersist = store => {
  if (storeConfig().whitelist) {
    return filterWhitelist(store.getState());
  }
  return filterBlacklist(store.getState());
}

const setLocalStore = store => {
  try {
    return getStorage().setItem(
      'reduxStore',
      JSON.stringify(getStoreToPersist(store))
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
