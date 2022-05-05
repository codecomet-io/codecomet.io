var Slideshow = function(anc){
  const anchor = anc;
  let slideIndex = 0;
  let speed = window.overspeed ? window.overspeed : 3000;

  let trigger;

  let showSlides = function(inc){
    let i;
    let slides = anchor.getElementsByClassName("slides");
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slideIndex += inc ? inc : 1;
    if (slideIndex > slides.length) {slideIndex = 1}
    if (slideIndex <= 0){ slideIndex = slides.length; }
    slides[slideIndex-1].style.display = "block";
  }

  const prev = anchor.getElementsByClassName("prev")[0];
  const next = anchor.getElementsByClassName("next")[0];
  console.warn("THIS IS NEXT", next);
  prev.addEventListener("click", function(){
    showSlides(-1)
  });
  next.addEventListener("click", function(){
    console.warn("UUUI");
    showSlides(1)
  });

  const start = this.start = function(noKick){
    if (trigger)
      return;
    if (!noKick)
      showSlides();
    trigger = setInterval(showSlides, speed);
  }

  const stop = this.stop = function(){
    if (!trigger)
      return;
    clearInterval(trigger);
    trigger = "";
  }

  let cntainer = anchor.getElementsByClassName("slideshow-container")[0];
  cntainer.addEventListener("mouseenter", stop);
  cntainer.addEventListener("mouseleave", start);
}

window.addEventListener('DOMContentLoaded', (event) => {
  let nodes = document.querySelectorAll(".livres_slide");
  for (var x = 0; x < nodes.length; x++) {
    let s = new Slideshow(nodes[x]);
    s.start();
  }
});
