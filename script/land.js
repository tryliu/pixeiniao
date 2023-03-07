const landDom = document.querySelector(".land"); //拿到对应的元素
const landStyles = getComputedStyle(landDom); //获取该元素的内样式
const landWidth = parseFloat(landStyles.width); //获取该元素的宽度
const landHeight = parseFloat(landStyles.height); //获取该元素的高度
const landtop = parseFloat(landStyles.top);

class Land extends Rectangle {
  constructor(seepd) {
    super(landWidth, landHeight, 0, 500, seepd, 0, landDom);
  }

  onMove() {
    if (this.left <= -landWidth / 2) {
      this.left = 0;
    }
  }
}
// var sland = new Land(-100);
// setInterval(function () {
//   sland.move(25 / 1000);
// }, 25);
