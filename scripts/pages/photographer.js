
 //Mettre le code JavaScript lié à la page photographer.htmlconst parsedUrl = new URL(window.location.href);

 const parsedUrl = new URL(window.location.href);
 const id = parseInt(parsedUrl.searchParams.get("id"));
 const lightbox = new Lightbox()
 
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

 const sortMedias = (medias, sortValue) => {
    let newMedias = medias
    if(sortValue === 'popularity'){
        newMedias = medias.sort((m1, m2) => m2.likes - m1.likes)                        
    }
    if(sortValue === 'date'){
        newMedias = medias.sort((m1, m2) => {
            if(m1.date < m2.date){
                return -1
            }
            if(m1.date < m2.date){
                return 1
            }
            return 0
        })                        
    }
    if(sortValue === 'title'){
        newMedias = medias.sort((m1, m2) => {
            if(m1.title < m2.title){
                return -1
            }
            if(m1.title < m2.title){
                return 1
            }
            return 0
        })
    }
    displayGallery(newMedias, (index) => {
        lightbox.open(index)
    })
    lightbox.display(newMedias)
 }


const initSortEvent = (medias) => {
    const select = document.querySelector('.sort')
    select.addEventListener('change', (e) => {
        sortMedias(medias, e.target.value)
    })
}

 


 // Initialiser les données et afficher le profil 
 const init = async () => {
     const photographer = await fetchPhotograph();
     displayProfil(photographer);
    
     const medias = await fetchMedia()
     //displayGallery(medias)

     countTotalLike(medias)

     initSortEvent(medias)
     sortMedias(medias, 'popularity');
 }

 init();
