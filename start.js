const playButton = document.getElementById("play-button")
const overlay4 = document.getElementById('overlay4')
let username = document.getElementById('username')

playButton.onclick = play;

function play(){
    console.log('abc')
    overlay4.style.display = 'flex'
}

document.getElementById('play-game').onclick=()=>{
    window.location.href = "./game.html";
    localStorage.setItem('Name',username.value)
}

localStorage.setItem('Name',username.value)