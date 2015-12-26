function IpValidator() {
  this.state = 0;
  this.score = 0;
  this.ipList = {};
  this.messages = [];
};

IpValidator.API_END_POINT = "https://9kxbbcoehg.execute-api.ap-northeast-1.amazonaws.com/development/dns/ip";

IpValidator.prototype = {
  constructor: IpValidator,

  validate: function(hostname) {
    this.state = 0;
    var response = this.getCache(hostname);
    if(response !== null) {
      this.response = response;
      this.buildResult(hostname);
      this.state = 1;
      return;
    }

    this.lookup(hostname);
  },

  lookup: function(hostname) {
    var self = this;
    $.ajax({
      type: 'GET',
      url: IpValidator.API_END_POINT,
      data: {'hostname': hostname},
      dataType: 'json'
    }).done(function(json) {
      self.setCache(hostname, json);
      self.response = json;
    }).fail(function(json) {
      self.response = null;
    }).always(function() {
      self.buildResult(hostname);
    });
  },

  isCompleted: function() {
    return this.state == 1;
  },

  getScore: function() {
    return this.score;
  },

  getMessages: function() {
    return this.messages;
  },

  buildResult: function(hostname) {
    this.score = 0;
    this.messages = [];
    if(this.response == null) {
      this.state = 1;
      return;
    }

    var ip = WebRequestHandler.instance.getIp(hostname);
    if(ip === undefined) {
      this.state = 1;
      return;
    }

    if(this.response.indexOf(ip) == -1) {
      this.score += 30;
      this.messages.push(this.response.join(', ') + "へアクセスされるべきですが、" + ip + "にアクセスしています。");
    }
    this.state = 1;
  },

  getCache: function(hostname) {
    return SessionCacheHandler.instance.get('ip_' + hostname);
  },

  setCache: function(hostname, value) {
    SessionCacheHandler.instance.set('ip_' + hostname, value);
    return value;
  }

};
