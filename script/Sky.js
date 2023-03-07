const skyDom = document.querySelector(".sky");
const skyStyles = getComputedStyle(skyDom);
const skyWidth = parseFloat(skyStyles.width);
const skyHeight = parseFloat(skyStyles.height);

class Sky extends Rectangle {
  constructor() {
    super(skyWidth, skyHeight, 0, 0, -50, 0, skyDom);
  }

  onMove() {
    if (this.left <= -skyWidth / 2) {
      this.left = 0;
    }
  }
}
// var skp = new Sky();
// setInterval(function () {
//   skp.move(25 / 1000);
// }, 25);
