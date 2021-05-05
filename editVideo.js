function editVideo() {
  mute.style.backgroundPosition = ''
  var tips = document.querySelectorAll('.tooltip'),
    step,
    ctx1 = can1.getContext('2d'),
    ctx2 = can2.getContext('2d'),
    press = 0,
    pnt1 = {
      x: 0,
      y: 0
    },
    pnt2 = {
      x: 0,
      y: 0
    },
    W = 0,
    H = 0,
    diag = 0,
    asp = 16 / 9,
    res = {
      w: 0,
      h: 0,
      x: 0,
      y: 0
    },
    cuts = []
  if (player) {
    var xhr = new XMLHttpRequest()
    xhr.open('get', 'getYTaspect.php?id=' + ytID)
    xhr.addEventListener('load', function() {
      var aspect = xhr.response
      if (aspect)
        asp = aspect
    })
    xhr.send()
  }
  else
    asp = video.videoWidth / video.videoHeight
  editor.style.visibility = 'visible'
  mute.addEventListener('click', function() {
    if (player) {
      if (player.isMuted()) {
        player.unMute()
        mute.style.backgroundPosition = ''
      }
      else {
        player.mute()
        mute.style.backgroundPosition = '3em 0'
      }
    }
    else {
      if (video.muted) {
        video.muted = 0
        mute.style.backgroundPosition = ''
      }
      else {
        video.muted = 1
        mute.style.backgroundPosition = '3em 0'
      }
    }
  })
  showTip(stepA)
  draw()
  for (var i = 0; i < tips.length; i++)
    tips[i].querySelector('button').addEventListener('click', showTip)
  window.addEventListener('resize', draw)
  setTimeout(function() {
    can2.addEventListener('mousedown', function(e) {
      press = 1
      pnt1.x = e.layerX
      pnt1.y = e.layerY
      drag(e)
    })
    can2.addEventListener('mousemove', drag)
    can2.addEventListener('mouseup', function(e) {
      if (!press)
        return
      press = 0
      if (pnt1.x == pnt2.x && pnt1.y == pnt2.y) {
        ctx2.clearRect(0, 0, W, H)
        return
      }
      else if (!step) {
        showTip(stepB)
        step = 1
      }
      ctx2.clearRect(0, 0, W, H)
      cuts.push({
        x1: (pnt1.x-res.x) / res.w,
        y1: (pnt1.y-res.y) / res.h,
        x2: (pnt2.x-res.x) / res.w,
        y2: (pnt2.y-res.y) / res.h
      })
      draw()
    })
  }, 1000)
  function showTip(ele) {
    for (var i = 0; i < tips.length; i++)
        tips[i].style.top = ''
    if (!ele.type)
      setTimeout(function() {
        ele.style.top = '-2em'
      }, 300)
  }
  function draw() {
    W = window.innerWidth
    H = window.innerHeight
    diag = Math.sqrt(Math.pow(W, 2) + Math.pow(H, 2))
    res.w = W<H*asp ? W : H*asp
    res.h = W<H*asp ? W/asp : H
    res.x = (W-res.w) / 2
    res.y = (H-res.h) / 2
    can2.width = W
    can2.height = H
    ctx2.strokeStyle = '#FFF'
    ctx2.lineWidth = 2
    ctx2.setLineDash([4, 5])
    ctx2.lineCap = 'round'
    can1.width = W
    can1.height = H
    ctx1.clearRect(0, 0, W, H)
    if (!cuts.length)
      return
    ctx1.beginPath()
    for (var i=0; i<cuts.length; i++) {
      pnt1.x = cuts[i].x1 * res.w + res.x
      pnt1.y = cuts[i].y1 * res.h + res.y
      pnt2.x = cuts[i].x2 * res.w + res.x
      pnt2.y = cuts[i].y2 * res.h + res.y
      var x = pnt2.x - pnt1.x,
          y = pnt2.y - pnt1.y,
          l = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)),
          r = 20
      x = x / l
      y = y / l
      ctx1.moveTo(pnt1.x-x*diag, pnt1.y-y*diag)
      ctx1.lineTo(pnt1.x+x*diag, pnt1.y+y*diag)
      ctx1.lineTo(pnt1.x+(x-y)*diag, pnt1.y+(y+x)*diag)
      ctx1.lineTo(pnt1.x-(x+y)*diag, pnt1.y-(y-x)*diag)
    }
    ctx1.clip()
    ctx1.save()
    var scl = Math.max(W, H) / 1000,
        w = W/scl,
        h = H/scl
    ctx1.scale(scl, scl)
    ctx1.fillStyle = '#986'
    ctx1.fillRect(0, 0, w, h)
    ctx1.fillStyle = '#796'
    roundRect(24, 23, w-50, h-52, 30)
    ctx1.fill()
    ctx1.save()
    ctx1.fillStyle = '#241'
    ctx1.shadowColor = '#000'
    ctx1.shadowOffsetX = 1
    ctx1.shadowOffsetY = 2
    ctx1.shadowBlur = 8
    roundRect(26, 27, w-50, h-52, 30)
    ctx1.fill()
    ctx1.restore()
    ctx1.fillStyle = '#352'
    roundRect(25, 25, w-50, h-52, 30)
    ctx1.fill()
    ctx1.strokeStyle = '#ACA'
    ctx1.lineWidth = 2
    ctx1.lineCap = 'round'
    roundRect(40, 40, w-80, h-80, 20)
    ctx1.stroke()
    ctx1.lineWidth = 1
    var num = 100,
        mar = 60,
        nw = w - mar*2,
        nh = h - mar*2,
        xnum = nh>nw ? Math.floor(num*nw/nh) : num,
        ynum = nh>nw ? num : Math.floor(num*nh/nw)
    for (var i=0; i<xnum+1; i++) {
      ctx1.save()
      if (i%5 == 0)
        ctx1.lineWidth = 2
      ctx1.beginPath()
      var pos = mar + nw*i/xnum
      ctx1.moveTo(pos, mar)
      ctx1.lineTo(pos, h-mar)
      ctx1.stroke()
      ctx1.restore()
    }
    for (var i=0; i<ynum+1; i++) {
      ctx1.save()
      if (i%5 == 0)
        ctx1.lineWidth = 2
      ctx1.beginPath()
      var pos = mar + nh*i/ynum
      ctx1.moveTo(mar, pos)
      ctx1.lineTo(w-mar, pos)
      ctx1.stroke()
      ctx1.restore()
    }
    ctx1.restore()
  }
  function drag(e) {
    if (!press)
      return
    pnt2.x = e.layerX
    pnt2.y = e.layerY
    ctx2.clearRect(0, 0, W, H)
    ctx2.save()
    ctx2.translate(pnt1.x, pnt1.y)
    ctx2.rotate(Math.atan2(pnt2.y-pnt1.y, pnt2.x-pnt1.x))
    var grad = ctx2.createLinearGradient(0, 0, 0, 20)
    grad.addColorStop(0, 'rgba(255, 0, 0, 0.5)')
    grad.addColorStop(0.5, 'rgba(255, 0, 0, 0.15)')
    grad.addColorStop(1, 'rgba(255, 0, 0, 0)')
    ctx2.fillStyle = grad
    ctx2.fillRect(-diag, 0, diag * 2, 20)
    ctx2.fillStyle = '#FFF'
    ctx2.beginPath()
    ctx2.moveTo(-diag, 0)
    ctx2.lineTo(diag, 0)
    ctx2.stroke()
    ctx2.beginPath()
    ctx2.arc(0, 0, 4, 0, Math.PI*2)
    ctx2.fill()
    ctx2.restore()
  }
  function roundRect(x, y, w, h, r) {
    ctx1.beginPath()
    ctx1.moveTo(x, y+r)
    ctx1.arc(x+r, y+r, r, Math.PI, -Math.PI/2)
    ctx1.lineTo(x+w-r, y)
    ctx1.arc(x+w-r, y+r, r, -Math.PI/2, 0)
    ctx1.lineTo(x+w, y+h-r)
    ctx1.arc(x+w-r, y+h-r, r, 0, Math.PI/2)
    ctx1.lineTo(x+r, y+h)
    ctx1.arc(x+r, y+h-r, r, Math.PI/2, Math.PI)
    ctx1.closePath()
  }
}
