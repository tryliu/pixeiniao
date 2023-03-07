let inelns = document.querySelector(".integar");
let meng = document.querySelector(".meng");

class Game {
  constructor(seep) {
    this.sky = new Sky();
    this.land = new Land(seep);
    this.pipeProducer = new PipePareProducer(seep);
    this.bird = new Bird();
    this.timer = null; //游戏运行器
    this.gameOver = false; //游戏是否结束
    this.ingarl = 0; //游戏分数
    this.lop = null;
  }

  //开始运行
  start() {
    if (this.timer) {
      return;
    }
    if (this.gameOver) {
      window.location.reload();
    }
    this.timer = setInterval(() => {
      this.sky.move(16 / 1000);
      this.land.move(16 / 1000);
      this.bird.move(16 / 1000);
      this.bird.stareSetbirdz();
      this.pipeProducer.startProduce();
      this.pipeProducer.pairs.forEach((pair) => {
        pair.move(16 / 1000);
      });
      if (this.isgameover()) {
        this.stop();
        this.gameOver = true;
        clearInterval(this.lop);

        if (this.ingarl == 0) {
          inelns.innerHTML = `积分:${this.ingarl}`;
          meng.innerHTML = `<p class="ptext">游戏结束<br/>积分:${this.ingarl}</p>`;
        } else {
          inelns.innerHTML = `积分:${this.ingarl - 1}`;
          meng.innerHTML = `<p class="ptext">游戏结束<br/>积分:${
            this.ingarl - 1
          }</p>`;
        }
        meng.style.opacity = 1;
      }
    }, 16);
  }
  // 停止运行
  stop() {
    clearInterval(this.timer);
    this.timer = null;
    this.bird.stopSetbirdz();
    this.pipeProducer.stopProduce();
  }
  //判断是否有碰撞
  ishame(rec1, rec2) {
    // 横向：两个矩形的中心点的横向距离，是否小于矩形宽度之和的一半
    // 纵向：两个矩形的中心点的纵向距离，是否小于矩形高度之和的一半
    var centerX1 = rec1.left + rec1.width / 2;
    var centerY1 = rec1.top + rec1.height / 2;
    var centerX2 = rec2.left + rec2.width / 2;
    var centerY2 = rec2.top + rec2.height / 2;
    var disX = Math.abs(centerX1 - centerX2); //中心点横向距离
    var disY = Math.abs(centerY1 - centerY2); //中心点总想距离
    if (
      disX < (rec1.width + rec2.width) / 2 &&
      disY < (rec1.height + rec2.height) / 2
    ) {
      //   console.log("p");
      return true;
    }

    return false;
  }
  isnml() {
    let newpirpe = this.pipeProducer.pairs; //uppipe,downpipe
    let newpiedkol = [...newpirpe];
    for (let i = 0; i < newpiedkol.length; i++) {
      let pipedokl = newpiedkol[i];
      var centerX1 = this.bird.left + this.bird.width / 2;
      var centerX2 = pipedokl.downpipe.left + pipedokl.downpipe.width / 2;
      var disX = Math.abs(centerX1 - centerX2); //中心点横向距离
      if (disX < (this.bird.width + pipedokl.downpipe.width) / 2) {
        newpiedkol.splice(i, 1);
        clearInterval(this.lop);
        this.lop = null;
        inelns.innerHTML = `积分:${this.ingarl++}`;
        break;
      }
    }
    if (this.lop || this.isgameover()) {
      return;
    } else {
      setTimeout(() => {
        this.startsd();
      }, 1800);
    }
  }
  startsd() {
    if (this.lop) {
      return;
    }
    this.lop = setInterval(() => {
      this.isnml();
    }, 16);
  }
  //小鸟是否产生碰撞
  isgameover() {
    if (this.bird.top === this.bird.min) {
      return true;
    }
    for (let i = 0; i < this.pipeProducer.pairs.length; i++) {
      let pipedokl = this.pipeProducer.pairs[i]; //uppipe,downpipe
      //   if (this.isnml(this.bird, pipedokl.downpipe)) {
      //     console.log("ppp", this.pipeProducer.pairs.length);
      //   }
      if (
        this.ishame(this.bird, pipedokl.downpipe) ||
        this.ishame(this.bird, pipedokl.uppipe)
      ) {
        return true;
      }
    }
    return false;
  }
  /**
   * 关键键盘事件
   */
  regEvent() {
    window.onkeydown = (e) => {
      if (e.key === "Enter") {
        if (this.timer) {
          this.stop();
        } else {
          this.start();
          this.startsd();
        }
      } else if (e.key === " ") {
        this.bird.jump();
      }
    };
  }
}
var opk = new Game(-100);
opk.regEvent();
