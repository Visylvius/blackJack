
//Global Variables
var deck = null;
var currentHands = null;
var newGameButton = document.getElementById('new-game');
var hitCard = document.getElementById('hit');
var stand = document.getElementById('stand');
var currentHandValue = document.getElementById('current-hand');
//DOM Event Listeners
hitCard.addEventListener('click', hit);
stand.addEventListener('click', dealerPlays);
newGameButton.addEventListener('click', newGame);


//Constructor function, creates ranks and suits for cards.
// Get Card Image Path Function takes the suit and rank of the class, and then matches it the corresponding jpg file
// rendering the card image to the DOM
function Card(rank, suit) {
  this.rank = rank;
  this.suit = suit;
  this.getCardImagePath = function() {
    return './classic-cards/' + suit + rank + '.png';
  };
}

//Using the suits array, we push a new card onto the deck array, with 4 suits, and 14 cards per suit.
function makeDeck() {
  var deck = [];
  var suits = ['club', 'diamonds', 'hearts', 'spades'];
  for (var rank = 1; rank < 14; rank++) {
	   for (var suit = 0; suit < suits.length; suit++) {
      deck.push(new Card(rank, suits[suit]));
     }
  }
  return deck;
}

//shuffle takes an array of objects, and randomizes the array.
function shuffle(deck) {
 for (var i = deck.length - 1; i > 0; i--) {
   var j = Math.floor(Math.random() * (i + 1));
   var temp = deck[i];
   deck[i] = deck[j];
   deck[j] = temp;
 }
  return deck;
}

//takes the first index of the array, or card.
function dealCard(deck) {
  return deck.shift();
}

//creates an empty array for each player, making sure to leave the 0 index for the dealer.
//we also dynamically create DOM elements for the players cards and use the getCardImagePath function to show what the player drew
function dealRound(deck, numberOfPlayers) {
  var round = [];
  //we use numberOfPlayers + 1 to make that the zero index is saved for the dealer. This will allow us to card code the dealer values in the future
  for (var i = 0; i < numberOfPlayers + 1; i++) {
    round.push([]);
    //dynmically create a ul, within the foor loop make the Ul id unique for each player
    var playerUl = document.createElement('ul');
    playerUl.id = "player_" + i;
    //console.log('test' + playerUl);
    var playerId = document.getElementById('players');
    playerId.appendChild(playerUl);
  }
  //first four loop in order to make sure each player gets two cards 
  for (var k = 0; k < 2; k++) {
    // number is added by 1 to include dealer.
   for (var j = 1; j <= numberOfPlayers; j++) {
     round[j].push(dealCard(deck));
       var playerCards = document.getElementById('player_' + j);
       var playerLi = document.createElement('li');
       var cardImg = document.createElement('img');
       playerCards.appendChild(playerLi).appendChild(cardImg).setAttribute('src', round[j][k].getCardImagePath());
       playerLi.setAttribute('id', 'player_' + j + 'card' + k);
       var playerCardOne = document.getElementById('player_' + j + 'card' + k);
       playerCardOne.setAttribute('src', round[j][0].getCardImagePath());
    }
     round[0].push(dealCard(deck));
  }
  var dealerHand = document.getElementsByClassName('dealer-cards')[0];
  var dealerLi = document.createElement('li');
  var img = document.createElement('img');
  dealerHand.insertAdjacentHTML('beforeend', '<li><img class="card-one"></li><li><img class="card-two"></li>');
  var dealerCardOne = document.getElementsByClassName('card-one')[0];
  var dealerCardTwo = document.getElementsByClassName('card-two')[0];
  console.log(dealerCardOne);
  dealerCardOne.setAttribute('src', './classic-cards/cardback.png');
  dealerCardTwo.setAttribute('src', round[0][1].getCardImagePath());
  return round;
}


function handValue(hand) {

  var score = [];
  score[0] = 0;
  var theHand = [];

  for (var i = 0; i < hand.length; i++) {
    theHand.push(hand[i].rank);
  }
  console.log(theHand);
  if ( theHand[0] === 1 || (theHand[1] === 1)) {
    if (
      (theHand[0] === 1 || theHand[0] === 11 || theHand[0] === 12 || theHand[0] === 13)
      &&
      (theHand[1] === 1 || theHand[1] === 11 || theHand[1] === 12 || theHand[1] === 13 )
      ) {
        var result = document.getElementById('result');
        var dealerCardOne = document.getElementsByClassName('card-one');
        dealerCardOne[0].setAttribute('src', currentHands[0][0].getCardImagePath());
        result.innerHTML = 'You got Blackjack!';
    }
  }
  theHand.sort(sortNumber);

  for (var i = 0; i < theHand.length; i++) {
    if (theHand[i] === 11 || theHand[i] === 12 || theHand[i] === 13) {
      for (var j = 0; j < score.length; j++) {
          score[j] = score[j] + 10;
      }
    }
    if (theHand[i] >= 2 && theHand[i] <= 10) {
      for (var j = 0; j < score.length; j++) {
          score[j] = score[j] + theHand[i];
      }
    }
    if (theHand[i] === 1) {
      var currentScoreLength = score.length;
      for (var k = 0; k < currentScoreLength; k++) {
        if (score[k] > 10) {
          score[k] += 1;
          //console.log(score[k]);
        } else if (score[k] <= 10) {
          score[k] += 11;
          score.push(score[k] + 1);
          //console.log(score[k]);
        }
      }
    }
  }
  return score[0];
}

