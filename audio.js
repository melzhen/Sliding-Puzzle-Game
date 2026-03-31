function playMusic(url) {
  new Audio({ volume: 0.8, src: [url] }).play();
  // new Audio(url).play();
}
