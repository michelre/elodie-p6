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

const countTotalLike = (medias) => {
    const total = medias.reduce((acc, curr) => acc + curr.likes, 0);
    const totalLikesNumber = document.querySelector('.totalLikes-number');
    totalLikesNumber.innerText = total;
}