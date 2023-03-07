//一个水管类
class Pipe extends Rectangle {
  constructor(height, top, seepd, dom) {
    super(52, height, gameWidth, top, seepd, 0, dom);
  }
  onMove() {
    if (this.left < -this.width) {
      //移除dom
      this.dom.remove();
    }
  }
}
function getRodwn(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
//一对水管的类
class Pipeass {
  constructor(seepd) {
    this.spaceHeight = 150; //空隙位置的高度
    this.minHeight = 80; //水管最小高度
    const maxHeight = landtop - this.minHeight - this.spaceHeight; //最高的水管高度
    const pipeHeight = getRodwn(this.minHeight, maxHeight); //随机产生的水管高度
    const downpipe = landtop - this.spaceHeight - pipeHeight; //下水管高度
    const downpipetop = landtop - downpipe + 13; //下水管的top
    const documenunpipe = document.createElement("div");
    documenunpipe.className = "pipe up";
    this.uppipe = new Pipe(pipeHeight, 0, seepd, documenunpipe); //上水管
    const documendopipe = document.createElement("div");
    documendopipe.className = "pipe down";
    this.downpipe = new Pipe(downpipe, downpipetop, seepd, documendopipe); //下水管
    gameDom.appendChild(documenunpipe);
    gameDom.appendChild(documendopipe);
  }
  /**
   * 该柱子对是否已经移出了视野
   */
  get useLess() {
    return this.uppipe.left < -this.downpipe.width;
  }

  move(duration) {
    this.uppipe.move(duration);
    this.downpipe.move(duration);
  }
}
//一个不断创建水管的类
class PipePareProducer {
  constructor(speed) {
    this.speed = speed;
    this.pairs = [];
    this.timer = null;
    this.tick = 1500;
  }

  startProduce() {
    if (this.timer) {
      return;
    }
    this.timer = setInterval(() => {
      this.pairs.push(new Pipeass(this.speed));
      //移除掉用不到的柱子
      for (let i = 0; i < this.pairs.length; i++) {
        var pair = this.pairs[i];
        if (pair.useLess) {
          //没用的柱子对
          this.pairs.splice(i, 1);
          i--;
        }
      }
    }, this.tick);
    this.pairs.forEach((pair) => {
      pair.move(20 / 1000);
    });
  }

  stopProduce() {
    clearInterval(this.timer);
    this.timer = null;
  }
}
// var kopi = new PipePareProducer(-100);
// kopi.startProduce();
// setInterval(function () {
//   kopi.pairs.forEach((pair) => {
//     pair.move(20 / 1000);
//   });
// }, 20);
