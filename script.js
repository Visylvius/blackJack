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


function shuffle(cards) {
  var temp;
  var random;
  for (var k = 0; k < cards; k++) {
    for (var i = 0; i < cards; i++) {
      random = Math.floor(Math.random(cards[i]) * cards.length - 1);
      temp = cards[i];
      temp = cards[random];
      cards[random] = temp;
    }
  }
  return cards;
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function dealCard(deck) {
  return deck.shift();
}
//dealer gets last card
function dealRound(deck, numberOfPlayers) {
  var round = [];
  var numberOfHands = numberOfPlayers + 1;
  for (var i = 0; i < numberOfHands; i++) {
    round.push([]);
  }
    for (var k = 0; k < 2; k++) {
      // number is added by 1 to include dealer.
      for (var j = 1; j < numberOfHands; j++) {
        round[j].push(dealCard(deck));
      }
      round[0].push(dealCard(deck));
    }
  return round;
  }


console.log(dealRound(shuffleArray(makeDeck()), 3));
