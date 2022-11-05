const win_reset = document.getElementById('win-reset')


win_reset.onclick=()=>{
    window.location.href = 'index.html'
}

text = Math.floor(Math.random()*5)

switch(text){
    case 0 : texxt = "Huree!You won the game.";break;
    case 1:  texxt = "You are a champian!";break;
    case 2: texxt = "You won!Snake survived";break;
    case 3: texxt = "Cheers!";break;
    case 4: texxt = "JODDDDDDDDDD";break;
}
const win_text = document.getElementById('win-text')
win_text.innerHTML = texxt;
