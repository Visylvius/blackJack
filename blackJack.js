function Card(rank, suit) {
  this.rank = rank;
  this.suit = suit;
  this.getCardImagePath = function() {
    return './classic-cards/' + suit + rank + '.png';
  };
}


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


function shuffle(deck) {
 for (var i = deck.length - 1; i > 0; i--) {
   var j = Math.floor(Math.random() * (i + 1));
   var temp = deck[i];
   deck[i] = deck[j];
   deck[j] = temp;
 }
  return deck;
}

function dealCard(deck) {
  return deck.shift();
}

//dealer gets last card
function dealRound(deck, numberOfPlayers) {
  var round = [];
  for (var i = 0; i < numberOfPlayers + 1; i++) {
    round.push([]);
    var playerUl = document.createElement('ul');
    playerUl.id = "player_" + i;
    //console.log('test' + playerUl);
    var playerId = document.getElementById('players');
    playerId.appendChild(playerUl);
  }
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

  var dealerCardTwo = document.getElementsByClassName('card-two');//update the dom for the dealer, add the elements for the player;
  var dealerCardOne = document.getElementsByClassName('card-one');
  dealerCardOne[0].setAttribute('src', './classic-cards/cardback.png');
  dealerCardTwo[0].setAttribute('src', round[0][1].getCardImagePath());
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
  }
};

  var dealerPlays = function() {
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
        var dealerLi = document.createElement('li');
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

var deck = shuffle(makeDeck());
var currentHands = dealRound(deck, 1);
var hitCard = document.getElementById('hit');
var stand = document.getElementById('stand');
var currentHandValue = document.getElementById('current-hand');
currentHandValue.innerHTML = 'Your current hand value is ' + handValue(currentHands[1]);
hitCard.addEventListener('click', hit);
stand.addEventListener('click', dealerPlays);
valueRound(currentHands);

//if (handValue(currentHands[1][0].rank === 1) || handValue(currentHands[1][0].rank === 11) || handValue(currentHands[1][0].rank === 12) || handValue(currentHands[1][0].rank === 13) && handValue(currentHands[1][1].rank === 1) || handValue(currentHands[1][1].rank === 11) || handValue(currentHands[1][1].rank === 12) || handValue(currentHands[1][1].rank === 13)); {
   //result.innerHTML = 'You got Blackjack, you win!';
//}
