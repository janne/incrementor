function regexp_string() {
  return localStorage["regexp"] || regexp_default;
}

function regexp() {
  return new RegExp(regexp_string());
}

function step(invert) {
  var value = localStorage["step"] ? parseInt(localStorage["step"]) : step_default;
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

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
  if (request == "increment" && sender.tab.url.match(regexp()))
    incrementTab(sender.tab);
  else if (request == "decrement" && sender.tab.url.match(regexp()))
    incrementTab(sender.tab, true);
  else if (request == 'regexp')
    sendResponse(regexp_string());
  else if (request == 'show')
    chrome.pageAction.show(sender.tab.id);
});

chrome.pageAction.onClicked.addListener(function(tab) {
  incrementTab(tab);
})
