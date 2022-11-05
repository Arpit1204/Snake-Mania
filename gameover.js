const playAgain = document.getElementById('play-again-button')
const scoreBoard = document.getElementById('score-board')
playAgain.onclick =()=>{
    window.location.href = './game.html';
}

scoreBoard.innerHTML = localStorage.getItem('score')
