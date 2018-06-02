var
  isGettingURL = false,
  isRunning    = true,
  metaFetcher  = null,
  currentURL   = null,
  currentElem  = null,
  xhr          = null,
  waitTime     = 1000;

var pageCache  = [],
    elemCache  = [],
    notAllowed = [];

function getMeta(url, cb) {
  url = encodeURIComponent(url);
  isGettingURL = true;
  xhr = $.get('https://api.urlmeta.org/?url=' + url).then(cb).fail(showError);
}

function createContent(meta, onlyHead) {
  var image   = null,
      title   = null;

  if(onlyHead) {
    image = (meta.type.substr(0,5) == 'image') ? '<img src="'+ meta.url +'" /> ' : '';
    title = meta.size ? (parseInt(meta.size)/1024).toPrecision(2) + ' KB file' : '';
  } else {
    image = meta.image ? '<img src="'+ meta.image +'" /> ' : '';
    title = meta.title ? meta.title : '';
  }

  var content = '<div class="metaWrapper"><div class="metaImage">'+ image +'</div><div class="metaContent"><div class="metaHolder">';

  var favIcon = meta.favicon ? '<img src="'+ meta.favicon +'" height="10px" width="10px" /> ' : '';

  content += '<h3>' + title + '</h3>';
  content += meta.description ? '<div class="metaDesc">' + meta.description + '</div>' : '';
  content += '<small>' + favIcon + meta.url + '</small>';

  content += '</div></div></div>';

  return content;
}

function showMeta(meta, onlyHead) {
  $(currentElem).tooltipster('content', createContent(meta, onlyHead)).tooltipster('show');
}

function showError() {
  $(currentElem).tooltipster('hide');
}

function callback(res) {
  isGettingURL = false;
  if(res.result.status == 'OK') {
    pageCache[currentURL] = res.meta;
    showMeta(res.meta, res.result.onlyHead);
  } else {
    showError();
  }
}

function showToolTip(content) {
  $(currentElem).tooltipster({
    delay: 10,
    maxWidth: 400,
    // autoClose: false,
    interactive: true,
    content: $(content),
    contentAsHTML: true,
    restoration: 'none',
    theme: 'meta-link-preview'
  }).tooltipster('show');
}

function subscribe() {
  $('a').hover(function () {

    var url = new URL(this.href);
    if(url.protocol.substr(0, 4) !== 'http') {
      return;
    }

    currentURL  = this.href;
    currentElem = this;

      metaFetcher = setTimeout(function () {

        if(pageCache[currentURL] !== undefined) {
          showMeta(pageCache[currentURL]);
          return;
        } else {
          showToolTip('<div class="metaLoading"><div class="cssload-box-loading"></div></div>');
          getMeta(currentURL, callback);
        }

      }, waitTime);

  }, function () {
    clearTimeout(metaFetcher);
    isGettingURL = false;
  });
}

function unsub() {
  $('a').off( "mouseenter mouseleave" );
}

$(function () {

  if(notAllowed.indexOf(window.location.hostname) > -1 || !isRunning) {
    return;
  } else {
    setTimeout(subscribe, 1000);
  }

});

function getStore (data, cb) {
  chrome.storage.local.get(data, cb);
}

getStore(null, function (data) {
  notAllowed = data.notAllowed === undefined ? [] : data.notAllowed;
  isRunning = data.running === undefined ? true : data.running;
});

chrome.storage.onChanged.addListener(function (changes) {

  if(changes.notAllowed) {
    if(notAllowed.indexOf(window.location.hostname) < 0 &&
      changes.notAllowed.newValue.indexOf(window.location.hostname) > -1) {
      unsub();
    } else if(notAllowed.indexOf(window.location.hostname) > -1 &&
      changes.notAllowed.newValue.indexOf(window.location.hostname) < 0) {
      subscribe();
    }

    notAllowed = changes.notAllowed.newValue;
  }

  if(changes.running) {
    isRunning = changes.running.newValue;

    if(!isRunning) {
      unsub();
    } else {
      subscribe();
    }
  }

});

//speech-bubble by Sébastien Laading from the Noun Project
//link by Nathan Diesel from the Noun Project
