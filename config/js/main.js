(function() {
  loadOptions();
  submitHandler();
})();

function submitHandler() {
  var $submitButton = $('#submitButton');

  $submitButton.on('click', function() {
    console.log('Submit');

    var return_to = getQueryParam('return_to', 'pebblejs://close#');
    document.location = return_to + encodeURIComponent(JSON.stringify(getAndStoreConfigData()));
  });
}

function loadOptions() {
  var $backgroundColorPicker = $('#backgroundColorPicker');
  var $foregroundColorPicker = $('#foregroundColorPicker');
  var $fuzzyFormatCheckbox = $('#fuzzyFormatCheckbox');

  if (localStorage.backgroundColor) {
    $backgroundColorPicker[0].value = localStorage.backgroundColor;
    $foregroundColorPicker[0].value = localStorage.foregroundColor;
    $fuzzyFormatCheckbox[0].checked = localStorage.fuzzyTimeFormat === 'true';
  }
}

function getAndStoreConfigData() {
  var $backgroundColorPicker = $('#backgroundColorPicker');
  var $foregroundColorPicker = $('#foregroundColorPicker');
  var $fuzzyFormatCheckbox = $('#fuzzyFormatCheckbox');

  var options = {
    backgroundColor: $backgroundColorPicker.val(),
    foregroundColor: $foregroundColorPicker.val(),
    fuzzyTimeFormat: $fuzzyFormatCheckbox[0].checked
  };

  localStorage.backgroundColor = options.backgroundColor;
  localStorage.foregroundColor = options.foregroundColor;
  localStorage.fuzzyTimeFormat = options.fuzzyTimeFormat;

  console.log('Got options: ' + JSON.stringify(options));
  return options;
}

function getQueryParam(variable, defaultValue) {
  var query = location.search.substring(1);
  var vars = query.split('&');
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    if (pair[0] === variable) {
      return decodeURIComponent(pair[1]);
    }
  }
  return defaultValue || false;
}
