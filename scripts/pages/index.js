async function getPhotographers() {
    // Penser à remplacer par les données récupérées dans le json

    const response = await fetch('../../data/photographers.json');
    const data = await response.json();

    return ({ photographers: data.photographers});
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {

        const link = document.createElement( 'a' );
        link.setAttribute("href", "/photographer.html?id=" + photographer.id);
        link.setAttribute("tabindex", "-1");

        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        link.appendChild(userCardDOM);
        photographersSection.appendChild(link);
    });
};

    // Keyboard controls for open photographer page in focus with enter or space
document.addEventListener('keydown', event => {
    if (event.code === "Space" || event.key === "Enter") {
        event.target.click();
        event.preventDefault();
    }
})

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
};

init();
