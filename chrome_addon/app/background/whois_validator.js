function WhoisValidator() {
  this.invalids = [];
};

WhoisValidator.prototype = {
  constructor: WhoisValidator,

  END_POINT: "https://9kxbbcoehg.execute-api.ap-northeast-1.amazonaws.com/development/dns/whois",

  validate: function(hostname) {
    // TOOD
    return true;
  }
};
