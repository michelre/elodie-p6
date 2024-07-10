/*exported updateTotalLikes,countTotalLike*/

/**
 * Permet une mise à jour du compteur de like 
 * */

const updateTotalLikes = () => {
    const likes = document.querySelectorAll('.likes-number');
    let totalLikes = 0;
    likes.forEach((like) => {
        totalLikes += parseInt(like.innerText, 10);
    });
    const totalLikesNumber = document.querySelector('.totalLikes-number');
    totalLikesNumber.innerText =totalLikes;
};

/**
 * Permet de compte le nombre de likes
 * @param media {array} Liste des médias
 * @returns int
 * */

const countTotalLike = (medias) => {
    const total = medias.reduce((acc, curr) => acc + curr.likes, 0); 
    const totalLikesNumber = document.querySelector('.totalLikes-number');
    totalLikesNumber.innerText = total;
    return total
}