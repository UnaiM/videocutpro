var popups = document.querySelectorAll('.popup')
doPopup()
window.addEventListener('popstate', doPopup)
lvlUp.addEventListener('click', function() {
  if (!window.history.state) {
    var href = window.location.href
    window.history.replaceState('lvlUp savepoint', '', window.location.pathname)
    window.history.pushState('lvlUp aftersave', '', href)
  }
  window.history.back()
})
function doPopup() {
  var hash = window.location.hash.split('#'),
    popup = document.getElementById(hash[hash.length-1])
  if (popup) {
    lvlUp.style.visibility = 'visible'
    lvlUp.style.backgroundColor = ''
    popup.style.visibility = 'visible'
    popup.style.opacity = '1'
  }
  else {
    lvlUp.style.backgroundColor = 'transparent'
    lvlUp.style.visibility = 'hidden'
    for(var i = 0; i < popups.length; i++){
      popups[i].style.opacity = '0'
      popups[i].style.visibility = 'hidden'
    }
  }
}
