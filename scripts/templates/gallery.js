const displayGallery = (medias) => {
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = ''
    medias.forEach((media, index) => {
        const m = document.createElement('li');
        
        const mediaFactory = new Media(media);
        m.appendChild(mediaFactory.getHtml());
        gallery.appendChild(m);
        
        // Création de la div sous la galerie
        const divContent = document.createElement('div');
        divContent.classList.add('gallery-content');
        m.appendChild(divContent);

        // Titre de la photo
        const title = document.createElement('h2');
        title.classList.add('gallery-title');
        title.innerText = media.title;
        divContent.appendChild(title);

        // Div compteur de like
        const divLikes = document.createElement('div');
        divLikes.classList.add('likes');
        divContent.appendChild(divLikes);

        // Span pour le nombre de likes
        const spanLike = document.createElement('span');
        spanLike.classList.add('likes-number');
        spanLike.innerText = media.likes;
        divLikes.appendChild(spanLike);

        // Icon de like
        const iconHeart = document.createElement('i');
        iconHeart.className = 'fa-regular fa-heart';
        iconHeart.setAttribute('data-index', index);
        divLikes.appendChild(iconHeart);


        iconHeart.addEventListener('click', () => {            
            //si il a la class liked ai clic on decremente et on eleve la class liked
            if (iconHeart.classList.contains('liked')) {
                media.likes -= 1;
                iconHeart.classList.replace('fa-solid', 'fa-regular')
                //sinon on incremente et on lui ajoute la class liked
            } else {
                media.likes += 1;
                iconHeart.classList.replace('fa-regular', 'fa-solid')
            }
            iconHeart.classList.toggle('liked')
            //Met a jour le nombre de likes
            spanLike.innerText = media.likes;
            //updateTotalLikes();
            countTotalLike(medias)
        })
    });

};