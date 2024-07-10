/*exported displayModal,closeModal,sendContactForm*/

const modal = document.getElementById("contact_modal");
const form = document.querySelector('.contact-form')

function displayModal() {
    modal.style.display = "block";
    form.firstName.focus()
}

function closeModal() {
    const closeModalButton = document.querySelector('.close-modal')
    closeModalButton.addEventListener('click', () => {
        modal.style.display = "none";
    })    

    document.addEventListener('keydown', (e) => {
        if(e.key === 'Escape'){
            modal.style.display = "none";
        }
    })
}
function sendContactForm(){
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        const firstname = e.target.firstName.value
        const lastname = e.target.lastName.value
        const email = e.target.email.value
        const message = e.target.message.value
        console.table({'Prénom': firstname, 'Nom': lastname, 'Email': email, 'Message': message})
    })
}
