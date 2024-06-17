
 //Mettre le code JavaScript lié à la page photographer.htmlconst parsedUrl = new URL(window.location.href);

 const parsedUrl = new URL(window.location.href);
 const id = parseInt(parsedUrl.searchParams.get("id"));
 
 console.log(id);
 
 
 // Fonction pour récupérer les médias associés au photographe
 const fetchMedia = async () => {
     const response = await fetch('../data/photographers.json')
     const data = await response.json()
 
     return data.media.filter(media => media.photographerId === id)    
 }
 
 
 
 // Fonction pour récupérer les données d'un photographe à partir de son identifiant
 const fetchPhotograph = async () => {
     const response = await fetch('../data/photographers.json');
     const data = await response.json();
     const photographer = data.photographers.find(photographer => photographer.id === id);
    
     console.log(photographer);
     return photographer;
 }
 
 
 // Fonction pour afficher les données d'un photographe
 const displayProfil = (photographer) => {
     const photographer_section = document.querySelector(".photograph-header");
     
     const picture = `assets/photographers/${photographer.portrait}`;
     const divPhotographer = document.createElement("div");
     divPhotographer.classList.add("photographer-content");
     
     // Ajouter le nom du photographe dans un H1
     const h1 = document.createElement("h1");
     h1.textContent = photographer.name;
     photographer_section.appendChild(h1);
 
     // Ajouter la localisation (ville, pays) dans un H4
     const locationElement = document.createElement("h4");
     locationElement.textContent = `${photographer.city}, ${photographer.country}`;
     photographer_section.appendChild(locationElement);
 
     // Ajouter le slogan du photographe dans un paragraphe
     const taglineElement = document.createElement("p");
     taglineElement.textContent = photographer.tagline;
     photographer_section.appendChild(taglineElement);
    
     //creer une div pour mettre l'image a l'interieur
     const divPicturePhotographer = document.createElement("div");
     divPicturePhotographer.classList.add("photographer-picture");

     // Ajouter l'image du photographe
     const img = document.createElement( 'img' );
     img.setAttribute("src", picture)
     divPicturePhotographer.appendChild(img);
     photographer_section.appendChild(divPicturePhotographer);
     photographer_section.appendChild(divPhotographer);
 
     divPhotographer.appendChild(h1);
     divPhotographer.appendChild(locationElement);
     divPhotographer.appendChild(taglineElement);
//afficher le prix du photographe dans la div
     const price = document.querySelector('.price');
     price.innerText = `${photographer.price}€/jour`;
 }

 
// Fonction pour afficher les médias du photographe
const displayGallery = (medias) => {
    const gallery = document.querySelector('.gallery');
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
        iconHeart.className = 'fa-solid fa-heart';
        iconHeart.setAttribute('data-index', index);
        divLikes.appendChild(iconHeart);

    });

 // fonction mettre a jour le total des likes
        const updateTotalLikes = () => {
            const likes = document.querySelectorAll('.likes-number');
            let totalLikes = 0;
            likes.forEach((like) => {
                totalLikes += parseInt(like.innerText, 10);
            });
            const totalLikesNumber = document.querySelector('.totalLikes-number');
            totalLikesNumber.innerText =totalLikes;
        };
    
        // Initialiser le compteur total des likes
        updateTotalLikes();

    // Fonction pour augmenter le nombre de likes au clic sur l'icon heart
    const likes = document.querySelectorAll('.fa-solid.fa-heart');
    likes.forEach((like) => {
        like.addEventListener('click', () => {
            //Selectionne l'élément précédent le like donc span
            const spanLike = like.previousElementSibling;
            //recupere le nombre de likes  texte et le convertie en nombre
            let actualLikes = parseInt(spanLike.innerText, 10); 
            //si il a la class liked ai clic on decremente et on eleve la class liked
            if (like.classList.contains('liked')) {
                actualLikes -= 1;
                like.classList.remove('liked');
                //sinon on incremente et on lui ajoute la class liked
            } else {
                actualLikes += 1;
                like.classList.add('liked');
            }
            //Met a jour le nombre de likes
            spanLike.innerText = actualLikes;

            updateTotalLikes();
        });
    });
};


 // Initialiser les données et afficher le profil 
 const init = async () => {
     const photographer = await fetchPhotograph();
     displayProfil(photographer);
    
     const medias = await fetchMedia()
     displayGallery(medias)
 }

 init();
