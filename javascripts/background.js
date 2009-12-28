function regexp_string() {
  return localStorage["regexp"] || "\\d+(?!.*\\d+)";
}

function regexp() {
  return new RegExp(regexp_string());
}

function step_string() {
  return localStorage["step"] || "1";
}

function step(invert) {
  var value = Number(step_string());
  if (invert)
    value = -value;
  return value;
}

function incrementTab(tab, invert) {
  var number = String(tab.url.match(regexp()));
  var int_number = Number(number);
  var replace = String(int_number + step(invert));

  // Handle zero padding
  if (number.match(/^0+/) && int_number > 0) {
    var zeroes = String(number.match(/^0+/)).length + String(int_number).length - replace.length;
    for (var i=0; i<zeroes; i++) replace = "0" + replace;
  }

  chrome.tabs.update(tab.id, {url: tab.url.replace(regexp(), replace)});
}

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
  if (request == "increment")
    incrementTab(sender.tab);
  else if (request == "decrement")
    incrementTab(sender.tab, true);
  else if (request == "regexp")
    sendResponse(regexp_string());
  else if (request == "step")
    sendResponse(step_string());
  else if (request == "show")
    chrome.pageAction.show(sender.tab.id);
});

chrome.pageAction.onClicked.addListener(function(tab) {
  incrementTab(tab);
})
