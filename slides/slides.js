var curSlide, slides

// Slide/hashmark management

window.onload = function() {
  slides = document.body.getElementsByTagName("slide")
  changeSlide(document.location.hash ? Number(document.location.hash.slice(1)) : 0)

  window.onhashchange = function() {
    var n = document.location.hash ? Number(document.location.hash.slice(1)) : 0
    changeSlide(n)
  }

  window.onkeydown = function(e) {
    if (e.target != document.body) return
    var key = e.keyCode
    if (key == 38 || key == 37 || key == 33) changeSlide(curSlide - 1)
    else if (key == 40 || key == 39 || key == 34) changeSlide(curSlide + 1)
    else if (key == 36) changeSlide(0)
    else if (key == 35) changeSlide(slides.length - 1)
    else return
    e.preventDefault()
  }
}

function changeSlide(n) {
  n = Math.max(Math.min(n, slides.length - 1), 0)
  if (n == curSlide) return
  if (curSlide != null) slides[curSlide].style.display = ""
  curSlide = n
  let node = slides[curSlide]
  node.style.display = "block"
  let cm = node.querySelector(".CodeMirror")
  if (cm) cm.CodeMirror.refresh()
  document.location.hash = "#" + n
}
