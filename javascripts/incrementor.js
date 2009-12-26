jQuery.noConflict();

jQuery(document).ready(function() {
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

  // Show button if valid url
  chrome.extension.sendRequest("regexp", function(response) {
    if (window.location.toString().match(new RegExp(response))) {
      chrome.extension.sendRequest("show");
    }
  });
});
