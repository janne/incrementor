// Saves options to localStorage.
function save_options() {
  var regexp = document.getElementById("regexp").value;
  localStorage["regexp"] = regexp;
  var step = document.getElementById("step").value;
  localStorage["step"] = step;
}

// Restores select box state to saved value from localStorage.
function restore_options() {
  var regexp = localStorage["regexp"] || regexp_default;
  document.getElementById("regexp").value = regexp;
  var step = localStorage["step"] || step_default;
  document.getElementById("step").value = step;
}

function restore_defaults() {
  localStorage["regexp"] = regexp_default;
  localStorage["step"] = step_default;
  restore_options();
}
