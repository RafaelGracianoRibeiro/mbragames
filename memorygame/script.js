const gameContainer = document.querySelector('.game-container');//Instanciando o caontainer do jogo
const cardValues = ['1', '1', '2', '2', '3', '3', '4', '4', '5', '5', '6', '6', '7', '7', '8', '8'];//Array para armazenar os valores dos cards

let flippedCards = [];//Array para armazenar os cards virados, maximo de 2 itens
let matchedCards = [];//Array para armazenar os cards que já foram combinados

const winModal = document.getElementById('win-modal');
const playAgainBtn = document.getElementById('play-again');

playAgainBtn.addEventListener('click', resetGame);

//Função para embaralhar o array dos cards, usando o algoritmo de Fisher-Yates
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

//Função construtora da mesa de jogo
function createBoard() {
    const shuffledCards = shuffle(cardValues);//Instanciando e embaralhando os cards
    shuffledCards.forEach(value => {//Construindo os elementos de cards com base no array embaralhado
        const card = document.createElement('div')//Criando o elemento div para o card
        card.classList.add('card');//Adicionando a classe card ao elemento
        card.dataset.value = value;//Adicionandoo valor do card ao data attribute

        //Criando as faces do card
        const cardFront = document.createElement('div');
        cardFront.classList.add('card-front');

        const cardBack = document.createElement('div');
        cardBack.classList.add('card-back');
        cardBack.style.backgroundImage = `url('images/${value}.png.jpeg')`;

        //Anexando as faces ao card
        card.appendChild(cardFront);
        card.appendChild(cardBack);

        //Adicionando o evento de clique ao card
        card.addEventListener('click', handleCardClick);
        gameContainer.appendChild(card);
    });
}

//Função para lidar com o clique no card
function handleCardClick(event) {
    const clickedCard = event.currentTarget;//Obtendo o exato card clicado

    //Verificando se menos de 2 cards estão virados e se o card clicado não está virado ou já combinado
    if (flippedCards.length < 2 && !clickedCard.classList.contains('flipped') && !matchedCards.includes(clickedCard)) {
        clickedCard.classList.add('flipped');
        flippedCards.push(clickedCard);

        if (flippedCards.length === 2) {
            checkForMatch();
        }
    }
}

//Função de verificação de pares 
function checkForMatch() {
    const [card1, card2] = flippedCards;//Desestruturando os cards virados

    //Se os valores data dos cards forem iguais, mandar para o array de pares
    if (card1.dataset.value === card2.dataset.value) {
        matchedCards.push(card1, card2);
        flippedCards = [];
        if (matchedCards.length === cardValues.length) {//Se todos os cards foram combinados, o jogador vence
            setTimeout(() => winModal.style.display = 'flex', 500);
        }
    } else {//Se não, os cards desviram
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

//Função para reiniciar o jogo
function resetGame() {
    winModal.style.display = 'none';
    flippedCards = [];
    matchedCards = [];
    gameContainer.innerHTML = '';
    createBoard();
}

//Chamando função construtora do tabuleiro
createBoard();
