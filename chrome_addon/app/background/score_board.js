function ScoreBoard(params) {
  this.scriptsHostnames = params.scripts;
  this.location = params.location;

  this.whoisValidator = new WhoisValidator;
  this.hostnameValidator = new HostnameValidator;
  this.googleValidator = new GoogleValidator;
};

ScoreBoard.prototype = {
  constructor: ScoreBoard,

  calculate: function() {
    this.hostnameValidator.validate(this.scriptsHostnames);
    this.googleValidator.validate(this.location.hostname);
    this.whoisValidator.validate(this.location.hostname);
  },

  complete: function() {
    return this.whoisValidator.isCompleted() && this.googleValidator.isCompleted();
  },

  getMessages: function() {
    var a = this.hostnameValidator.getMessages() || [];
    var b = this.whoisValidator.getMessages() || [];
    var c = this.googleValidator.getMessages() || [];

    return a.concat(b).concat(c);
  },

  getScore: function() {
    var score = 0;
    score += this.hostnameValidator.getScore();
    score += this.whoisValidator.getScore();
    score += this.googleValidator.getScore();
    return score;
  }
}