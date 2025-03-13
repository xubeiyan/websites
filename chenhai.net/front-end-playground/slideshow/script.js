const dots = document.querySelectorAll(".dot");
const prevImgBtn = document.querySelector('.btn-left');
const nextImgBtn = document.querySelector('.btn-right');
const imgContainer = document.querySelector('.img-area');
const imgList = ['img/1.jpg','img/2.jpg','img/3.jpg','img/4.jpg','img/5.jpg','img/6.jpg'];
let imgIndex = 0;
let imgToggleInterval;

const prevImg = (e) => {
    dots[imgIndex].classList.remove('hightlight');
    imgIndex = (imgIndex + imgList.length - 1) % imgList.length;
    dots[imgIndex].classList.add('hightlight');
    imgContainer.style.backgroundImage = `url(${imgList[imgIndex]})`;
    resetTimer();
}

const nextImg = (e) => {
    dots[imgIndex].classList.remove('hightlight');
    imgIndex = (imgIndex + 1) % imgList.length;
    dots[imgIndex].classList.add('hightlight');
    imgContainer.style.backgroundImage = `url(${imgList[imgIndex]})`;
    resetTimer();
}

const resetTimer = () => {
    clearInterval(imgToggleInterval);
    imgToggleInterval = setInterval(nextImg, 5000);
}

prevImgBtn.addEventListener('click', prevImg);
nextImgBtn.addEventListener('click', nextImg);

dots.forEach((dot) => {
    dot.addEventListener('click', (e) => {
        
        e.target.classList.toggle('hightlight');
    });
});

dots[0].classList.add('hightlight');
resetTimer();