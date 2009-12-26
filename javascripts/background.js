function regexp() {
  return new Regexp(localStorage["regexp"] || regexp_default());
}

function step(invert) {
  var value = localStorage["step"] ? parseInt(localStorage["step"]) : step_default();
  if (invert)
    value = -value;
  return value;
}

function incrementTab(tab, invert) {
  var number = tab.url.match(regexp()).toString();
  var int_number = parseInt(number,10);
  var replace = (int_number + step(invert)).toString();

  // Handle zero padding
  if (number.match(/^0+/) && int_number > 0) {
    var zeroes = number.match(/^0+/).toString().length + (int_number.toString()).length - replace.length;
    for (var i=0; i<zeroes; i++) replace = "0" + replace;
  }

  chrome.tabs.update(tab.id, {url: tab.url.replace(regexp(), replace)});
}

chrome.extension.onRequest.addListener(function(request, sender, response) {
    // Left
    if (request.alt && request.code == 37 && sender.tab.url.match(regexp()))
      incrementTab(sender.tab, true);

    // Right
    if (request.alt && request.code == 39 && sender.tab.url.match(regexp()))
      incrementTab(sender.tab);
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo) {
  if (changeInfo.url) {
    if (changeInfo.url.match(regexp()))
      chrome.pageAction.show(tabId);
    else
      chrome.pageAction.hide(tabId);
  }
});

chrome.tabs.onSelectionChanged.addListener(function(tabId) {
  chrome.tabs.get(tabId, function(tab) {
    if (tab.url.match(regexp()))
      chrome.pageAction.show(tabId);
    else
      chrome.pageAction.hide(tabId);
  });
});

chrome.pageAction.onClicked.addListener(function(tab) {
  incrementTab(tab);
})