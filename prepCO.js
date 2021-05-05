var urlCO
inCO.addEventListener('change', function() {
  urlCO = URL.createObjectURL(this.files[0])
  window.history.pushState(urlCO, '', window.location.pathname + '?v=computer')
  loadVideo()
})
