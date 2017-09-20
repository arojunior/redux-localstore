(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("redux-localstore", [], factory);
	else if(typeof exports === 'object')
		exports["redux-localstore"] = factory();
	else
		root["redux-localstore"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var isNull = function isNull(value) {
	  return value === 'undefined' || value === null;
	};
	
	var hasSameProps = function hasSameProps(obj1, obj2) {
	  return Object.keys(obj1).every(function (prop) {
	    return obj2.hasOwnProperty(prop);
	  });
	};
	
	var LocalStore = function () {
	  function LocalStore(store) {
	    var _this = this;
	
	    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
	
	    _classCallCheck(this, LocalStore);
	
	    this.store = store;
	
	    this.defaults = {
	      storage: 'localStorage'
	    };
	
	    if (config) {
	      this.defaults = config;
	    }
	
	    store.subscribe(function () {
	      return _this.setLocalStore(store);
	    });
	  }
	
	  _createClass(LocalStore, [{
	    key: 'getStorage',
	    value: function getStorage() {
	      var storage = this.defaults.storage;
	      console.log(storage);
	      return storage;
	    }
	  }, {
	    key: 'getState',
	    value: function getState() {
	      return !isNull(this.getLocalStore()) ? this.getLocalStore() : {};
	    }
	  }, {
	    key: 'getLocalStore',
	    value: function getLocalStore() {
	      try {
	        return JSON.parse(this.getStorage().getItem('reduxStore'));
	      } catch (e) {
	        console.log(e);
	        return {};
	      }
	    }
	  }, {
	    key: 'setLocalStore',
	    value: function setLocalStore(store) {
	      try {
	        return this.getStorage().setItem('reduxStore', JSON.stringify(this.store.getState()));
	      } catch (e) {
	        console.log(e);
	        return {};
	      }
	    }
	  }, {
	    key: 'defineState',
	    value: function defineState(defaultState) {
	      return function (defaultState) {
	        return function (reducer) {
	          if (getState().hasOwnProperty(reducer)) {
	            var localReducer = getState()[reducer];
	            return hasSameProps(defaultState, localReducer) ? localReducer : defaultState;
	          }
	          return defaultState;
	        };
	      };
	    }
	  }, {
	    key: 'resetLocalStore',
	    value: function resetLocalStore() {
	      return this.getStorage().removeItem('reduxStore');
	    }
	  }]);
	
	  return LocalStore;
	}();
	
	exports.default = LocalStore;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=redux-localstore.js.map