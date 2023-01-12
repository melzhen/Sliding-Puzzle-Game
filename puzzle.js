//timer
const MINLIMIT = 2;
const SECLIMIT = 0;
let time = { min: MINLIMIT, sec: SECLIMIT };
let timer = null;

//game
var rows = 3;
var columns = 3;

var currTile;
var otherTile; //blank tile

var turns = 0;

// var imgOrder = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
var imgOrder = ["5", "4", "7", "9", "2", "6", "8", "3", "1"];

function updateTimer() {
  let displayTime = "";
  if (time.min < 10) {
    displayTime = "0" + time.min + " : ";
  } else {
    displayTime = time.min + " : ";
  }
  if (time.sec < 10) {
    displayTime = displayTime + "0" + time.sec;
  } else {
    displayTime = displayTime + time.sec;
  }
  document.getElementById("timer").innerHTML = displayTime;
}

window.onload = function () {
  time = { min: MINLIMIT, sec: SECLIMIT };
  updateTimer();
  document.getElementById("start-game").style.display = "inline-block";
  document.getElementById("continue").style.display = "none";
  document.getElementById("end-game").style.display = "none";
  document.getElementById("restart").style.display = "none";
  document.getElementById("pause").style.display = "none";
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      //<img id="0-0" src="1.jpg">
      let tile = document.createElement("img");
      tile.id = r.toString() + "-" + c.toString();
      tile.src = "Images/" + imgOrder.shift() + ".jpg";

      //DRAG FUNCTIONALITY
      tile.addEventListener("dragstart", dragStart); //click an image to drag
      tile.addEventListener("dragover", dragOver); //moving image around while clicked
      tile.addEventListener("dragenter", dragEnter); //dragging image onto another one
      tile.addEventListener("dragleave", dragLeave); //dragged image leaving anohter image
      tile.addEventListener("drop", dragDrop); //drag an image over another image, drop the image
      tile.addEventListener("dragend", dragEnd); //after drag drop, swap the two tiles

      document.getElementById("board").append(tile);
    }
  }
};

function dragStart() {
  currTile = this; //refers to the img tile being dropped on
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
}

function dragLeave() {}

function dragDrop() {
  otherTile = this; //this refers to the img tile being dropped on
}

function dragEnd() {
  // if other tile is not the blank tile, do not do anything
  if (!otherTile.src.includes("Images/1.jpg")) {
    return;
  }

  let currCoords = currTile.id.split("-"); //ex) "0-0" -> ["0", "0"]
  let r = parseInt(currCoords[0]);
  let c = parseInt(currCoords[1]);

  let otherCoords = otherTile.id.split("-");
  let r2 = parseInt(otherCoords[0]);
  let c2 = parseInt(otherCoords[1]);

  let moveLeft = r == r2 && c2 == c - 1;
  let moveRight = r == r2 && c2 == c + 1;

  let moveUp = c == c2 && r2 == r - 1;
  let moveDown = c == c2 && r2 == r + 1;

  let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

  if (isAdjacent) {
    let currImg = currTile.src;
    let otherImg = otherTile.src;

    currTile.src = otherImg;
    otherTile.src = currImg;

    new Audio("Audio/slide.mp3").play();

    turns += 1;
    document.getElementById("turns").innerText = turns;

    if (
      document.getElementById("board").childNodes[1].src.includes("Images/2.jpg") &&
      document.getElementById("board").childNodes[2].src.includes("Images/3.jpg") &&
      document.getElementById("board").childNodes[3].src.includes("Images/4.jpg") &&
      document.getElementById("board").childNodes[4].src.includes("Images/5.jpg") &&
      document.getElementById("board").childNodes[5].src.includes("Images/6.jpg") &&
      document.getElementById("board").childNodes[6].src.includes("Images/7.jpg") &&
      document.getElementById("board").childNodes[7].src.includes("Images/8.jpg") &&
      document.getElementById("board").childNodes[8].src.includes("Images/9.jpg")
    ) {
      new Audio("Audio/win.wav").play();
      document.getElementById("end-game").innerHTML = "Congrats! You Won!";
      clearInterval(timer);
      endGame();
    }
  }
}

function startGame() {
  new Audio("Audio/start-game.wav").play();

  timer = setInterval(function () {
    time.sec = time.sec - 1;
    if (time.sec == -1) {
      time.min = time.min - 1;
      time.sec = 59;
    }

    if (time.min == -1) {
      new Audio("Audio/game-over.wav").play();
      document.getElementById("timer").innerHTML = "TIME'S UP!";
      clearInterval(timer);
      document.getElementById("end-game").innerHTML = "Game Over";
      endGame();
      return;
    } else {
      updateTimer();
    }
  }, 1000);

  document.getElementById("player").play();
  pauseMusic.style.display = "inline";

  let start = document.getElementById("start-screen");
  start.style.display = "none";
  document.getElementById("start-game").style.display = "none";
  document.getElementById("restart").style.display = "inline-block";
  document.getElementById("pause").style.display = "inline-block";
  start();
}

function endGame() {
  document.getElementById("player").pause();
  document.getElementById("playMusic").style.display = "none";
  document.getElementById("pauseMusic").style.display = "none";
  document.getElementById("start-screen").style.display = "flex";
  document.getElementById("end-game").style.display = "inline-block";
  document.getElementById("pause").style.display = "none";
}

function pauseGame() {
  new Audio("Audio/select-button.wav").play();
  clearInterval(timer);
  document.getElementById("pause").style.display = "none";
  document.getElementById("start-screen").style.display = "flex";
  document.getElementById("continue").style.display = "inline-block";
}

function continueGame() {
  new Audio("Audio/select-button.wav").play();
  // new Audio("start-game.wav").play();
  timer = setInterval(function () {
    time.sec = time.sec - 1;
    if (time.sec == -1) {
      time.min = time.min - 1;
      time.sec = 59;
    }

    if (time.min == -1) {
      new Audio("Audio/game-over.wav").play();
      document.getElementById("timer").innerHTML = "TIME'S UP!";
      clearInterval(timer);
      document.getElementById("end-game").innerHTML = "Game Over";
      endGame();
      return;
    } else {
      updateTimer();
    }
  }, 1000);
  document.getElementById("continue").style.display = "none";
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("pause").style.display = "inline-block";
}

//audio
function controlAudio() {
  let player = document.getElementById("player");
  let playMusic = document.getElementById("playMusic");
  let pauseMusic = document.getElementById("pauseMusic");
  if (player.paused) {
    player.play();
    playMusic.style.display = "none";
    pauseMusic.style.display = "inline";
  } else {
    player.pause();
    playMusic.style.display = "inline";
    pauseMusic.style.display = "none";
  }
}
