$(document).ready(function() {
  chrome.extension.sendRequest("regexp", function(response) {
    $("#regexp").val(response);
  });
  chrome.extension.sendRequest("step", function(response) {
    $("#step").val(response);
  });
});

// Saves options to localStorage
function save_options() {
  var regexp = $("#regexp").val();
  localStorage["regexp"] = regexp;
  var step = $("#step").val();
  localStorage["step"] = step;
}

// Delete options from localStorage
function restore_defaults() {
  delete localStorage["regexp"];
  delete localStorage["step"];
}
