function HostnameValidator() {
  this.invalids = [];
};

HostnameValidator.prototype = {
  constructor: HostnameValidator,

  validate: function(hostnames) {
    this.invalids = [].filter.call((hostnames || []), function(hostname) {
      var reg = new RegExp(ResourceBoard.INVALID_HOSTANEMS.join("|"));
      return reg.test(hostname);
    });
    return this.invalids.length == 0;
  },

  getInvalidHostnames: function() {
    return this.invalids;
  },

  getDetails: function() {
    return {
      status: this.getStatus(),
      score: this.getScore(),
      errors: this.invalids
    };
  },

  getStatus: function() {
    if(this.invalids.length == 0) {
      return "OK";
    } else if(this.invalids.length == 1) {
      return "WARN";
    } else {
      return "ERROR";
    }
  },

  getScore: function() {
    if(this.invalids.length == 0) {
      return 0;
    } else if(this.invalids.length == 1) {
      return 10;
    } else {
      return 30;
    }
  },

  INVALID_HOSTANEMS: [
    '.*51\.la',
    '.*baidu.*'
  ]
}
