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

function shuffle(cards) { var temp; var random; // shuffle the cards into a random order for (var i = 0; i < cards.length; i++) { temp = cards[i]; random = Math.floor(Math.random() * cards.length); cards[i] = cards[random]; cards[random] = temp; } return cards; }
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
    console.log('test' + playerUl);
    var playerId = document.getElementById('players');
    playerId.appendChild(playerUl);
  }
  for (var k = 0; k < 2; k++) {
    // number is added by 1 to include dealer.
   for (var j = 1; j <= numberOfPlayers; j++) {
     round[j].push(dealCard(deck));
     console.log('player_' + j);
       var playerCards = document.getElementById('player_' + j);
       var playerLi = document.createElement('li');
       var cardImg = document.createElement('img');
       playerCards.appendChild(playerLi).appendChild(cardImg).setAttribute('src', round[j][k].getCardImagePath());
       playerLi.setAttribute('id', 'player_' + j + 'card' + k);
       var playerCardOne = document.getElementById('player_' + j + 'card' + k);
       console.log(playerCardOne);
       playerCardOne.setAttribute('src', round[j][0].getCardImagePath());
       //playerLiClass[j].setAttribute('src', round[j][0].getCardImagePath());


     //playerLi.innerHTML = 'x';

    //  playerCards.innerHTML =
     //var playerCardOne = document.getElementsByClassName('player-cards');
     //var listItems = playerCardOne.innerHTML('<li>"test"</li>');
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

  var score = 0;
  var theHand = [];

  for (var i = 0; i < hand.length; i++) {
    theHand.push(hand[i].rank);
  }

  theHand.sort(sortNumber);

  for (var i = 0; i < theHand.length; i++) {

    if (theHand[i] === 11 || theHand[i] === 12 || theHand[i] === 13) {
      score = score + 10;
    }
    if (theHand[i] >= 2 && theHand[i] <= 10) {
      score = score + theHand[i];
    }
    if (theHand[i] === 1 && score > 10) {
      score += 1;
    }
    if (theHand[i] === 1 && score <= 10) {
      score += 11;
    }
  }
  return score;
}

function sortNumber(a,b) {
    return b - a;
}

function valueRound(round) {
  for (var i = 0; i < round.length; i++) {
    console.log("Here: " + handValue(round[i]));
  }
}

function playHands(hands, deck) {
  for (var i = 1; i < hands.length; i++) {
    var playing = true;

    while(playing) {
      alert("Player" + i);
      console.log(hands[0][1].rank);
      var value = prompt('dealer shows ' + rankToString(hands[0][1].rank) + ' you have ' + handValue(hands[i]) + ' what would you like to do? (H)it, (S)tand, Or (D)ouble Down?');
      value = value[0].toLowerCase();
      console.log(handValue(hands[i]));


      if (value === "h") {
        console.log(hands[i]);
        console.log(hands[i].push(dealCard(deck)));
        //add to do display card here;
        console.log(hands[i]);
        console.log(handValue((hands[i])));

        if ((handValue(hands[i]) > 21)) {
          alert('im sorry you have busted');
          playing = false;
        }
      } else { // stand, double down
        console.log("Next player");
        playing = false;
      }
    }
  }
  dealerPlays(hands, deck);
}


function dealerPlays (hands, deck) {
  var dealerHit = true;
  var dealerHand = currentHands[0];

  console.log("Dealer's hand:" + handValue(dealerHand));

  while (dealerHit) {
    if (handValue(dealerHand) < 17) {
      dealerHand.push(dealCard(deck));
      console.log("Dealer's hand after hit:" + handValue(dealerHand));
    } else {
      dealerHit = false;
      if (handValue(dealerHand) > 21) {
        console.log('players win! The dealer busts');
      }
    }
  }
}

function rankToString(rank) {
  if (rank === 1) {
    return 'ace';
  } else if (rank >= 2 && rank <= 10) {
    return rank;
  } else if (rank === 11) {
    return 'jack';
  } else if (rank === 12) {
    return 'queen';
  } else if (rank === 13) {
    return 'king';
  }
}
var deck = shuffle(makeDeck());
var currentHands = dealRound(deck, 3);
//var player = dealRound(deck, 1);
playHands(currentHands, deck);
valueRound(currentHands);

//console.log(round);
//valueRound(round);
//playHand(valueRound(round));

//write function that interacts with one player at a time call it playHand
// deal round of hands, then let the player play his hand
//player play function lets players play for each player.length;
// call dealer play only once
// call function settle bets
// players have a ruleset, if round[0], dealer has own ruleset
//user prompt 'what would you like to do? hit/split/double down/ stand'
//repeat that loop on each player until the player has stood or has busted

// handValue(dealRound(shuffleArray(makeDeck()), 1));
//hand.push(deck.shift());
//hand.push(deck.shift());
//handValue(hand);
//console.log(dealRound(shuffleArray(makeDeck()), 3));
