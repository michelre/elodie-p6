/*global Media */
/*exported Lightbox*/

class Lightbox {

    constructor() {
        this.lightbox = document.querySelector('.lightbox')
        this.lightboxGallery = document.querySelector('.lightbox-gallery')
        this.closeButton = document.querySelector('.close')
        this.nextButton = document.querySelector('#next-icon')
        this.previousButton = document.querySelector('#prev-icon')
        this.index = 0
        this.initEvents()
    }

    initEvents(){
        this.closeButton.addEventListener('click', () => {
            this.close()

        })

        this.nextButton.addEventListener('click', () => {
            this.next()
        })

        this.previousButton.addEventListener('click', () => {
            this.previous()
        })

        window.addEventListener('keydown', (e) => {
            if(e.key === 'Escape'){
                this.close()
            }
            if(e.key === 'ArrowRight'){
                this.next()
            }
            if(e.key === 'ArrowLeft'){
                this.previous()
            }
        })
    }

    open(index) {
        this.index = index
        this.lightbox.classList.add('open')
        this.changeSlide()
        this.closeButton.focus()
    }

    close() {        
        this.lightbox.classList.remove('open')
    }

    next() {
        const nbSlides = document.querySelectorAll('.slide').length
        if(this.index === nbSlides - 1){
            this.index = 0;
        } else {
            this.index += 1
        }    
        this.changeSlide()
    }

    previous() {
        const nbSlides = document.querySelectorAll('.slide').length
        if(this.index === 0){
            this.index = nbSlides - 1
        } else {
            this.index -= 1
        }        
        this.changeSlide()
    }

    changeSlide(){
        const slide = document.querySelector('.slide')
        const slideWidth = slide.getBoundingClientRect().width
        this.lightboxGallery.style.transform = `translateX(-${this.index * slideWidth}px)`
    }

    display(medias) {
        const lightboxGallery = document.querySelector('.lightbox-gallery');
        lightboxGallery.innerHTML = ''
        medias.forEach((media) => {
            const m = document.createElement('li');
            m.classList.add('slide')

            const mediaFactory = new Media(media, {controls: true});
            m.appendChild(mediaFactory.getHtml());
            lightboxGallery.appendChild(m);

            // Création de la div sous la galerie
            const divContent = document.createElement('div');
            divContent.classList.add('gallery-content');
            m.appendChild(divContent);

            // Titre de la photo
            const title = document.createElement('h2');
            title.classList.add('gallery-title');
            title.innerText = media.title;
            divContent.appendChild(title);

            return m;
        });
    }



}