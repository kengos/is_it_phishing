(function() {
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    var board = new ScoreBoard(request);
    board.calculate();
    var timer = setInterval(function() {
      if(board.complete()) {
        clearInterval(timer);
        chrome.tabs.sendMessage(sender.tab.id, {request: request, sender: sender, score: board.getScore(), messages: board.getMessages()});
      }
    }, 100);
  });
}).call(this);