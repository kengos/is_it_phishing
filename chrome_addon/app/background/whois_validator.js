function WhoisValidator() {
  this.state = 0;
  this.score = 0;
  this.messages = [];
};

WhoisValidator.API_END_POINT = "https://9kxbbcoehg.execute-api.ap-northeast-1.amazonaws.com/development/dns/whois";
WhoisValidator.EMAIL_PATTERN = new RegExp("@(gmail.com|yahoo.com|yahoo.co.jp|163.com|qq.com|hotmail.com|sina.com)$");
WhoisValidator.COUNTRY_PATTERN = new RegExp("CN|China|TW|Taiwan");

WhoisValidator.prototype = {
  constructor: WhoisValidator,

  validate: function(hostname) {
    if(this.state == 1) {
      return;
    }
    this.response = {};
    this.buildResult();
    this.state = 2;

    // var self = this;
    // $.ajax({
    //   type: 'GET',
    //   url: WhoisValidator.API_END_POINT,
    //   data: {'hostname': hostname},
    //   dataType: 'json'
    // }).done(function(json) {
    //   self.response = json;
    // }).fail(function(json) {
    //   self.response = json;
    // }).always(function() {
    //   self.state = 2;
    //   self.buildResult();
    // });
  },

  isCompleted: function() {
    return this.state == 2;
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

    var country = this.getRegistrantCountry();
    if(country !== '') {
      if(WhoisValidator.COUNTRY_PATTERN.test(country)) {
        this.score += 20;
        this.messages.push("ドメインの登録国が " + country + " です");
      }
    }

    var email = this.getRegistrantEmail();
    if(email !== '') {
      if(WhoisValidator.EMAIL_PATTERN.test(email)) {
        this.score += 30;
        this.messages.push("ドメインの登録者メールアドレスが " + email + " です");
      }
    }
  },

  getRegistrantCountry: function() {
    return this.response.registrantCountry || '';
  },

  getRegistrantEmail: function() {
    return this.response.registrantEmail || '';
  }

};
