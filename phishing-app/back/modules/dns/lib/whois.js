/**
 * Lib
 */
 var whois = require('node-whois');
 var changeCase = require('change-case');

module.exports.respond = function(event, cb) {
  if(event.hostname === undefined) {
    return cb(new Error("hostname is required"), null);
  }

  whois.lookup(event.hostname, function(err, whoisText) {
    if (err) {
      return cb(err, null);
    }
    var response = {};

    if(event.hostname.match(/\.jp$/)) {
      response['type'] = 0;
      response['text'] = whoisText;
    } else {
      var lines = whoisText.split(/\r\n|\r|\n/).filter(function(line, index) {
        return String(line).trim().match(': ');
      });
      lines.forEach(function(line) {
        var parts = line.split(": ");
        var key = changeCase.camelCase(parts[0]);
        response[key] = parts[1];
      });
    }

    return cb(null, response);
  });

};