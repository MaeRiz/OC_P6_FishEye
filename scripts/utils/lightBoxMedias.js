function displayLightBox() {
    const lightbox = document.getElementById("lightbox-medias");
	lightbox.style.display = "block";
}

function closeLightBox() {
    const lightbox = document.getElementById("lightbox-medias");
    lightbox.style.display = "none";
}

let slideIndex = 1;
//showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  const slides = document.getElementsByClassName("mySlides");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex-1].style.display = "block";
}
