var dns = require('dns');

module.exports.respond = function(event, cb) {
  if(event.hostname === '') {
    return cb(new Error("hostname is required"), null);
  }

  dns.resolve(event.hostname, function (err, addresses) {
    if (err) {
      return cb(err, null);
    }

    return cb(null, addresses);
  });
};