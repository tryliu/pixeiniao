const birdDom = document.querySelector(".bird"); //拿到对应的元素
const birdStyles = getComputedStyle(birdDom); //获取该元素的内样式
const birdWidth = parseFloat(birdStyles.width); //获取该元素的宽度
const birdHeight = parseFloat(birdStyles.height); //获取该元素的高度
const birdTop = parseFloat(birdStyles.top);
const birdLeft = parseFloat(birdStyles.left);
const gameDom = document.querySelector(".game");
const gameHeight = gameDom.clientHeight;
const gameWidth = gameDom.clientWidth;
// console.log(gameHeight, landHeight, birdHeight);
class Bird extends Rectangle {
  constructor() {
    super(birdWidth, birdHeight, birdTop, birdLeft, 0, 0, birdDom);
    this.g = 1500; //小鸟的向下加速度
    this.min = gameHeight - landHeight - birdHeight / 2;
    this.setbirdz = 1;
    this.trime = null; //计算器煽动翅膀
    this.render();
  }
  //开始煽动
  stareSetbirdz() {
    if (this.trime) {
      return;
    } else {
      this.trime = setInterval(() => {
        this.setbirdz++;
        if (this.setbirdz == 4) {
          this.setbirdz = 1;
        }
        this.render();
      }, 100);
    }
  }
  render() {
    super.render();
    this.dom.className = `bird swing${this.setbirdz}`;
  }
  //停止煽动
  stopSetbirdz() {
    clearInterval(this.trime);
    this.trime = null;
  }
  move(duration) {
    super.move(duration); //调用父类方法
    //根据加速度改变速度
    this.ySpeed += this.g * duration;
  }
  onMove() {
    if (this.top > this.min) {
      this.top = this.min;
    } else if (this.top < 0) this.top = 0;
  }
  jump() {
    this.ySpeed = -400;
  }
}
// var kop = new Bird();
// setInterval(function () {
//   kop.move(10 / 1000);
// }, 10);
