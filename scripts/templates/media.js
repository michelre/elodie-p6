/*exported Media*/

class Media {

    constructor(media, options){
        this.options = options
        if(media.video){
            this.media = new MediaVideo(media, options)
        } else {
            this.media = new MediaImage(media, options)
        }
    }


    getHtml(){
        return this.media.getHtml()
    }

}

class MediaImage {

    constructor(media, options){
        this.media = media
        this.options = options
    }

    getHtml(){
        const img = document.createElement('img')
        img.setAttribute('alt', this.media.title)
        //img.setAttribute('src', `assets/media/${this.media.photographerId}/${this.media.image}`)
        return img
    }
}

class MediaVideo {

    constructor(media, options){
        this.media = media
        this.options = options
    }

    getHtml(){
        const video = document.createElement('video')
        if(this.options.controls){
            video.setAttribute('controls', true)
        }
        const source = document.createElement('source')
        source.setAttribute('src', `assets/media/${this.media.photographerId}/${this.media.video}`)
        video.appendChild(source)     
        return video
    }
}