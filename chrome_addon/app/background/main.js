(function() {
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log('request');
    var board = new ScoreBoard(request);
    board.calculate(function(score, details) {
      chrome.tabs.sendMessage(sender.tab.id, {request: request, sender: sender, score: score, details: details});
    });
  });
}).call(this);