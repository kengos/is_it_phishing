(function() {
  var injectHtml = '<div id=phishing-injection><style>body{background-color:#f0f0f0;color:#333}*{box-sizing:border-box}#phishing-injection{width:800px;height:500px;margin:50px auto;padding:10px;background-color:#fff;border-radius:6px;border:1px solid #d8d8d8}#phishing-injection h2{padding:0 0 .3em 0;margin:.83em 0;font-size:1.75em;line-height:1.225;border:none;border-bottom:1px solid #eee;text-align:center;color:#aa6708}#phishing-injection ul{margin:0 0 0 2em;padding:0 0 0 2em;line-height:1.8;font-size:1.25em}#phishing-injection-bottons{margin:1em 0;text-align:center}</style><div id=phishing-injection-box><h2>このサイトはフィッシングサイトの疑いがあります。</h2><div id=phishing-injection-message-box><ul id=phishing-injection-messages></ul></div><div id=phishing-injection-bottons><a href=# class=js-do-not-display>このページでは表示しない</a></div></div></div>';
  var replaceDocument = function() {
    var body = document.querySelector('body');
    var oldContent = document.createElement("div")
    oldContent.style.display = 'none';
    oldContent.innerHTML = body.innerHTML;

    body.innerHTML = injectHtml;
    body.appendChild(oldContent);
  };

  chrome.runtime.onMessage.addListener(function(response, sender, sendResponse) {
    console.log(response);
    if (response.score < 80) {
      return;
    }

    replaceDocument();
    // Document書き換え
    var ulTag = document.querySelector('#phishing-injection-messages');

    response.messages.forEach(function(message) {
      var liTag = document.createElement('li');
      liTag.innerHTML = message;
      ulTag.appendChild(liTag);
    });
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

  // スクリプト hostnameを取得していく
  var scripts = collectSrc(document.querySelectorAll('script[src]'));
  // iframe hostnameを取得していく
  var iframes = collectSrc(document.querySelectorAll('iframe[src]'));

  chrome.runtime.sendMessage({
    location: window.location,
    scripts: scripts.concat(iframes)
  });

}).call(this);