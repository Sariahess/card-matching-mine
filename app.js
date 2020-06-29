const symbolsArr = [
  `<i class="fas fa-atom"></i>`, 
  `<i class="fas fa-frog"></i>`, 
  `<i class="fas fa-feather-alt"></i>`, 
  `<i class="fas fa-cogs"></i>`, 
  `<i class="fas fa-anchor"></i>`, 
  `<i class="fas fa-fan"></i>`, 
  `<i class="fas fa-bolt"></i>`, 
  `<i class="fas fa-hat-wizard"></i>`, 
  `<i class="fas fa-apple-alt"></i>`, 
  `<i class="fas fa-bell"></i>`, 
  `<i class="fas fa-bomb"></i>`, 
  `<i class="fas fa-brain"></i>`, 
];
const symbolsObj = Object.assign({}, symbolsArr);
const board = document.querySelector(`#cards`);
const cards = board.children;
const nextCard = document.querySelector(`#next-card`);
const restartButton = document.querySelector(`.restart`);
const score = document.querySelector(`#score`);
let tempScore;
let counter;
let openCounter;
let openCard = false;
let checkArray = [];

let shuffle = function(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function shuffleCards() {
  let shuffledSymbols = shuffle(symbolsArr);

  for (let i = 0; i < cards.length; i++) {
    cards[i].innerHTML = shuffledSymbols[i];
  }
}

function refreshNextCard() {
  // reset the counter to 0 upon hitting the last card
  // hence the -1 from symbolsArr.length
  if (counter < symbolsArr.length - 1) {
    counter++;
    nextCard.innerHTML = symbolsObj[counter];
  } else {
    counter = 0;
    nextCard.innerHTML = symbolsObj[0];
  }
}

function initialize() {
  nextCard.innerHTML = symbolsObj[0];
  shuffleCards();
  tempScore = 0;
  counter = 0;
  openCounter = 0;
  score.innerHTML = openCounter;
  openCard = false;
  checkArray = [];
}

const checkIncludes = function(elem, str) {
  if (elem.getAttribute(`class`).includes(str)) {
    return true;
  } else {
    return false;
  }
}

initialize();

board.addEventListener(`click`, function(eve) {
  if (!openCard) {
    eve.target.classList.add(`show`);
    openCard = true;

    if (checkIncludes(eve.target, `card`) 
    && !checkIncludes(eve.target, `matched`)) {
      if (nextCard.innerHTML === eve.target.innerHTML) {
        eve.target.classList.add(`matched`);
        checkArray.push(eve.target);

        if (checkArray.length === symbolsArr.length) {
          setTimeout(function() {
            alert(`Perfect Match! ${openCounter}-time is the Charm ^_^`);
          }, 600)
        }

        refreshNextCard();
      }
      
      openCounter++;
      score.innerHTML = openCounter;
    }

    setTimeout(function() {
      eve.target.classList.remove(`show`);
  
      if (checkArray.length < symbolsArr.length) {
        openCard = false;
      } else {
        openCard = true;
      }
    }, 500);
  }
});

restartButton.onclick = function() {
  for (let card of cards) {
    card.classList.remove(`show`);
    card.classList.remove(`matched`);
  }

  initialize();
}