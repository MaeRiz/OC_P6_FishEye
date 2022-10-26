function mediaFactory(data_media, data_photographer) {
    const { title, image, likes, date, video, id} = data_media;

    let picture = null

    function getMediaCardDOM() {

        const article = document.createElement( 'article' );

        if (image == undefined) {
            picture = `assets/images/${data_photographer.name}/${video}`;
            const video_media = document.createElement( 'video' );
            video_media.setAttribute('controls', 'controls');
            video_media.setAttribute('autoplay', false);
            const source = document.createElement( 'source' );
            source.setAttribute("src", picture);
            source.setAttribute("type", "video/mp4");
            video_media.appendChild(source);
            article.appendChild(video_media);
        } else {
            picture = `assets/images/${data_photographer.name}/${image}`;
            const img = document.createElement( 'img' );
            img.setAttribute("src", picture);
            img.setAttribute("alt", title);
            article.appendChild(img);
        }

        const div_desc = document.createElement( 'div' );
        div_desc.classList.add("desc");

        const p_title = document.createElement( 'p' );
        p_title.textContent = title;
        p_title.classList.add("title");
        div_desc.appendChild(p_title);

        const p_likes = document.createElement( 'p' );
        p_likes.textContent = likes + " ❤";
        p_likes.classList.add("likes");
        p_likes.setAttribute("onclick", `likeMedia(this, ${id})`);
        div_desc.appendChild(p_likes);

        article.appendChild(div_desc);

        return (article);
    }
    return { title, image, likes, date, getMediaCardDOM }
}