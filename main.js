function Card(rank, suit) {
  this.rank = rank;
  this.suit = suit;
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



// deck.push(new Card(i,'clubs'));

// [{ rank: 1, suit: 'spades'}]

function shuffle(cards) {
  var temp;
  var random;
  for (var i = 0; i < cards; i++) {
    random = Math.floor(Math.random(cards.length - 1));
    temp = cards[i];
    cards[i] = cards[random];
    cards[random] = temp;
  }
  return cards;
}
var shuffleDeck = shuffle(makeDeck());

//deal hand is an function that takes a deck, return a hand which is an array which is 2 cards.
// use the array method that removes the first item from an array
function dealCard(deck) {
  return deck.shift();
}
//dealer gets last card
function dealRound(deck, numberOfPlayers) {
  var round = [];
  for (var i = 0; i < numberOfPlayers; i++) {
    round.push([]);
    console.log(round);
  }
    for (var k = 0; k < 2; k++) {
      for (var j = 1; j < numberOfPlayers.length; j++) {
        round[j].push(dealCard(deck));
      }
      round[0].push(dealCard(deck));
    }

  return round;
  }
