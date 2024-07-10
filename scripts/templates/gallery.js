const displayGallery = (medias, lightboxOpen) => {
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = ''
    medias.forEach((media, index) => {
        const m = document.createElement('li');
        const mediaLink = document.createElement('a')
        mediaLink.href = '#'

        m.appendChild(mediaLink)
        
        const mediaFactory = new Media(media);
        const mediaHtml = mediaFactory.getHtml()
        mediaLink.appendChild(mediaHtml);
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
        const iconButton = document.createElement('button')
        iconButton.setAttribute('aria-label', 'Like de la photo')
        iconButton.appendChild(iconHeart)
        iconHeart.className = 'fa-regular fa-heart';
        iconHeart.setAttribute('data-index', index);
        divLikes.appendChild(iconButton);


        iconButton.addEventListener('click', () => {            
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

        mediaLink.addEventListener('click', () => {
            lightboxOpen(index)
        })
    });

};