function WebRequestHandler() {
  this.ipList = {};
  this.parser = document.createElement('a');
  this.bind();
};

WebRequestHandler.prototype = {
  constructor: WebRequestHandler,

  bind: function() {
    var self = this;
    chrome.webRequest.onCompleted.addListener(function(request) {
      self.parser.href = request.url;
      self.ipList[self.parser.hostname] = request.ip;
      return;
    }, { urls: [], types: [] }, []);
  },

  getIp: function(hostname) {
    return this.ipList[hostname];
  },
};

WebRequestHandler.instance = new WebRequestHandler();

