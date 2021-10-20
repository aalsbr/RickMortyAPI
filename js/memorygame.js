
// api url
const api_url = "https://rickandmortyapi.com/api/character";
// Defining async function
async function getapi(url) {
  // Storing response
  const response = await fetch(url);
  // Storing data in form of JSON
  let data = await response.json();
  
// save fetched image in array 
  savimage(data);
}


// Calling that async function
getapi(api_url);

//inserting image from fetched api to card open image
let imagesArray = [];
function savimage(data) {
  for (let i = 0; i < data.results.length; i++) {
    imagesArray.push(data.results[i].image);
  }

  document.getElementById("a1").src = imagesArray[0];
  document.getElementById("a2").src = imagesArray[0];

  document.getElementById("b1").src = imagesArray[1];
  document.getElementById("b2").src = imagesArray[1];

  document.getElementById("c1").src = imagesArray[2];
  document.getElementById("c2").src = imagesArray[2];

  document.getElementById("d1").src = imagesArray[3];
  document.getElementById("d2").src = imagesArray[3];

  document.getElementById("e1").src = imagesArray[4];
  document.getElementById("e2").src = imagesArray[4];

  document.getElementById("f1").src = imagesArray[5];
  document.getElementById("f2").src = imagesArray[5];

  document.getElementById("g1").src = imagesArray[6];
  document.getElementById("g2").src = imagesArray[6];

  document.getElementById("h1").src = imagesArray[7];
  document.getElementById("h2").src = imagesArray[7];
}
// cards array holds all cards
let card = document.getElementsByClassName("card");
let cards = [...card];
console.log(cards);

// deck of all cards in game
const deck = document.getElementById("card-deck");

// declaring move variable
let moves = 0;
let counter = document.querySelector(".moves");

// declare variables for star icons
const stars = document.querySelectorAll(".fa-star");

// declaring variable of matchedCards
let matchedCard = document.getElementsByClassName("match");

// stars list
let starsList = document.querySelectorAll(".stars li");

// close icon in modal
let closeicon = document.querySelector(".close");

// declare modal
let modal = document.getElementById("popup1");

// array for opened cards
let openedCards = [];

// @description shuffles cards
// @param {array}
// @returns shuffledarray
function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// @description shuffles cards when page is refreshed / loads
document.body.onload = startGame();

// @description function to start a new play
function startGame() {
  // empty the openCards array
  openedCards = [];

  //hide all images
  document.getElementById("a1").style.display = "none";
  document.getElementById("a2").style.display = "none";

  document.getElementById("b1").style.display = "none";
  document.getElementById("b2").style.display = "none";

  document.getElementById("c1").style.display = "none";
  document.getElementById("c2").style.display = "none";

  document.getElementById("d1").style.display = "none";
  document.getElementById("d2").style.display = "none";

  document.getElementById("e1").style.display = "none";
  document.getElementById("e2").style.display = "none";

  document.getElementById("f1").style.display = "none";
  document.getElementById("f2").style.display = "none";

  document.getElementById("g1").style.display = "none";
  document.getElementById("g2").style.display = "none";

  document.getElementById("h1").style.display = "none";
  document.getElementById("h2").style.display = "none";
  // shuffle deck
  cards = shuffle(cards);
  // remove all exisiting classes from each card
  for (var i = 0; i < cards.length; i++) {
    deck.innerHTML = "";
    [].forEach.call(cards, function (item) {
      deck.appendChild(item);
    });

    cards[i].classList.remove("show", "open", "match", "disabled");
  }
  // reset moves
  moves = 0;
  counter.innerHTML = moves;
  // reset rating
  for (var i = 0; i < stars.length; i++) {
    stars[i].style.color = "#FFD700";
    stars[i].style.visibility = "visible";
  }
  //reset timer
  second = 0;
  minute = 0;
  hour = 0;
  var timer = document.querySelector(".timer");
  timer.innerHTML = "Time:    0 : 0";
  clearInterval(interval);
}

let fakeArray = [];

// @description toggles open and show class to display cards
var displayCard = function () {
  this.childNodes[1].style.display = "block";

  if (fakeArray.length != 3) fakeArray.push(this);

  console.log(fakeArray.length);

  console.log(fakeArray[0]);
  this.classList.toggle("open");
  this.classList.toggle("show");
  this.classList.toggle("disabled");
};

