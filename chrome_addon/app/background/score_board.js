function ScoreBoard(params) {
  this.scriptsHostnames = params.scripts;
  this.location = params.location;

  this.whoisValidator = new WhoisValidator;
  this.hostnameValidator = new HostnameValidator;
  this.googleValidator = new GoogleValidator;
  this.ipValidator = new IpValidator;
};

ScoreBoard.prototype = {
  constructor: ScoreBoard,

  calculate: function() {
    this.hostnameValidator.validate(this.scriptsHostnames);
    this.googleValidator.validate(this.location.hostname);
    this.whoisValidator.validate(this.location.hostname);
    this.ipValidator.validate(this.location.hostname);
  },

  complete: function() {
    var whois = this.whoisValidator.isCompleted();
    var google = this.googleValidator.isCompleted();
    var ip = this.ipValidator.isCompleted();
    return whois && google && ip;
  },

  getMessages: function() {
    var a = this.hostnameValidator.getMessages() || [];
    var b = this.whoisValidator.getMessages() || [];
    var c = this.googleValidator.getMessages() || [];
    var d = this.ipValidator.getMessages() || [];
    return a.concat(b).concat(c).concat(d);
  },

  getScore: function() {
    var score = 0;
    score += this.hostnameValidator.getScore();
    score += this.whoisValidator.getScore();
    score += this.googleValidator.getScore();
    score += this.ipValidator.getScore();
    return score;
  }
}