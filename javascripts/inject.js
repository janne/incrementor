jQuery.noConflict();

// Fetch regexp
chrome.extension.sendRequest("regexp", function(response) {
  if (String(window.location).match(new RegExp(response))) {
    // Show button if valid url
    chrome.extension.sendRequest("show");

    // Handle keydown
    jQuery(window).bind('keydown',function(e) {
      if (e.ctrlKey && e.altKey) {
        if (e.keyCode == 37) {
          chrome.extension.sendRequest("decrement");
        } else if (e.keyCode == 39) {
          chrome.extension.sendRequest("increment");
        }
      }
    });
  }
});
