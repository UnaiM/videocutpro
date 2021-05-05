inYT.addEventListener('change', function() {
  var idYT = YouTubeGetID(inYT.value.trim())
  if (/^[a-z0-9\-_]{11}$/i.test(idYT)) {
    parsedYT.value = idYT
    inYT.setCustomValidity('')
  }
  else
    inYT.setCustomValidity('Couldn’t retrieve a valid YouTube video ID.')
})
inYT.addEventListener('input', function() {
  inYT.setCustomValidity('')
})
document.querySelector('form').addEventListener('submit', function(evt) {
  if (!inYT.checkValidity())
    evt.preventDefault()
})