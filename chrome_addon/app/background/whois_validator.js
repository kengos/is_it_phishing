function WhoisValidator() {
  this.state = 0;
  this.score = undefined;
  this.messages = undefined;
};

WhoisValidator.API_END_POINT = "https://9kxbbcoehg.execute-api.ap-northeast-1.amazonaws.com/development/dns/whois";
WhoisValidator.EMAIL_PATTERN = new RegExp("@(gmail.com|yahoo.com|yahoo.co.jp|163.com|qq.com|hotmail.com|sina.com)$");
WhoisValidator.COUNTRY_PATTERN = new RegExp("CN|China|TW|Taiwan");

WhoisValidator.prototype = {
  constructor: WhoisValidator,

  validate: function(hostname) {
    console.log('WhoisValidator#validate');
    if(this.state == 1) {
      return;
    }
    this.state = 1;

    var self = this;
    $.ajax({
      type: 'GET',
      url: WhoisValidator.API_END_POINT,
      data: {'hostname': hostname},
      dataType: 'json'
    }).done(function(json) {
      console.log('WhoisValidator#validate success');
      self.response = json;
    }).fail(function(json) {
      console.log('WhoisValidator#validate error');
      self.response = json;
    }).always(function() {
      self.state = 2;
    })
  },

  isCompleted: function() {
    return this.state == 2;
  },

  getScore: function() {
    if(this.score === undefined) {
      this.buildResult();
    }
    return this.score;
  },

  getMessages: function() {
    if(this.messages === undefined) {
      this.buildResult();
    }
    return this.messages;
  },

  buildResult: function() {
    this.score = 0;
    this.messags = [];

    var country = this.getRegistrantCountry();
    if(country !== '') {
      if(WhoisValidator.COUNTRY_PATTERN.test(country)) {
        score += 20;
        messages.push("ドメインの登録国が " + country + " です");
      }
    }

    var email = this.getRegistrantEmail();
    if(email !== '') {
      if(WhoisValidator.EMAIL_PATTERN.test(email)) {
        score += 30;
        messages.push("ドメインの登録者メールアドレスが " + email + " です");
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
