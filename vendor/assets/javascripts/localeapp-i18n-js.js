var I18n = I18n || {};

//override the default I18n-js missingTranslation method to post back missing translations
I18n.missingTranslation = function() {
  var path = [], count = arguments.length
  for (var i = 0; i < count; i++) {
    path.push(arguments[i]);
  }
  path = path.join('.')

  if(this.report_missing_translations) {
    this.add_missing_translation(this.currentLocale(), path);
  }

  return '[missing "' + this.currentLocale() + path + '" translation]';

};

I18n.add_missing_translation = function add_missing_translation(locale, key) {
    $.ajax({
      url: "/localeapp_i18n_js",
      type: 'POST',
      dataType: 'json',
      data: {locale: locale, key: key},
      error: function(data, status, response) {
	console.log(response)
      }
    });
}
