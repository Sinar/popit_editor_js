export function getLanguage () {
  var language = localStorage.getItem('language')
  if (language === null) {
    language = 'en'
  }
  return language
}
