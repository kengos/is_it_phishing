(function() {
  chrome.runtime.onMessage.addListener(function(response, sender, sendResponse) {
    console.log('onMessage');
    console.log(response);

    // var body = document.querySelector('body');
    // var oldContent = document.createElement("div")
    // oldContent.style.display = 'none';
    // oldContent.innerHTML = body.innerHTML;

    // var overlay = document.createElement('div');
    // overlay.setAttribute('id', 'is-it-phishing-overlay');
    // overlay.textContent = 'overlay';
    // body.innerHTML = '';
    // body.appendChild(overlay);
    // body.appendChild(oldContent);
  });

  var collectSrc = function(objects) {
    var parser = document.createElement('a');
    return [].map.call(objects, function(tagObject) {
      parser.href = tagObject.getAttribute("src").trim();
      return parser.hostname;
    }).filter(function (x, i, self) {
      return self.indexOf(x) === i;
    });
  }

  var doc = document.querySelector('body').textContent;

  // スクリプト hostnameを取得していく
  var scripts = collectSrc(document.querySelectorAll('script[src]'));
  // iframe hostnameを取得していく
  var iframes = collectSrc(document.querySelectorAll('iframe[src]'));

  chrome.runtime.sendMessage({
    location: window.location,
    doc: doc,
    scripts: scripts,
    iframes: iframes
  });

}).call(this);