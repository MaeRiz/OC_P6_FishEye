function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price, id} = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {

        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt", name)

        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        const p_location = document.createElement( 'p' );
        p_location.textContent = `${city},  ${country}`;
        p_location.classList.add("location");

        const p_tagline = document.createElement( 'p' );
        p_tagline.textContent = tagline;
        p_tagline.classList.add("tagline");

        const p_price = document.createElement( 'p' );
        p_price.textContent = price + '€ /jours';
        p_price.classList.add("price");

        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(p_location);
        article.appendChild(p_tagline);
        article.appendChild(p_price);

        return (article);
    }
    return { name, picture, id, getUserCardDOM }
}