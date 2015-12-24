(function() {
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log('request');
    var board = new ScoreBoard(request);
    board.calculate();
    var timer = setInterval(function() {
      if(board.complete()) {
        clearInterval(timer);
        chrome.tabs.sendMessage(sender.tab.id, {request: request, sender: sender, score: board.buildScore(), details: board.buildDetails()});
      }
    }, 100);
  });
}).call(this);