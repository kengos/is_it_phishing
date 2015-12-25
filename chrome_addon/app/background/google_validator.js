// Googleに対して site: hostname で検索を行い、indexされているかチェックする
function GoogleValidator() {
  this.state = 0;
  this.score = 0;
  this.messages = [];
};

GoogleValidator.prototype = {
  constructor: GoogleValidator,

  validate: function(hostname) {
    var self = this;
    $.ajax({
      type: 'GET',
      url: 'http://ajax.googleapis.com/ajax/services/search/web?v=1.0&q=site:' + hostname,
      dataType : "json"
    }).done(function(response){
      self.response = response;
    }).fail(function(response){
      self.response = response;
    }).always(function() {
      self.buildResult();
      self.state = 1;
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

    var results = this.getResponseDataResults();
    if (results.length == 0) {
      this.score += 60;
      this.messages.push("Googleの検索エンジンに登録されていません。");
    }
  }
}