function sortNumber(a,b) {
    return b - a;
}

function valueRound(round) {
  for (var i = 0; i < round.length; i++) {
    //console.log("Here: " + handValue(round[i]));
  }
}
var hit = function() {
  var newCard = dealCard(deck);
  //console.log(newCard);
  currentHands[1].push(newCard);
  currentHandValue.innerHTML = 'Your current hand value is ' + handValue(currentHands[1]);
  var drawnCards = document.getElementById('player_' + 1);
  var playerLi = document.createElement('li');
  var cardImg = document.createElement('img');
  var result = document.getElementById('result');
  drawnCards.appendChild(playerLi).appendChild(cardImg).setAttribute('src', newCard.getCardImagePath());
  playerLi.setAttribute('id', 'player_' + 1 + 'card' + currentHands[1].length);
  // var hitCard = document.getElementById('player_' + i + 'card' + hands[1].length);
  // hitCard.setAttribute('src', newCard.getCardImagePath());
  //console.log(currentHands[1]);
  if ((handValue(currentHands[1]) > 21)) {
    currentHandValue.innerHTML = 'Your current hand value is ' + handValue(currentHands[1]);
    result.innerHTML = "I'm sorry you have busted";

    var dealerCardOne = document.getElementsByClassName('card-one');
    //console.log(dealerCardOne);
    dealerCardOne[0].setAttribute('src', currentHands[0][0].getCardImagePath());
    hitCard.removeEventListener('click', hit);
  }
};

  var dealerPlays = function() {
    hitCard.removeEventListener('click', hit);
    var dealerHit = true;
    var dealerHand = currentHands[0];
    var dealerCardOne = document.getElementsByClassName('card-one');
    dealerCardOne[0].setAttribute('src', currentHands[0][0].getCardImagePath());
    while (dealerHit) {
      if (handValue(dealerHand) < 17) {
        var newCard = dealCard(deck);
        currentHands[0].push(newCard);
        var drawnCards = document.getElementsByClassName('dealer-cards');
        var div = document.createElement('div');
        // set className for above div, then write a loop that will remove all elements from the parent, 'dealer-cards', with get ElementsByClassName
        var dealerLi = document.createElement('li');
        dealerLi.className = 'dealers-NewCard';
        var cardImg = document.createElement('img');
        drawnCards[0].appendChild(dealerLi).appendChild(cardImg).setAttribute('src', newCard.getCardImagePath());
        dealerLi.setAttribute('id', 'dealercard' + newCard.rank);
        var dealerCard = document.getElementById('dealercard' + newCard.rank);
        dealerCard.setAttribute('src', newCard.getCardImagePath());
      } else {
        dealerHit = false;
        var result = document.getElementById('result');
        if (handValue(dealerHand) > 21) {
          result.innerHTML= 'the dealer busts you win';
        } else if (handValue(dealerHand) > handValue(currentHands[1])) {
          result.innerHTML = 'The dealer has a better hand, you lose';
        } else if (handValue(dealerHand) === handValue(currentHands[1])) {
          result.innerHTML = 'You and the dealer have tied';
        } else {
          result.innerHTML = 'You have a better hand than the dealer, you win!';
        }
      }
    }
  };

function newGame() {
  var playersDiv = document.getElementById('players');
  while (playersDiv.firstChild) {
    playersDiv.removeChild(playersDiv.firstChild);
  }
  // var dealerCardLi = document.getElementsByClassName('dealer-card-two');
  // while (dealerCardLi.firstChild) {
  //   dealerCardLi.removeChild(dealerCardLi.firstChild);
  // }
  // var dealerCardTwo = document.getElementsByClassName('card-two');//update the dom for the dealer, add the elements for the player;
  // var dealerCardOne = document.getElementsByClassName('card-one');
  // dealerCardOne[0].setAttribute('src', '');
  // dealerCardTwo[0].setAttribute('src', '');
  currentHandValue.innerHTML = '';
  var result = document.getElementById('result');
  result.innerHTML = '';
  hitCard.addEventListener('click', hit);
  var dealersNewCard = document.getElementsByClassName('dealers-NewCard');
  var dealersHand = document.getElementsByClassName('dealer-cards')[0];
  while (dealersHand.firstChild) {
    dealersHand.removeChild(dealersHand.firstChild);
  }
  deck = shuffle(makeDeck());
  currentHands = dealRound(deck, 1);
  currentHandValue.innerHTML = 'your current hand value is ' + handValue(currentHands[1]);

}
