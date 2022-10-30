
function displayLightBox() {
    const mainDOM = document.querySelector("#main-photographer-page");
    const lightbox = document.getElementById("lightbox-medias");
    const body = document.querySelector("body");
	lightbox.style.display = "block";
    mainDOM.setAttribute("aria-hidden", true);
    lightbox.setAttribute("aria-hidden", false);
    body.classList.add("no-scroll");
}

function closeLightBox() {
    const lightbox = document.getElementById("lightbox-medias");
    const mainDOM = document.querySelector("#main-photographer-page");
    const body = document.querySelector("body");
    lightbox.style.display = "none";
    mainDOM.setAttribute("aria-hidden", false);
    lightbox.setAttribute("arai-hidden", true);
    body.classList.remove("no-scroll");
}

let slideIndex = 1;

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

// EventListener click for controls
document.querySelector(".close").addEventListener("click", function(event) {
    closeLightBox();
});

document.querySelector(".prev").addEventListener("click", function(event) {
    plusSlides(-1);
});

document.querySelector(".next").addEventListener("click", function(event) {
    plusSlides(1);
});


// Keyboard controls
document.addEventListener('keydown', event => {

    if (document.querySelector("#lightbox-medias").getAttribute("aria-hidden") == 'false') {
        
        if (event.key === "Escape") {
            closeLightBox();
        } else if (event.key === "ArrowLeft") {
            plusSlides(-1);
        } else if (event.key === "ArrowRight") {
            plusSlides(1);
        }
    };
 });