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


function handValue(hand) {
  var score = [0];
  for (var i = 0; i < hand.length; i++) {

    //console.log(hand);
    //console.log(hand[0].rank);
      if (hand[i].rank === 11 || hand[i].rank === 12 || hand[i].rank === 13 ) {
        for (var k = 0; k < score.length; k++) {
         score[k] = score[k] + 10;
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
        for (var l = 0; l < score.length; l++) {
          score[l] += 1;
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

function valueRound(round) {
  for (var i = 0; i < round.length; i++) {
    console.log("Here: " +handValue(round[i]));
  }
}

function playHands(hands, deck) {
  for (var i = 1; i < hands.length; i++) {
    var playing = true;

    while(playing) {
      alert("Player" + i);
      var value = prompt('what would you like to do? Hit, Stand, Or Double Down?');
      value = value.toLowerCase();
      console.log(handValue(currentHands[i]));


      if (value === "hit") {
        console.log(currentHands[i]);
        console.log(currentHands[i].push(dealCard(deck)));
        console.log(currentHands[i]);
        console.log(handValue((currentHands[i])));

        if ( (handValue(currentHands[i]) > 21) ) {
          alert('im sorry you have busted');
          playing = false;
        }
      } else { // stand, double down
        console.log("Next player");
        playing = false;
      }
    }
     dealerPlay(currentHands, deck);
  }

}

function dealerPlay(hands, deck) {
  while (handValue(currentHands[0]) < 17) {
    currentHands[0].push(dealCard(deck));
  }
  if ( (handValue(currentHands[0]) > 21) ) {
    console.log('The Dealer Busts! Everyone Wins!');
    } else if ( (handValue(currentHands[0]) > handValue(currentHands[i]) )) {
        console.log('The Dealer Wins');
      } else {
        console.log('Player' + i + 'win');
      }
}
var deck = shuffle(makeDeck());
var currentHands = dealRound(deck, 3);
var player = dealRound(deck, 1);

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



// replacement logic for HandValue
// var myHand = [{
//   rank: 1
// }, {
//   rank: 5
// }, {
//   rank: 12
// }];
//
// function handValue(hand) {
//
//   var score = 0;
//   var theHand = [];
//
//   for (var i = 0; i < hand.length; i++) {
//     theHand.push(hand[i].rank);
//   }
//
//   theHand.sort(sortNumber);
//
//   for (var i = 0; i < theHand.length; i++) {
//
//     if (theHand[i] === 11 || theHand[i] === 12 || theHand[i] === 13) {
//       score = score + 10;
//     }
//     if (theHand[i] >= 2 && theHand[i] <= 10) {
//       score = score + theHand[i];
//     }
//     if (theHand[i] === 1 && score > 10) {
//       score += 1;
//     }
//     if (theHand[i] === 1 && score <= 10) {
//       score += 11;
//     }
//   }
//   return score;
// }
//
// function sortNumber(a,b) {
//     return b - a;
// }
//
// console.log(handValue(myHand));
