var rows = 3;
var columns = 3;

var currTile;
var otherTile; //blank tile

var turns = 0;

// var imgOrder = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
var imgOrder = ["5", "4", "7", "9", "2", "6", "8", "3", "1"];

window.onload = function () {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      //<img id="0-0" src="1.jpg">
      let tile = document.createElement("img");
      tile.id = r.toString() + "-" + c.toString();
      tile.src = imgOrder.shift() + ".jpg";

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
  if (!otherTile.src.includes("1.jpg")) {
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

    let mySound = new Audio("slide.mp3");
    mySound.play();

    turns += 1;
    document.getElementById("turns").innerText = turns;
  }
}

function startGame() {
  document.getElementById("player").play();

  let start = document.getElementById("start-screen");
  start.style.display = "none";
  start();
}

function controlAudio() {
  let player = document.getElementById('player');
  let playMusic = document.getElementById('playMusic');
  let pauseMusic = document.getElementById('pauseMusic');
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
