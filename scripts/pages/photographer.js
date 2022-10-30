async function getPhotographer(photographer_id) {

    const response = await fetch('../../data/photographers.json');
    const data = await response.json();

    for (let i=0 ; i < data.photographers.length ; i++){

        if (data.photographers[i].id == photographer_id) {
            return (data.photographers[i]);
        };
    };

};

async function getMedias(photographer_id) {
    const response = await fetch('../../data/photographers.json');
    const data = await response.json();

    let mediasList = [];

    for (let i=0 ; i < data.media.length ; i++){

        if (data.media[i].photographerId == photographer_id) {
            mediasList.push(data.media[i]);
        };
    };
    return (mediasList);

}
;
async function displayData(photographer, medias) {
    const photographersSection = document.querySelector(".photograph-header");
    const photographModalName = document.querySelector("#photographer-name");
    const mediasSection = document.querySelector(".medias-section");
    const mediasLightBox = document.querySelector("#lightbox-content");
    const bodyPageDOM = document.querySelector('body');

    const photographerModel = photographerFactory(photographer);
    const photographerPageCard = photographerModel.getPhotographerPageCard();
    photographersSection.appendChild(photographerPageCard.article);

    photographModalName.innerHTML = photographer.name;

    // Medias creation
    let current = 1
    let likeCount = 0
    medias.forEach((media) => {
        const mediaModel = mediaFactory(media, photographer);
        const mediaCardDOM = mediaModel.getMediaCardDOM(current);
        const mediaSlide = mediaModel.getMediaForSlide();
        mediasSection.appendChild(mediaCardDOM);
        mediasLightBox.appendChild(mediaSlide);
        ++current;
        likeCount = likeCount + media.likes;
    });

    const p_likeCount = document.createElement('p');
    p_likeCount.classList.add('total-like')
    p_likeCount.textContent = likeCount + " ❤";
    photographerPageCard.div_likeAndPrice.appendChild(p_likeCount);
    bodyPageDOM.appendChild(photographerPageCard.div_likeAndPrice);
};

function likeMedia(element, id) {
    const totalLikes = document.querySelector('.total-like');
    if (!element.classList.contains("liked")) {
        element.classList.add("liked");
        element.innerHTML = (parseInt(element.innerText.match(/\d+/)[0]) +1) + " ❤";
        totalLikes.innerHTML = (parseInt(totalLikes.innerText.match(/\d+/)[0]) +1) + " ❤";
    } else {
        element.classList.remove("liked");
        element.innerHTML = (parseInt(element.innerText.match(/\d+/)[0]) -1) + " ❤";
        totalLikes.innerHTML = (parseInt(totalLikes.innerText.match(/\d+/)[0]) -1) + " ❤";
    };

    // Here we can add function for update likes in db
};

// Sort array by Popularity Date Likes
function sortMedias(medias_list, type) {
    if(type == "date") {
        return (medias_list.sort(function(a, b){
            return new Date(b.date) - new Date(a.date);
          }));
    } else if(type == "title") {
        return (medias_list.sort(function (a, b) {
            if (a.title < b.title) {
              return -1;
            }
            if (a.title > b.title) {
              return 1;
            }
            return 0;
          }));
    } else if (type == "popularity") {
        return (medias_list.sort(function (a, b) {
            if (a.likes < b.likes) {
              return 1;
            }
            if (a.likes > b.likes) {
              return -1;
            }
            return 0;
          }));
    }
}

// Update medias in page
function updateDisplayMedias(medias, photographer) {
    const mediasSection = document.querySelector(".medias-section");
    mediasSection.innerHTML = "";

    const mediasLightBox = document.querySelector("#lightbox-content");
    mediasLightBox.innerHTML = "";


    let current = 1
    medias.forEach((media) => {
        const mediaModel = mediaFactory(media, photographer);
        const mediaCardDOM = mediaModel.getMediaCardDOM(current);
        const mediaSlide = mediaModel.getMediaForSlide();
        mediasSection.appendChild(mediaCardDOM);
        mediasLightBox.appendChild(mediaSlide);
        ++current;
    });

}

// Keyboard controls for open media in focus with enter or space
document.addEventListener('keydown', event => {
    if (event.code === "Space" || event.key === "Enter") {
        event.target.click()
    }
})


async function init() {

    let params_url = (new URL(document.location)).searchParams;

    // Get photographer datas
    const photographer = await getPhotographer(params_url.get('id'));

    // Get medias by photographer id
    const medias = await getMedias(params_url.get('id'));

    // Display medias sorted
    await displayData(photographer, sortMedias(medias, "date"));
    showSlides(1)

    // EventListner for sort button
    const dropButton = document.querySelector(".dropbtn-text");

    const sortButtonDate = document.querySelector("#date");
    sortButtonDate.addEventListener("click", function(event){
        updateDisplayMedias(sortMedias(medias, "date"), photographer);
        sortButtonDate.classList.add("hidden-sortbutton");
        sortButtonTitle.classList.remove("hidden-sortbutton");
        sortButtonPopularity.classList.remove("hidden-sortbutton");
        dropButton.innerHTML = "Date";
        event.preventDefault();
    });
    const sortButtonTitle = document.querySelector("#title");
    sortButtonTitle.addEventListener("click", function(event){
        updateDisplayMedias(sortMedias(medias, "title"), photographer);
        sortButtonTitle.classList.add("hidden-sortbutton");
        sortButtonDate.classList.remove("hidden-sortbutton");
        sortButtonPopularity.classList.remove("hidden-sortbutton");
        dropButton.innerHTML = "Titre";
        event.preventDefault();
    });
    const sortButtonPopularity = document.querySelector("#popularity");
    sortButtonPopularity.addEventListener("click", function(event){
        updateDisplayMedias(sortMedias(medias, "popularity"), photographer);
        sortButtonPopularity.classList.add("hidden-sortbutton");
        sortButtonDate.classList.remove("hidden-sortbutton");
        sortButtonTitle.classList.remove("hidden-sortbutton");
        dropButton.innerHTML = "Popularité";
        event.preventDefault();
    });

};

init();
