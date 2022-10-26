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

    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);

    photographModalName.innerHTML = photographer.name;

    // Creation des medias
    medias.forEach((media) => {
        const mediaModel = mediaFactory(media, photographer);
        const mediaCardDOM = mediaModel.getMediaCardDOM();
        mediasSection.appendChild(mediaCardDOM);
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


async function init() {

    let params_url = (new URL(document.location)).searchParams;

    // Récupère les datas du photographe
    const photographer = await getPhotographer(params_url.get('id'));

    // Récupère les datas du photographe
    const medias = await getMedias(params_url.get('id'));

    displayData(photographer, medias);

};

init();
