// not exactly a diff but for some reason for edit form, 
// change field have value kept but other is set as empty string
export default function objectDiff (obj) {
  var newObj = {}
  for (var key in obj) {
    if (obj[key] !== '') {
      newObj[key] = obj[key]
    }
  }
  return newObj
}
