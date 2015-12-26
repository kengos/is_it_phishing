function HostnameValidator() {
  this.errorHosts = [];
  this.score = 0;
  this.messages = [];
};

HostnameValidator.ERROR_HOSTS = [
  '51\.la',
  'baidu'
];

HostnameValidator.prototype = {
  constructor: HostnameValidator,

  validate: function(hostnames) {
    var reg = new RegExp(HostnameValidator.ERROR_HOSTS.join('|'));
    this.errorHosts = [].filter.call((hostnames || []), function(hostname) {
      return reg.test(hostname);
    });
    this.buildResult();
    return this.errorHosts.length == 0;
  },

  getScore: function() {
    return this.score;
  },

  getMessages: function() {
    return this.messages;
  },

  buildResult: function() {
    this.score = 0;
    this.messages = [];

    if(this.errorHosts.length == 0) {
      return;
    }
    this.score += 20;
    this.messages.push(this.errorHosts.join(", ") + " の javascript/iframe が呼び出されています。");
  }
}
