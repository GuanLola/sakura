var stop, staticx;
var img = new Image();
img.src = "./images/sakura.png";

// Sakura 类 实例化一个sakura对象 开始
function Sakura(x, y, s, r, fn) {
  this.x = x;
  this.y = y;
  this.s = s;
  this.r = r;
  this.fn = fn;
}
Sakura.prototype.draw = function(cxt) {
  cxt.save();
  var xc = (40 * this.s) / 4;
  cxt.translate(this.x, this.y);
  cxt.rotate(this.r);
  cxt.drawImage(img, 0, 0, 40 * this.s, 40 * this.s);
  cxt.restore();
};
Sakura.prototype.update = function() {
  this.x = this.fn.x(this.x, this.y);
  this.y = this.fn.y(this.y, this.y);
  this.r = this.fn.r(this.r);
  if (
    this.x > window.innerWidth ||
    this.x < 0 ||
    this.y > window.innerHeight ||
    this.y < 0
  ) {
    this.r = getRandom("fnr");
    if (Math.random() > 0.4) {
      this.x = getRandom("x");
      this.y = 0;
      this.s = getRandom("s");
      this.r = getRandom("r");
    } else {
      this.x = window.innerWidth;
      this.y = getRandom("y");
      this.s = getRandom("s");
      this.r = getRandom("r");
    }
  }
};
// Sakura 类 实例化一个sakura对象 结束

// SakuraList 类 实例化一个sakuraList对象 开始
SakuraList = function() {
  this.list = [];
};
SakuraList.prototype.push = function(sakura) {
  this.list.push(sakura);
};
SakuraList.prototype.update = function() {
  for (var i = 0, len = this.list.length; i < len; i++) {
    this.list[i].update();
  }
};
SakuraList.prototype.draw = function(cxt) {
  for (var i = 0, len = this.list.length; i < len; i++) {
    this.list[i].draw(cxt);
  }
};
SakuraList.prototype.get = function(i) {
  return this.list[i];
};
SakuraList.prototype.size = function() {
  return this.list.length;
};
// SakuraList 类 实例化一个sakuraList对象 结束

function getRandom(option) {
  var ret, random;
  switch (option) {
    case "x":
      ret = Math.random() * window.innerWidth;
      break;
    case "y":
      ret = Math.random() * window.innerHeight;
      break;
    case "s":
      ret = Math.random();
      break;
    case "r":
      ret = Math.random() * 6;
      break;
    case "fnx":
      random = -0.5 + Math.random() * 1;
      ret = function(x, y) {
        return x + 0.5 * random - 1.7;
      };
      break;
    case "fny":
      random = 1.5 + Math.random() * 0.7;
      ret = function(x, y) {
        return y + random;
      };
      break;
    case "fnr":
      random = Math.random() * 0.03;
      ret = function(r) {
        return r + random;
      };
      break;
  }
  return ret;
}

function startSakura() {
  requestAnimationFrame =
    window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    window.oRequestAnimationFrame; //兼容性 不同浏览器的动画控制函数 告诉浏览器希望执行动画
  var canvas = document.createElement("canvas"),
    cxt;
  staticx = true;

  // 初始化canvas画布
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  canvas.setAttribute(
    "style",
    "position: fixed;left: 0;top: 0;pointer-events: none;"
  );
  canvas.setAttribute("id", "canvas_sakura");
  document.getElementsByTagName("body")[0].appendChild(canvas);

  // 获取canvas画布上下文 提供在画布上绘图的方法和属性
  cxt = canvas.getContext("2d");

  var sakuraList = new SakuraList();
  for (var i = 0; i < 50; i++) {
    var sakura, randomX, randomY, randomS, randomR, randomFnx, randomFny;
    randomX = getRandom("x");
    randomY = getRandom("y");
    randomR = getRandom("r");
    randomS = getRandom("s");
    randomFnx = getRandom("fnx");
    randomFny = getRandom("fny");
    randomFnR = getRandom("fnr");
    sakura = new Sakura(randomX, randomY, randomS, randomR, {
      x: randomFnx,
      y: randomFny,
      r: randomFnR,
    });
    sakura.draw(cxt);
    sakuraList.push(sakura);
  }
  stop = requestAnimationFrame(function() {
    cxt.clearRect(0, 0, canvas.width, canvas.height); // 清空画布
    sakuraList.update(); // 更新
    sakuraList.draw(cxt); // 绘制
    // stop = requestAnimationFrame(arguments.callee); // 递归
  });
}

img.onload = function() {
  startSakura();
};
