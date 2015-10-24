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
  }
  for (var k = 0; k < 2; k++) {
    // number is added by 1 to include dealer.
   for (var j = 1; j <= numberOfPlayers; j++) {
     round[j].push(dealCard(deck));
   }
     round[0].push(dealCard(deck));
  }
  return round;
}

function each(hand, callback) {
  for (var i = 0; i < hand.length; i++) {
    callback(hand[i]);
  }
}

function handValue(hand) {
  var score = [0];
  for (var i = 0; i < hand.length; i++) {

    //console.log(hand);
    //console.log(hand[0].rank);
      if (hand[i].rank === 11 || hand[i].rank === 12 || hand[i].rank === 13 ) {
        for (var j = 0; j < score.length; j++) {
         score[j] = score[j] + 10;
        }
      }
    //if length if the array is 1, you need to push the soft value onto the score
    // if length of the array is 2 you add 1 to the score
      if (hand[i].rank >= 2 && hand[i].rank <= 10) {
        for (var j = 0; j < score.length; j++) {
          score[j] = score[j] + hand[i].rank;
        }
      }

      if (hand[i].rank === 1 && score.length === 2) {
        for (var j = 0; j < score.length; j++) {
          score[j] += 1;
        }
      }
      if (hand[i].rank === 1 && score.length === 1) {
        score.push(score[0] + 1);
        score[0] += 11;

  }
    //console.log(score);
  }
  return score;
}
// function handValue(hand) {
//   for (var i = 0; i < hand.length; i++) { //each player
//     var score = 0;
//     for (var x = 0; x < hand[i].length; x++) { //each card
//       if (hand[i][x].rank === 11 || hand[i][x].rank === 12 || hand[i][x].rank === 13 ) {
//         hand[i][x].rank = 10;
//       }
//       if(hand[i][x].rank === 1) {
//         hand[i][x].rank = 11;
//       }
//       if (hand[i][x].rank === 1 && hand[i][x].rank > 21) {
//         hand[i][x].rank = hand[i][x].rank - 10;
//       }
//       score = score + hand[i][x].rank;
//     }
//     console.log(score);
//   }
// }
function valueRound(round) {
  for (var i = 0; i < round.length; i++) {
    console.log(handValue(round[i]));
  }
}

var currentHand = dealRound(shuffle(makeDeck()), 3);
var deck = shuffle(makeDeck());
var hand = [];
var round = dealRound(deck, 3);

console.log(round);
valueRound(round);

// handValue(dealRound(shuffleArray(makeDeck()), 1));
//hand.push(deck.shift());
//hand.push(deck.shift());
//handValue(hand);
//console.log(dealRound(shuffleArray(makeDeck()), 3));
