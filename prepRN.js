var termsRN = 'dog cat animal pet cute adorable'.split(' '),
  maxRN = 20
prepRN()
window.addEventListener('hashchange', prepRN)
function prepRN() {
  if (window.location.hash.indexOf('random') > -1) {
    window.history.replaceState('prepRN savepoint', '', window.location.pathname)
    window.history.pushState('prepRN aftersave', '', window.location.pathname + '#random')
    gapi.load('client', function() {
      gapi.client.setApiKey('AIzaSyBtgEQPAh5blOqSYry2jmwwCPcV4-H4cTo')
      gapi.client.load('youtube', 'v3').then(function() {
        gapi.client.youtube.search.list({
          part: 'snippet',
          q: termsRN[Math.floor(Math.random()*termsRN.length)],
          type: 'video',
          safeSearch: 'strict',
          videoEmbeddable: 'true',
          videoSyndicated: 'true',
          maxResults: maxRN,
          order: 'rating'
        }).then(function(response) {
          window.history.replaceState('prepRN to loadVideo', '', window.location.pathname + '?v=' + response.result.items[Math.floor(Math.random()*maxRN)].id.videoId)
          loadVideo()
        })
      })
    })
  }
}
