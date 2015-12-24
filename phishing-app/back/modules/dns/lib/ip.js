var dns = require('dns');

module.exports.respond = function(event, cb) {
  if(event.hostname === undefined) {
    return cb(new Error("hostname is required"), null);
  }

  dns.resolve(event.hostname, function (err, addresses) {
    if (err) {
      return cb(err, null);
    }

    var response = JSON.stringify(addresses);

    return cb(null, response);
  });
};