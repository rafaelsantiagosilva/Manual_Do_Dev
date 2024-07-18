const mario = document.querySelector('img.mario');
const pipe = document.querySelector('img.pipe');

const jump = () =>{
    mario.classList.add('jump');
    setTimeout(() => {
        mario.classList.remove('jump');
    }, 700);
}

const loop = setInterval(() =>{
    const pipePosition = pipe.offsetLeft;
    const marioPosition = + window.getComputedStyle(mario).bottom.replace('px', '');

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80){
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;


        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}`;

        mario.src = './images/game-over.png';
        mario.style.width = '75px';
        mario.style.margin = '70px';

        clearInterval(loop);
    }

}, 10);

document.addEventListener('keydown', jump);
