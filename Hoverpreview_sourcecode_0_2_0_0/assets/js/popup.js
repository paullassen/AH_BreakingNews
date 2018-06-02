var isRunning  = true,
    notAllowed = [],
    currentHost = '';

var $pausume    = null,
    $blacklist  = null;

function getStore (data, cb) {
  chrome.storage.local.get(data, cb);
}

function setStore (data, cb) {
  chrome.storage.local.set(data, cb);
}

getStore(null, function (data) {
  notAllowed = data.notAllowed === undefined ? [] : data.notAllowed;
  isRunning = data.running === undefined ? true : data.running;

  setButtonText();
});

function setButtonText() {
  $pausume.text( isRunning ? 'Pause' : 'Resume' );
}

function setAllowedCheck() {
  if(notAllowed.indexOf(currentHost) < 0) {
    $blacklist.removeAttr('checked');
  } else {
    $blacklist.attr('checked', 'checked');
  }

  $('#host').text(currentHost);
}

$(function () {

  $pausume    = $('#pausume');
  $blacklist  = $('#blacklist');

  chrome.tabs.query({
    active: true,
    currentWindow: true
  },function (tabs) {
    currentHost = new URL(tabs[0].url);
    currentHost = currentHost.hostname;

    setAllowedCheck();
  });

  $pausume.on('click', function () {
    isRunning = !isRunning;

    setStore({
      running: isRunning
    }, setButtonText);

  });

  $blacklist.on('click', function () {

    if(notAllowed.indexOf(currentHost) > -1) {
      var index = notAllowed.indexOf(currentHost);
      notAllowed.splice(index, 1);
    } else if(notAllowed.indexOf(currentHost) < 0) {
      notAllowed.push(currentHost);
    }

    setStore({
      notAllowed: notAllowed
    });

  });

});


// data analytics by Creative Stall from the Noun Project
