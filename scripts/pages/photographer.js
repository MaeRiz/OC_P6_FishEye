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

    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);

    photographModalName.innerHTML = photographer.name;

    // Creation des medias
    let current = 1
    medias.forEach((media) => {
        const mediaModel = mediaFactory(media, photographer);
        const mediaCardDOM = mediaModel.getMediaCardDOM(current);
        const mediaSlide = mediaModel.getMediaForSlide();
        mediasSection.appendChild(mediaCardDOM);
        mediasLightBox.appendChild(mediaSlide);
        ++current
    });
};

function likeMedia(element, id) {
    if (!element.classList.contains("liked")) {
        element.classList.add("liked");
        element.innerHTML = (parseInt(element.innerText.match(/\d+/)[0]) +1) + " ❤";
    } else {
        element.classList.remove("liked");
        element.innerHTML = (parseInt(element.innerText.match(/\d+/)[0]) -1) + " ❤";
    };

    // Add function for update likes with id param
};

function sortMedias(medias_list, type) {
    console.log(type)
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



async function init() {

    let params_url = (new URL(document.location)).searchParams;

    // Récupère les datas du photographe
    const photographer = await getPhotographer(params_url.get('id'));

    // Récupère les datas du photographe
    const medias = await getMedias(params_url.get('id'));


    await displayData(photographer, sortMedias(medias, "date"));
    showSlides(1)

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
