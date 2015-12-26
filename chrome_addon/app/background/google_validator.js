// Googleに対して site: hostname で検索を行い、indexされているかチェックする
function GoogleValidator() {
  this.state = 0;
  this.score = 0;
  this.messages = [];
};

GoogleValidator.prototype = {
  constructor: GoogleValidator,

  validate: function(hostname) {
    this.state = 0;
    var response = this.getCache(hostname);
    if(response !== null) {
      console.log('not null');
      this.response = response;
      this.buildResult();
      return;
    }

    this.lookup(hostname);
  },

  lookup: function(hostname) {
    var self = this;
    $.ajax({
      type: 'GET',
      url: 'http://ajax.googleapis.com/ajax/services/search/web?v=1.0&q=site:' + hostname,
      dataType : "json"
    }).done(function(response){
      self.setCache(hostname, response);
      self.response = response;
    }).fail(function(response){
      self.response = null;
    }).always(function() {
      self.buildResult();
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

  getResponseDataResults: function() {
    this.response = this.response || {};
    this.response.responseData = this.response.responseData || {};
    return this.response.responseData.results || []
  },

  buildResult: function() {
    this.score = 0;
    this.messages = [];

    if(this.response === null) {
      console.log('skip google_validator');
      this.state = 1;
    }

    var results = this.getResponseDataResults();
    if (results.length == 0) {
      this.score += 60;
      this.messages.push("Googleの検索エンジンに登録されていません。");
    }
    this.state = 1;
  },

  getCache: function(hostname) {
    return SessionCacheHandler.instance.get('google_' + hostname);
  },

  setCache: function(hostname, value) {
    SessionCacheHandler.instance.set('google_' + hostname, value);
    return value;
  }
}
