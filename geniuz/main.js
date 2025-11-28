let order = [];//Ordem da sequencia de cores
let clickedOrder = [];//Ordem clicada pelo jogador
let score = 0;//Pontuação do jogador
let level = document.querySelector('#level');//Level do jogador
let maxLevel = document.querySelector('#max-level');//Maior level alcançado


//Variável para controlar o turno do jogador 
let playerPlays = false;

//Instanciando os blocos de cores cores
const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');

//Instanciando os sons das cores
const soundGreen = new Audio('sfx/snd_0.wav');
const soundRed = new Audio('sfx/snd_1.wav');
const soundYellow = new Audio('sfx/snd_2.wav');
const soundBlue = new Audio('sfx/snd_3.wav');
//Criando um array para mapear os sons
const sounds = [soundGreen, soundRed, soundYellow, soundBlue];

//Mapeando as cores em um array para associar os números
const colors = [green, red, yellow, blue];

//Instanciando o botão de start
const startBtn = document.querySelector('#start-btn');

function loadMaxLevel(){
    const savedMaxLevel = localStorage.getItem('maxLevel') || 0;
    maxLevel.textContent = savedMaxLevel;
}

function startGame(){
    score = 0;//Zera a pontuação
    order = [];//Zera a ordem
    clickedOrder = [];//Zera a ordem do jogador
    playerPlays = false;//Desabilita o turno do jogador
    startBtn.style.display = 'none';//Esconde o botão de start
    nextLevel();//Inicia o jogo
}

function playSequence(){
    let delay = 0;//Variável para controlar o intevalo entre o brilho das cores
    for(let i in order){
        setTimeout(() => {
            colorBright(order[i]);
        }, delay);
        delay += 600;//Incrementa o delay para a próxima cor
    }
}

function colorSort(){
    let randomColor = Math.floor(Math.random() * 4);
    order.push(randomColor);//Adiciona a cor sorteada na ordem
}

function colorBright(colorIndex){
    let chosenColor = colors[colorIndex];//Pega a cor sorteada
    chosenColor.classList.add('active');//Adiciona o efeito de brilho
    sounds[colorIndex].play(); // Toca o som da cor correspondente
    setTimeout(() => {
        chosenColor.classList.remove('active');//Remove o efeito de brilho após 500ms
}, 500);
}

function nextLevel(){
    score++;
    level.textContent = score;//Atualiza o level do jogador
    colorSort();
    playSequence();
    clickedOrder = [];//Zera a ordem clicada pelo jogador
    playerPlays = true;//Habilita o turno do jogador após a sequência ser exibida
}

function playerClickEffect(colorIndex) {
    const clickedColor = colors[colorIndex];
    clickedColor.classList.add('pressed'); // Adiciona a classe para o efeito visual
    sounds[colorIndex].play(); // Toca o som da cor correspondente
    setTimeout(() => {
        clickedColor.classList.remove('pressed'); // Remove a classe após um curto período
    }, 200);
}

function checkOrder(){
    for(let i in clickedOrder){
        if(clickedOrder[i] != order[i]){
            gameOver();
            return;
        }
    }
    if(clickedOrder.length == order.length){
        playerPlays = false;//Desabilita o turno do jogador
        setTimeout(() => {
            nextLevel();//Chamando a função do próximo nível para continuar o jogo
        }, 1000);
    }
}

function gameOver(){
    startBtn.style.display = 'block';//Mostra o botão de start
    playerPlays = false;//Desabilita o turno do jogador
    alert(`Game Over! Sua pontuação foi: ${score}\nClique em OK para iniciar um novo jogo.`);
    const savedMaxLevel = parseInt(localStorage.getItem('maxLevel')) || 0;
    if(score > savedMaxLevel){
        localStorage.setItem('maxLevel', score);
        maxLevel.textContent = score;
    }

}

//Evento de clique no start para iniciar o jogo
startBtn.addEventListener('click', startGame);

//Evento de clique nas cores
colors.forEach((color, index) => {
    color.addEventListener('click', () => {
        if(!playerPlays) return;//Se não for o turno do jogador, ignora o clique
        clickedOrder.push(index);//Adiciona a cor clicada na ordem do jogador
        playerClickEffect(index);//Adiciona o efeito de clique na cor clicada
        checkOrder();//Verifica a ordem clicada pelo jogador
    });
});



loadMaxLevel();