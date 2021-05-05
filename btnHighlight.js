var hlBtns = document.querySelectorAll('.button'),
  i = 0
for (i; i < hlBtns.length; i++) {
  hlBtns[i].addEventListener('mouseover', function(ele) {
    ele.target.parentElement.style.backgroundColor = 'rgba(255, 255, 255, 0.9)'
  })
  hlBtns[i].addEventListener('mouseout', function(ele) {
    ele.target.parentElement.style.backgroundColor = ''
  })
}