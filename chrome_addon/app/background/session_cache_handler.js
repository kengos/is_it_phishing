function SessionCacheHandler() {
};

SessionCacheHandler.prototype = {
  constructor: SessionCacheHandler,

  get: function(key) {
    return JSON.parse(sessionStorage.getItem(key));
  },

  set: function(key, object) {
    sessionStorage.setItem(key, JSON.stringify(object));
  },

  remove: function(key) {
    sessionStorage.removeItem(key);
  }
}

SessionCacheHandler.instance = new SessionCacheHandler();