var video = document.querySelector('video'),
  player, ytID
loadVideo()
window.addEventListener('popstate', loadVideo)
function loadVideo() {
  var query = window.location.search
  if (!query || query.indexOf('v=') < 0) {
    vPop()
    return
  }
  else
    vPop(loading)
  if (query.indexOf('v=computer') > -1) {
    if (!urlCO)
      vPop(COerrNF)
    else {
      video.src = window.history.state
      video.addEventListener('canplay', editVideo)
      video.addEventListener('stalled', function() {
        history.replaceState(undefined, '', window.location)
        vPop(COerrLD)
      })
      video.addEventListener('error', function() {
        history.replaceState(undefined, '', window.location)
        vPop(COerrLD)
      })
    }
  }
  else {
    ytID = /v\=[a-zA-Z0-9\-_]{11}(?=[^a-zA-Z0-9\-_]*.*$)/.exec(query.slice(1))
    if (!ytID) {
      history.replaceState(undefined, '', window.location)
      vPop(YTerrID)
    }
    else {
      ytID = ytID[0].slice(2)
      var tag = document.createElement('script'),
        firstScriptTag = document.querySelector('script')
      tag.id = 'ytAPI'
      tag.src = 'https://www.youtube.com/player_api'
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
    }
  }
}
function onYouTubeIframeAPIReady() {
  if (ytID) {
    player = new YT.Player('playerEle', {
      playerVars: {
        autoplay: 1,
        controls: 0,
        loop: 1,
        showinfo: 0,
        modestbranding: 1,
        rel: 0
      },
      videoId: ytID,
      events: {
        onReady: editVideo,
        onError: function() {
          history.replaceState(undefined, '', window.location)
          vPop(YTerrNF)
        },
        onStateChange: function(e) {
          if (e.data === YT.PlayerState.ENDED)
            player.playVideo()
        }
      }
    })
  }
}
function vPop(pop) {
  video.pause()
  video.src = ''
  video.load()
  if (player) {
    try {
      player.destroy()
    }
    catch(e) {
      player = undefined
      ytID = undefined
      if (document.getElementById('ytAPI'))
        ytAPI.parentNode.removeChild(ytAPI)
      editor.removeChild(playerEle)
      var newDiv = document.createElement('div')
      newDiv.id = 'playerEle'
      editor.insertBefore(newDiv, can1)
      onYouTubeIframeAPIReady()
    }
  }
  editor.style.visibility = 'hidden'
  if (pop) {
    lvlUp.style.visibility = 'visible'
    lvlUp.style.backgroundColor = ''
    var hid = document.querySelectorAll('.popup')
    for (var i=0; i<hid.length; i++) {
      hid[i].style.opacity = '0'
      hid[i].style.visibility = 'hidden'
    }
    pop.style.visibility = 'visible'
    pop.style.opacity = '1'
  }
}
