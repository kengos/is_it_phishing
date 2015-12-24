function ScoreBoard(params) {
  this.scriptsHostnames = params.scripts;
};

ScoreBoard.prototype = {
  constructor: ScoreBoard,

  calculate: function(callback) {
    this.init();
    this.validateHostname();

    setTimeout(function() {
      if(this.complete()) {
        console.log("comp");
        callback(this.score, this.details);
      }
    }.bind(this), 100);
  },

  init: function() {
    this.score = 0;
    this.details = {};
  },

  validateHostname: function() {
    var validator = new HostnameValidator;
    validator.validate();
    this.details['script'] = validator.getDetails();
    this.score += validator.getScore();
  },

  complete: function() {
    return true;
  },

  whois: function(hostname) {
    this.whoisState = false;
    $.ajax({
      url: 'http://www.whoisxmlapi.com/whoisserver/WhoisService',
      dataType: 'jsonp',
      data: {
        domainName: hostname,
        outputFormat: 'json'
      }
    }).done(function(data) {
      this.whoisData = {state: true, data: data};
    }).fail(function(data){
      this.whoisData = {state: false, data: {}};
    }).always(function() {
      self.whoisState = true;
    });
  },

  getScore: function() {
    return this.score;
  }
}