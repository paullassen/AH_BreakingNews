
chrome.runtime.onInstalled.addListener(function (d) {
  if(d.reason == 'install') { // init needed data
    chrome.storage.local.set({
      running: true,
      notAllowed: []
    });
  }
});
