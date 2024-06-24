class Media {

    constructor(media){
        if(media.video){
            this.media = new MediaVideo(media)
        } else {
            this.media = new MediaImage(media)
        }
    }


    getHtml(){
        return this.media.getHtml()
    }

}

class MediaImage {

    constructor(media){
        this.media = media
    }

    getHtml(){
        const img = document.createElement('img')
        img.setAttribute('alt', this.media.title)
        //img.setAttribute('src', `assets/media/${this.media.photographerId}/${this.media.image}`)
        return img
    }
}

class MediaVideo {

    constructor(media){
        this.media = media
    }

    getHtml(){
        const video = document.createElement('video')
        const source = document.createElement('source')
        //source.setAttribute('src', `assets/media/${this.media.photographerId}/${this.media.video}`)
        video.appendChild(source)     
        return video
    }
}