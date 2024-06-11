
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
 }
 
 
 // Fonction pour afficher les médias du photographe
 const displayGallery = (medias) => {
     const gallery = document.querySelector('.gallery')
     medias.forEach((media) => {
         const m = document.createElement('li')
         //m.innerText = media.title
         const mediaFactory = new Media(media)
         m.appendChild(mediaFactory.getHtml())
         gallery.appendChild(m)
     })
 }
 
 
 // Initialiser les données et afficher le profil 
 const init = async () => {
     const photographer = await fetchPhotograph();
     displayProfil(photographer);
 
     const medias = await fetchMedia()
     displayGallery(medias)
 }
 
 init();
