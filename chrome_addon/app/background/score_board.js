function ScoreBoard(params) {
  this.scriptsHostnames = params.scripts;
  this.location = params.location;

  this.whoisValidator = new WhoisValidator;
  this.hostnameValidator = new HostnameValidator;

};

ScoreBoard.prototype = {
  constructor: ScoreBoard,

  calculate: function() {
    console.log('ScoreBoard#calculate');
    this.validateHostname();
    this.validateWhois();
  },

  validateHostname: function() {
    this.hostnameValidator.validate();
    this.score += this.hostnameValidator.getScore();
  },

  validateWhois: function() {
    this.whoisValidator.validate(this.location.hostname);
  },

  complete: function() {
    console.log(this.whoisValidator.isCompleted());
    return this.whoisValidator.isCompleted();
  },

  buildDetails: function() {
    return {
      "script": this.hostnameValidator.getDetails(),
      "whois": this.whoisValidator.getMessages()
    }
  },

  buildScore: function() {
    var score = 0;
    score += this.hostnameValidator.getScore();
    score += this.whoisValidator.getScore();
    return score;
  }
}