// @description add opened cards to OpenedCards list and check if cards are match or not
function cardOpen() {
  openedCards.push(this);

  var len = openedCards.length;
  if (len === 2) {
    moveCounter();
    if (openedCards[0].type === openedCards[1].type) {
      matched();
    } else {
      unmatched();
    }
  }
}

// @description when cards match
function matched() {
  fakeArray[0].childNodes[1].style.display = "block";
  fakeArray[1].childNodes[1].style.display = "block";
  fakeArray = [];
  openedCards[0].classList.add("match", "disabled");
  openedCards[1].classList.add("match", "disabled");
  openedCards[0].classList.remove("show", "open", "no-event");
  openedCards[1].classList.remove("show", "open", "no-event");
  openedCards = [];
}

// description when cards don't match
function unmatched() {
  openedCards[0].classList.add("unmatched");
  openedCards[1].classList.add("unmatched");
  console.log(openedCards[0]);

  disable();
  setTimeout(function () {
    fakeArray[0].childNodes[1].style.display = "none";
    fakeArray[1].childNodes[1].style.display = "none";
    fakeArray = [];

    openedCards[0].classList.remove("show", "open", "no-event", "unmatched");
    openedCards[1].classList.remove("show", "open", "no-event", "unmatched");
    enable();

    openedCards = [];
  }, 1100);
}

// @description disable cards temporarily
function disable() {
  Array.prototype.filter.call(cards, function (card) {
    card.classList.add("disabled");
  });
}

// @description enable cards and disable matched cards
function enable() {
  Array.prototype.filter.call(cards, function (card) {
    card.classList.remove("disabled");
    for (var i = 0; i < matchedCard.length; i++) {
      matchedCard[i].classList.add("disabled");
    }
  });
}

// @description count player's moves
function moveCounter() {
  moves++;
  counter.innerHTML = moves;
  //start timer on first click
  if (moves == 1) {
    second = 0;
    minute = 0;
    hour = 0;
    startTimer();
  }
  // setting rates based on moves
  if (moves > 8 && moves < 12) {
    for (i = 0; i < 3; i++) {
      if (i > 1) {
        stars[i].style.visibility = "collapse";
      }
    }
  } else if (moves > 13) {
    for (i = 0; i < 3; i++) {
      if (i > 0) {
        stars[i].style.visibility = "collapse";
      }
    }
  }
}

// @description game timer
var second = 0,
  minute = 0;
hour = 0;
var timer = document.querySelector(".timer");
var interval;
function startTimer() {
  interval = setInterval(function () {
    timer.innerHTML = "Time:    " + minute + " : " + second;
    second++;
    if (second == 60) {
      minute++;
      second = 00;
    }
    if (minute == 60) {
      hour++;
      minute = 0;
    }
  }, 1000);
}

// @description congratulations when all cards match, show modal and moves, time and rating
function congratulations() {
  if (matchedCard.length == 16) {
    clearInterval(interval);
    finalTime = timer.innerHTML;

    // show congratulations modal
    modal.classList.add("show");

    // declare star rating variable
    var starRating = document.querySelector(".stars").innerHTML;

    //showing move, rating, time on modal
    document.getElementById("finalMove").innerHTML = moves;
    document.getElementById("starRating").innerHTML = starRating;
    document.getElementById("totalTime").innerHTML = finalTime;

    //closeicon on modal
    closeModal();
  }
}

// @description close icon on modal
function closeModal() {
  closeicon.addEventListener("click", function (e) {
    modal.classList.remove("show");
    startGame();
  });
}

// @desciption for user to play Again
function playAgain() {
  modal.classList.remove("show");
  startGame();
}

// loop to add event listeners to each card
for (var i = 0; i < cards.length; i++) {
  card = cards[i];
  card.addEventListener("click", displayCard);
  card.addEventListener("click", cardOpen);
  card.addEventListener("click", congratulations);
}
// Back to home button 
    document.getElementById("back").addEventListener("click",function(){
        window.location.href = "index.html";
    })
