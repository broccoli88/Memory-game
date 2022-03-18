const cards = document.querySelectorAll(".card");
const startButton = document.querySelector(".start");
const number = document.querySelector(".number");
const resetButton = document.querySelector(".reset");
let firstCard, secondCard;
let isFlipped = false;
let lockBoard = false;
let gameStarted = false;
let matchingPairs = 0;

function flipCard() {
  if (!gameStarted) return;
  if (lockBoard) return;
  if (firstCard === this) return;
  this.classList.add("flip");

  if (!isFlipped) {
    firstCard = this;
    isFlipped = true;
  } else {
    isFlipped = false;
    secondCard = this;

    lockBoard = true;

    if (firstCard.dataset.animal === secondCard.dataset.animal) {
      disableCards();
    } else {
      unflipCards();
    }
  }
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
  matchingPairs++;
  number.textContent = matchingPairs;
  return;
}

function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 1500);
}

function resetBoard() {
  [lockBoard, isFlipped] = [false, false];
  [secondCard, firstCard] = [null, null];
}

function shuffleDeck() {
  cards.forEach((card) => {
    let randomCards = Math.floor(Math.random() * 16);
    card.style.order = randomCards;
  });
}

cards.forEach((card) => {
  card.addEventListener("click", flipCard);
});

function resetGame() {
  {
    cards.forEach((card) => {
      card.classList.remove("flip");
    });
    matchingPairs = 0;
    number.textContent = matchingPairs;

    gameStarted = false;
  }
}

startButton.addEventListener("click", () => {
  gameStarted = true;
  shuffleDeck();
});

resetButton.addEventListener("click", resetGame);
