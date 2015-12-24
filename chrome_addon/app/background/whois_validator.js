function WhoisValidator() {
  this.state = 0;
};

WhoisValidator.API_END_POINT = "https://9kxbbcoehg.execute-api.ap-northeast-1.amazonaws.com/development/dns/whois";
WhoisValidator.EMAIL_PATTERN = new RegExp(".*@gmail.com|.*@yahoo.com|.*@yahoo.co.jp|.*@183.com");

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

  getResponse: function() {
    return this.response;
  },

  getRegistrantCountry: function() {
    return this.response.registrantCountry || '';
  },

  getRegistrantEmail: function() {
    return this.response.registrantEmail || '';
  },

  getScore: function() {
    var score = 0;
    var country = this.getRegistrantCountry();
    if(country == 'CN') {
      score += 20;
    } else if(country == 'TW') {
      score += 15;
    }
    var email = this.getRegistrantEmail();

    if(email !== '') {
      if(WhoisValidator.EMAIL_PATTERN.test(email)) {
        score += 30;
      }
    }
    return score;
  }
};
