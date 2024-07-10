    /*global photographerTemplate*/

    async function getPhotographers() {
        const response = await fetch('data/photographers.json')
        const data = await response.json()
        return ({photographers: data.photographers})
    }

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerTemplate(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();

    
            //element link
            const linkElement = document.createElement("a");
            linkElement.setAttribute("href", `photographer.html?id=${photographer.id}`);
            linkElement.appendChild(userCardDOM);


            //element location 
            const locationInfo = document.createElement("div");
            locationInfo.classList.add("location_info");

            const locationElement = document.createElement("h4");
            locationElement.textContent = `${photographer.city}, ${photographer.country}`;

            locationInfo.appendChild(locationElement);
            userCardDOM.appendChild(locationInfo);

            //element tagline
            const taglineInfo = document.createElement("div");
            taglineInfo.classList.add("tagline_info");

            const taglineElement = document.createElement("p");
            taglineElement.textContent = photographer.tagline;

            taglineInfo.appendChild(taglineElement);
            userCardDOM.appendChild(taglineInfo);

            //element price
            const priceInfo = document.createElement("div");
            priceInfo.classList.add("price_info");

            const priceElement = document.createElement("p");
            priceElement.textContent = photographer.price + "€/jour";

            priceInfo.appendChild(priceElement);
            userCardDOM.appendChild(priceInfo);

           
            
            photographersSection.appendChild(linkElement);
        });
    }

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);
    }
    
    init();
    
