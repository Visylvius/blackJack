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
    //console.log('test' + playerUl);
    var playerId = document.getElementById('players');
    playerId.appendChild(playerUl);
  }
  for (var k = 0; k < 2; k++) {
    // number is added by 1 to include dealer.
   for (var j = 1; j <= numberOfPlayers; j++) {
     round[j].push(dealCard(deck));
     //console.log('player_' + j);
       var playerCards = document.getElementById('player_' + j);
       var playerLi = document.createElement('li');
       var cardImg = document.createElement('img');
       playerCards.appendChild(playerLi).appendChild(cardImg).setAttribute('src', round[j][k].getCardImagePath());
       playerLi.setAttribute('id', 'player_' + j + 'card' + k);
       var playerCardOne = document.getElementById('player_' + j + 'card' + k);
       //console.log(playerCardOne);
       playerCardOne.setAttribute('src', round[j][0].getCardImagePath());
       //playerLiClass[j].setAttribute('src', round[j][0].getCardImagePath());

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
    //console.log("Here: " + handValue(round[i]));
  }
}







      //console.log(hands[0][1].rank)
      //console.log(handValue(hands[i]));


      var hit = function () {
        var newCard = dealCard(deck);
        currentHands[1].push(dealCard(deck));
        var drawnCards = document.getElementById('player_' + 1);
        var playerLi = document.createElement('li');
        var cardImg = document.createElement('img');
        drawnCards.appendChild(playerLi).appendChild(cardImg).setAttribute('src', newCard.getCardImagePath());
        playerLi.setAttribute('id', 'player_' + 1 + 'card' + currentHands[1].length);
        // var hitCard = document.getElementById('player_' + i + 'card' + hands[1].length);
        // hitCard.setAttribute('src', newCard.getCardImagePath());

        if ((handValue(currentHands[1]) > 21)) {
          alert('im sorry you have busted');
          playing = false;
        }
      };
      //put with stand function
      //dealerPlays(currentHands, deck);


        //console.log(hands[i][i + 1]);
        //add to do display card here;
        //console.log(hands[i]);
        //console.log(handValue((hands[i])));


      // else { // stand, double down
      //   console.log("Next player");
      //   playing = false;
      // }




function dealerPlays (hands, deck) {
  var dealerHit = true;
  var dealerHand = hands[0];
  var dealerCardOne = document.getElementsByClassName('card-one');
  dealerCardOne[0].setAttribute('src', hands[0][0].getCardImagePath());

  console.log("Dealer's hand:" + handValue(dealerHand));

  while (dealerHit) {
    if (handValue(dealerHand) < 17) {
      var newCard = dealCard(deck);
      console.log(hands[1]);
      // console.log(newCard);
      // console.log(hands[0]);
      hands[0].push(newCard);
      var drawnCards = document.getElementsByClassName('dealer-cards');
      var div = document.createElement('div');
      var dealerLi = document.createElement('li');
      var cardImg = document.createElement('img');
      console.log(div.appendChild(dealerLi));
      drawnCards[0].appendChild(dealerLi).appendChild(cardImg).setAttribute('src', newCard.getCardImagePath());

      dealerLi.setAttribute('id', 'dealercard' + newCard.rank);
      var dealerCard = document.getElementById('dealercard' + newCard.rank);
      console.log(newCard);
      dealerCard.setAttribute('src', newCard.getCardImagePath());
      // console.log(hands[0]);
      // dealerHand.push(dealCard(deck));
      // console.log('yo');
      // console.log(hands[0]);
      //console.log(hands[0]);
      //console.log(hands[0][dealerCards + 1]);
      //console.log("Dealer's hand after hit:" + handValue(dealerHand));
    } else {
      dealerHit = false;
      var result = document.getElementById('result');
      if (handValue(dealerHand) > 21) {
        result.innerHTML= 'dealer busts you win';

        console.log('players win! The dealer busts');
      } else if (handValue(dealerHand) > handValue(hands[1])) {
        result.innerHTML = ('The dealer has a better hand, you lose');
      } else {
        result.innerHTML = 'You have a better hand than the dealer, you win!';
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
var currentHands = dealRound(deck, 1);
var result = document.getElementById('hit');
result.addEventListener('click', hit);
//var player = dealRound(deck, 1);

valueRound(currentHands);
